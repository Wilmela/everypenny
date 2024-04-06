"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "../database";
import TimeLines from "../database/model/timeLine.model";
import { handleError } from "../utils";

export const getUserTimeline = async (userId: string, path: string) => {
  try {
    await connectToDatabase();

    const existingTimeLines = (
      await TimeLines.find({ userId })
    ).map((res) => res.timeline);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(existingTimeLines));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const verifyUserContribution = async (userId: string, path: string) => {
  try {
    await connectToDatabase();

    const existingTimeLines = (
      await TimeLines.find({ userId })
    ).map((res) => res.timeline);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(existingTimeLines));
  } catch (error) {
    return { error: handleError(error) };
  }
};

