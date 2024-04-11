import { PersonalDetailProps } from "@/types";
import Image from "next/image";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const PersonalDetails = async ({
  firstName,
  lastName,
  email,
  regId,
  plan,
  role,
  phone,
  userId,
  userImage,
}: PersonalDetailProps) => {
  const imageLink = `${process.env.CLOUDINARY_IMAGE_URL}/${userImage}`;

  return (
    <>
      <div className="relative w-full h-[320px] flex gap-2 mb-2">
        <Link
          href={`/profile/${userId}/edit/`}
          className="bg-APP_GREEN hover:bg-APP_GREEN/80 size-10 rounded-full flex items-center justify-center absolute z-10 top-5 right-5"
        >
          <Pencil1Icon className="size-6 text-white" />
        </Link>
        <Image
          src={!userImage ? "/assets/images/dp.jpeg" : imageLink}
          fill
          alt="user_image"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <p className="p-text">
        Full name: {firstName} {lastName}
      </p>
      <p className="p-text truncate">Email: {email}</p>
      <p className="p-text">Registration No: {regId}</p>
      <p className="p-text">Phone: {phone}</p>
      <span className="inline-flex items-center justify-center gap-2 p-text">
        Current plan:
        <p className="py-1 px-2 rounded-xl bg-APP_GREEN/20 w-fit lowercase ">
          {plan || "No plan."}
        </p>
      </span>
      <p className="p-text capitalize">Role: {role}</p>
    </>
  );
};

export default PersonalDetails;
