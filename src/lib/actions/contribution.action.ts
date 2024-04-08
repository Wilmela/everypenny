"use server";

import { ContributionParams } from "@/types";
import connectToDatabase from "../database";
import Contribution from "../database/model/contribution.model";
import { formatDateTime, generateRandomNumber, handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/model/user.model";
import TimeLines from "../database/model/timeLine.model";
import { isValidObjectId } from "mongoose";
import sendEmail from "../nodemailer";
import { redirect } from "next/navigation";
import { render } from "@react-email/render";
import Welcome from "@/components/emails/Welcome";

export const makeContribution = async (
  contributor: string,
  contribution: ContributionParams,
  path: string
) => {
  try {
    await connectToDatabase();
    const contributionId = generateRandomNumber();

    // Create a new contribution
    const newContribution = await Contribution.create({
      ...contribution,
      contributionId,
    });

    // create new contribution timeline
    await TimeLines.create({
      userId: contributor,
      timeLineId: contributionId,
      timeline: {
        title: formatDateTime(new Date(contribution.dateOfContribution)),
        cardTitle: `${contribution.amount} contributed `,
        // cardSubtitle: `${
        //   !contribution.verifiedContribution ? "Not verified" : "Verified"
        // }`,
        media: {
          type: "IMAGE",
          source: {
            url: contribution.receipt,
          },
        },
      },
    });

    // Add contribution to user contribution array
    const user = await User.findById(contributor);
    if (!user) throw new Error("User not found.");
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          contributions: newContribution,
        },
      },
      { new: true }
    );

    // Notify admin of a contribution by a user with regId: via email
    await sendEmail({
      from: user?.email,
      subject: "Test Message",
      // text: `User with name ${user.firstName} just made a contribution awaiting verification`,
      html: `<p>Coming from ${user?.email}</p>`,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newContribution));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const getUserContributions = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ _id: userId })
      .populate({
        path: "contributions",
        model: Contribution,
        select:
          "contributionId plan amount verifiedContribution dateOfContribution",
      })
      .select("firstName lastName regId");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const getUserTotalAmount = async (userId: string) => {
  if (!isValidObjectId(userId)) return;
  try {
    await connectToDatabase();
    const user = await getUserContributions(userId);

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

export const verifyContribution = async (id: string, userId: string, isVerified: boolean) => {
  try {
    await connectToDatabase();
    const updatedContribution = await Contribution.findByIdAndUpdate(
      id,
      {
        $set: {
          verifiedContribution: !isVerified,
        },
      },
      { new: true }
    );

    if (updatedContribution) {
      console.log(verifyContribution);

      revalidatePath(`/public/${userId}`);
    }
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
