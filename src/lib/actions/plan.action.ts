"use server";

import connectToDatabase from "../database";
import Plan from "../database/model/plan.model";
import { handleError } from "../utils";
import { CreatePlanParams } from "@/types";

export const createPlan = async (plan: CreatePlanParams) => {
  try {
    await connectToDatabase();
    const newPlan = await Plan.create(plan);

    return JSON.parse(JSON.stringify(newPlan));
  } catch (error) {
    handleError(error);
  }
};

export const getPlans = async () => {
  try {
    await connectToDatabase();
    const plans = await Plan.find();
    console.log(plans);

    return JSON.parse(JSON.stringify(plans));
  } catch (error) {
    handleError(error);
  }
}

export const getPlanByType = async (type: string) => {
  try {
    await connectToDatabase();
    const plan = await Plan.findOne({ type });
    console.log(plan);

    return JSON.parse(JSON.stringify(plan));
  } catch (error) {
    handleError(error);
  }
};

export const getUserPlan = async (userId: string) => {
  try {
    await connectToDatabase();

    const plan = await Plan.findOne({ subscriber: userId });

    return JSON.parse(JSON.stringify(plan));
  } catch (error) {
    handleError(error);
  }
};
