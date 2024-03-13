"use server";

import { ContributionParams } from "@/types";
import connectToDatabase from "../database";
import Contribution from "../database/model/contribution.model";
import { formatDate, handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/model/user.model";
import TimeLines from "../database/model/timeLine.model";

export const makeContribution = async (
  contributor: string,
  contribution: ContributionParams,
  path: string
) => {
  try {
    await connectToDatabase();

    const newContribution = await Contribution.create(contribution);

    await TimeLines.create({
      userId: contributor,
      timeline: {
        title: formatDate(new Date(contribution.dateOfContribution)),
        cardTitle: `Contributed ${contribution.amount} ${
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

    await User.findByIdAndUpdate(
      contributor,
      {
        $push: {
          contributions: newContribution,
        },
      },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newContribution));
  } catch (error) {
    handleError(error);
  }
};

export const getUserContributions = async (userId: string) => {
  try {
    await connectToDatabase();
    const contributions = await Contribution.find({
      contributor: userId,
    });
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
