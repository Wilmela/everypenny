import { generateRandomNumber } from "@/lib/utils";
import { Schema, models, model } from "mongoose";

const ContributionSchema = new Schema(
  {
    contributionId: {
      type: Number,
      default: generateRandomNumber(),
    },
    amount: {
      type: Number,
      required: true,
    },
    contributor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receipt: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    dateOfContribution: {
      type: Date,
      default: Date.now,
    },
    // dateOfContributionUpdate: {
    //   type: Date,
    //   default: Date.now,
    // },
    verifiedContribution: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contribution =
  models.Contribution || model("Contribution", ContributionSchema);
export default Contribution;
