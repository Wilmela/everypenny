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
      <div className="relative bg-black/40 text-white w-full md:w-72 lg:w-96 fold:h-40 h-44 md:h-60 rounded-md px-4">
        <div className="absolute -top-3 -left-2 w-20 h-20 rounded-full border border-white bg-green-700 flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-32 fold:w-28 fold:h-28">
            <Image src={image} alt="user-image" fill className="object-cover" />
          </div>
        </div>

        <p className="absolute top-2 left-20 text-sm md:text-lg">{name}</p>
        <p className="absolute top-8 left-20 text-sm md:text-lg">{location}</p>

        <div className="absolute top-14 left-20 text-xs md:text-sm">
          ⭐️⭐️⭐️⭐️⭐️
        </div>

        <div className="absolute md:top-24 fold:top-20 xr:top-20 xr:max-w-[40ch] text-sm md:text-[1rem] md:leading-[1.5rem] lg:leading-[1.7rem] text-left md:max-w-[28ch] lg:max-w-[35ch] fold:text-[0.6rem] fold:leading-[1rem] xr:text-[0.75rem] font-play">
          {remark}
        </div>
      </div>
    </>
  );
};

export default Review;
