"use server";

import { CreateUserParams } from "@/types";
import connectToDatabase from "../database";
import User from "../database/model/user.model";
import { handleError } from "@/lib/utils";
import Contribution from "../database/model/contribution.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const min = 10000;
    const max = 99999;
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

    const uniqueId = `${user.firstName.toLowerCase().slice(0, 3)}-${randNum}`;

    const newUser = await User.create({ ...user, regId: uniqueId });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const findUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ _id: userId }).populate({
      path: "contributions",
      model: Contribution,
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};
