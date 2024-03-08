"use server";

import { CreateUserParams } from "@/types";
import connectToDatabase from "../database";
import User from "../database/model/user.model";
import { handleError } from "@/lib/utils";

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
