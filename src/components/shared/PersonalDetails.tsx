import { getSession } from "@/lib/actions/auth.action";
import Image from "next/image";
import React from "react";

const PersonalDetails = async ({
  type,
}: {
  type: string;
}) => {
  const session = await getSession();

  return (
    <>
      <div className="relative w-full h-[320px] flex gap-2">
        <Image
          src="/assets/images/dp.jpeg"
          fill
          alt="user_image"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex gap-2 mt-4">
        <p className="p-text">Full name: {session.firstName}</p>
        <p className="p-text">{session.lastName}</p>
      </div>
      <p className="p-text">Email: {session.email}</p>
      <p className="p-text">Registration No: {session.regId}</p>
      <span className="inline-flex items-center justify-center gap-2 p-text">
        Current plan:
        <p className="py-1 px-2 rounded-xl bg-APP_GREEN/20 w-fit ">
          {type || "No plan."}
        </p>
      </span>
    </>
  );
};

export default PersonalDetails;
