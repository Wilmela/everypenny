"use server";

import { CreateUserParams } from "@/types";
import connectToDatabase from "../database";
import User from "../database/model/user.model";
import { generateRandomNumber, handleError } from "@/lib/utils";
import Contribution from "../database/model/contribution.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    // const min = 10000;
    // const max = 99999;
    // const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

    const randNum:number = generateRandomNumber();
    const uniqueId = `${user.firstName.toLowerCase().slice(0, 3)}-${randNum}`;

    const newUser = await User.create({ ...user, regId: uniqueId });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findUserById = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findUserContributions = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ _id: userId })
      .populate({
        path: "contributions",
        model: Contribution,
        select: "amount dateOfContribution",
      })
      .select("firstName lastName regId");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};
