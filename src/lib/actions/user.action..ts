"use server";

import { CreateUserParams } from "@/types";
import connectToDatabase from "../database";
import User from "../database/model/user.model";
import { generateRandomNumber, handleError } from "@/lib/utils";
import { UpdateUserType } from "../validation";
import { revalidatePath } from "next/cache";
import Plan from "../database/model/plan.model";
import Contribution from "../database/model/contribution.model";
import sendEmail from "../nodemailer";
import Welcome from "@/components/emails/WelcomeTemplate";
import { render } from "@react-email/render";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const randNum: number = generateRandomNumber();
    const uniqueId = `${user.firstName.toLowerCase().slice(0, 3)}-${randNum}`;

    const newUser = await User.create({ ...user, regId: uniqueId });

    //  SEND WELCOME EMAIL
    sendEmail({
      from: "chukumelawilson@gmail.com",
      to: newUser.email,
      subject: "Welcome to Every Penny",
      html: render(Welcome({ firstName: newUser.firstName })),
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    return { error: handleError(error) };
  }
};

// Todo
export const verifyUser = async (otp: string) => {
  try {
    await connectToDatabase();
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findUserById = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId)
      .populate({
        path: "plan",
        model: Plan,
        select: "type amount step duration isActive",
      })
      .populate({
        path: "contributions",
        model: Contribution,
        select:
          "contributionId plan amount verifiedContribution dateOfContribution",
      });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};

// Remove
export const findUserByRegId = async (regId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ regId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const findAllUsers = async () => {
  try {
    await connectToDatabase();
    const users = await User.find()
      .populate({
        path: "plan",
        model: Plan,
        select: "type",
      })
      .populate({
        path: "contributions",
        model: Contribution,
      });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const updateUserById = async (
  userId: string,
  user: UpdateUserType,
  currentImageUrl: string
) => {
  try {
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          imageUrl: !user.imageUrl.length ? currentImageUrl : user.imageUrl,
        },
      },
      {
        new: true,
      }
    );

    if (updatedUser) {
      revalidatePath(`/profile/${userId}`);
    }
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const generateReceiptPerMonth = async (
  userId: string,
  fromDate?: Date,
  toDate?: Date
) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId).populate({
      path: "contributions",
      model: Contribution,
      select:
        "contributionId plan amount verifiedContribution dateOfContribution",
      match: {
        dateOfContribution: {
          $gte: fromDate || new Date(0), // Default to beginning of time
          $lte: toDate || new Date(), // Default to current date
        },
      },
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return { error: handleError(error) };
  }
};
