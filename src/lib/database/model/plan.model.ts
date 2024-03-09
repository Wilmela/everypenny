import { Schema, Model, model, models, Document } from "mongoose";

export interface IPlan extends Document {
  type: string;
  amount: string | number;
  step: string;
  duration: string;
  isActive: boolean;
  subscriber: Schema.Types.ObjectId;
}

const PlanSchema = new Schema<IPlan>(
  {
    amount: {
      type: Number,
      required: true,
    },
    step: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Plan = models.Plan || model("Plan", PlanSchema);
export default Plan as Model<IPlan>;
