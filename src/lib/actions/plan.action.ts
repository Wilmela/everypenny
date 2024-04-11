"use server";

import connectToDatabase from "../database";
import Plan from "../database/model/plan.model";
import User from "../database/model/user.model";
import { handleError } from "../utils";
import { CreatePlanParams } from "@/types";

export const createPlan = async (plan: CreatePlanParams) => {
  try {
    await connectToDatabase();
    const newPlan = await Plan.create(plan);

    const user = await User.findByIdAndUpdate(
      plan.subscriber,
      { plan: newPlan },
      { new: true }
    );
    if (user) {
      console.log(user);
    }
    return JSON.parse(JSON.stringify(newPlan));
  } catch (error) {
    return { error: handleError(error) };
  }
};

export const getPlans = async () => {
  try {
    await connectToDatabase();
    const plans = await Plan.find();
    return JSON.parse(JSON.stringify(plans));
  } catch (error) {
    return { error: handleError(error) };
  }
};

// export const getPlanByType = async (type: string) => {
//   console.log(type);

//   try {
//     await connectToDatabase();

//     const plan = await Plan.findOne({type
//     });

//     console.log(plan);
//     return JSON.parse(JSON.stringify(plan));
//   } catch (error) {
//     return { error: handleError(error) };
//   }
// };

