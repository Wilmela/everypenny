import { Schema, Model, model, models, Document } from "mongoose";

export interface IPlan extends Document {
  type: string;
  amount: string | number;
  isActive: boolean;
  subscriber: Schema.Types.ObjectId;
}

const PlanSchema = new Schema<IPlan>(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
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
