"use server";

import { ContributionParams } from "@/types";
import connectToDatabase from "../database";
import Contribution from "../database/model/contribution.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/model/user.model";
import { getUserPlan } from "./plan.action";

export const makeContribution = async (
  contribution: ContributionParams,
  path: string
) => {
  try {
    await connectToDatabase();
    // const contributor = await User.findOne({ _id: contribution.contributor });

    // const plan = await getUserPlan(contributor!.toString());

    const newContribution = await Contribution.create(contribution);
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newContribution));
  } catch (error) {
    handleError(error);
  }
};

export const getUserContributions = async (userId: string) => {
  try {
    await connectToDatabase();
    const contributions = await Contribution.findOne({
      contributor: userId,
    }).sort({ createdAt: "desc" });
    return JSON.parse(JSON.stringify(contributions));
  } catch (error) {
    handleError(error);
  }
};

// Only admin
export const getAllContributions = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId });
    if (user!.role !== "admin") {
      const contributions = await Contribution.find();
      return JSON.parse(JSON.stringify(contributions));
    }
    return;
  } catch (error) {
    handleError(error);
  }
};
