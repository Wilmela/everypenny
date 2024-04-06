
import Image from "next/image";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  regId: string;
  plan?: string;
  role?: string;
};
const PersonalDetails = async ({
  firstName,
  lastName,
  email,
  regId,
  plan,
  role,
}: Props) => {
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
        <p className="p-text">Full name: {firstName}</p>
        <p className="p-text">{lastName}</p>
      </div>
      <p className="p-text truncate">Email: {email}</p>
      <p className="p-text">Registration No: {regId}</p>
      <span className="inline-flex items-center justify-center gap-2 p-text">
        Current plan:
        <p className="py-1 px-2 rounded-xl bg-APP_GREEN/20 w-fit lowercase ">
          {plan || "No plan."}
        </p>
      </span>
      <p className="p-text">Role: {role}</p>
    </>
  );
};

export default PersonalDetails;
