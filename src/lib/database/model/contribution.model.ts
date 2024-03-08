import { Schema, models, model } from "mongoose";

const ContributionSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    contributor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receipt: {
      type: String,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    dateOfContribution: {
      type: Date,
      default: Date.now,
    },
    dateOfContributionUpdate: {
      type: Date,
      default: Date.now,
    },
    isContributionVerified: {
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
