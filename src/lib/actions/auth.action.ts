"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  handleError,
  sessionOptions,
} from "@/lib/utils";
import User from "../database/model/user.model";
import { SignInSchema, SignInType } from "../validation";
import { redirect } from "next/navigation";
import connectToDatabase from "../database";
import { revalidatePath } from "next/cache";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session) throw new Error("No logged in user");
  if (!session.isLoggedIn) {
    // Default name when not logged in
    session.firstName = defaultSession.firstName;
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();

  redirect("/");
};

export const signIn = async ({ email, password }: SignInType) => {
  const session = await getSession();

  const validCredentials = SignInSchema.safeParse({ email, password });
  if (!validCredentials.success) return;

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) throw new Error("Wrong credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Wrong credentials");

    session.isLoggedIn = true;

    session.userId = user._id.toString();
    session.firstName = user.firstName;
    // session.email = user.email;
    // session.lastName = user.lastName;
    // session.image = user.imageUrl;
    session.role = user.role;
    // session.phone = user.phone;
    // session.regId = user.regId;
    await session.save();
  } catch (error) {
    return {
      error: handleError(error),
    };
  }
};
