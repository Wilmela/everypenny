"use server";

import { ContributionParams } from "@/types";
import connectToDatabase from "../database";
import Contribution from "../database/model/contribution.model";
import { formatDate, generateRandomNumber, handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/model/user.model";
import TimeLines from "../database/model/timeLine.model";
import { findUserContributions } from "./user.action.";
import { isValidObjectId } from "mongoose";

export const makeContribution = async (
  contributor: string,
  contribution: ContributionParams,
  path: string
) => {
  try {
    await connectToDatabase();

    // Create a new contribution
    const newContribution = await Contribution.create(contribution);

    // create new contribution timeline
    const randNum: number = generateRandomNumber();
    await TimeLines.create({
      timeLineId: randNum,
      userId: contributor,
      timeline: {
        title: formatDate(new Date(contribution.dateOfContribution)),
        cardTitle: `${contribution.amount} contribution ${
          !contribution.verifiedContribution ? "Not verified" : "Verified"
        }`,
        cardSubtitle: `${
          !contribution.verifiedContribution ? "Not verified" : "Verified"
        }`,
        media: {
          type: "IMAGE",
          source: {
            url: contribution.receipt,
          },
        },
      },
    });

    // Add contribution to user contribution array
    await User.findByIdAndUpdate(
      contributor,
      {
        $push: {
          contributions: newContribution,
        },
      },
      { new: true }
    );

    // Notify admin of a contribution by a user with regId: via email

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newContribution));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const getUserTotalAmount = async (userId: string) => {
  if (!isValidObjectId(userId)) return;
  try {
    await connectToDatabase();
    const user = await findUserContributions(userId);
    
    const contributedAmount: number[] = user.contributions.map(
      ({ amount }: { amount: number }) => amount
    );

    let sum: number = 0;
    for (let i = 0; i < contributedAmount.length; i++) {
      sum += contributedAmount[i];
    }

    return JSON.parse(JSON.stringify(sum));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const verifyContribution = async (contributionId: number) => {
  try {
    await connectToDatabase();
   
  } catch (error) {
    return { error: handleError(error) };
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
    return { error: handleError(error) };
  }
};
