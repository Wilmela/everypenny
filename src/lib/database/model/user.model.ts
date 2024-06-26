import { Schema, Model, model, models, Document } from "mongoose";
import bcrypt from "bcrypt";
import { ContributionParams, CreatePlanParams } from "@/types";

export interface IUser extends Document {
  regId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number;
  password: string;
  imageUrl?: string;
  plan: Omit<CreatePlanParams, "subscriber">;
  contributions: ContributionParams[];
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser, {}, Methods>(
  {
    regId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "+234801111111",
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    contributions: [{ type: Schema.Types.ObjectId, ref: "Contribution" }],
    isVerified: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified(this.password) || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }

    next();
  } catch (error) {
    throw error;
  }

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.verifyUser = async function (otp: string) {
  try {
  } catch (error) {
    throw error;
  }
};

const User = models.User || model("User", UserSchema);
export default User as Model<IUser, {}, Methods>;
