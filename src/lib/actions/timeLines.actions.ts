"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "../database";
import TimeLines from "../database/model/timeLine.model";
import { handleError } from "../utils";
import { TimeLineParams } from "@/types";

export const getUserTimeline = async (userId: string, path: string) => {
  try {
    await connectToDatabase();

    const existingTimeLines: TimeLineParams[] = (
      await TimeLines.find({ userId })
    ).map((res) => res.timeline);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(existingTimeLines));
  } catch (error) {
    handleError(error);
  }
};
