'use server'

import { ContributionParams } from "@/types";
import connectToDatabase from "../database";
import Contribution from "../database/model/contribution.model";
import { handleError } from "../utils";

export const contribute = async (contribution: ContributionParams) => {
  try {
    await connectToDatabase();
    const newContribution = await Contribution.create(contribution);
  } catch (error) {
    handleError(error);
  }
};