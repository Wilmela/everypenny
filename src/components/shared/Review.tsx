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
      <div className="relative bg-black/40 text-white w-full md:w-80 lg:w-96 fold:h-40 h-44 md:h-56 rounded-md px-4">
        <div className="absolute -top-3 -left-2 w-20 h-20 rounded-full border border-white bg-green-700 flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-32 fold:w-28 fold:h-28">
            <Image src={image} alt="user-image" fill className="object-cover" />
          </div>
        </div>

        <p className="absolute top-2 left-20 text-sm md:text-lg">{name}</p>
        <p className="absolute top-8 left-20 text-sm md:text-lg">{location}</p>

        <div className="absolute top-14 left-20">⭐️⭐️⭐️⭐️⭐️</div>

        <div className="absolute md:top-24 fold:top-20 xr:top-24 xr:max-w-[45ch] text-sm md:text-lg text-left md:max-w-[30ch] lg:max-w-[40ch] fold:text-xs">
          {remark}
        </div>
      </div>
    </>
  );
};

export default Review;
