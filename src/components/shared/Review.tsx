import Image from "next/image";
import React from "react";

type ReviewProps = {
  image: string;
  name: string;
  location: string;
  remark: string;
};
const Review = ({ image, name, location, remark }: ReviewProps) => {
  return (
    <>
      <div className="relative bg-black/40 text-white w-full md:w-80 lg:w-96 h-44 md:h-56 rounded-md px-4">
        <div className="absolute -top-3 -left-2 w-20 h-20 rounded-full border border-white bg-green-700 flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-32">
            <Image src={image} alt="user-image" fill className="object-cover" />
          </div>
        </div>

        <p className="absolute top-2 left-20">{name}</p>
        <p className="absolute top-8 left-20">{location}</p>

        <div className="absolute top-14 left-20">⭐️⭐️⭐️⭐️⭐️</div>

        <div className="absolute top-24 text-sm text-left max-w-[45ch]">
          {remark}
        </div>
      </div>
    </>
  );
};

export default Review;
