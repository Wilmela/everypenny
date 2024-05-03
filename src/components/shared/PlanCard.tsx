import Image from "next/image";
import { MotionDiv } from "../blocks/Blocks";
import Link from "next/link";

type Props = {
  type: string;
  bgImg: string;
  duration: string;
  desc: string;
  isActive: boolean;
  userId: string;
};

const PlanCard = ({ type, bgImg, duration, desc, isActive, userId }: Props) => {
  
  return (
    <>
      <Link
        href={
          isActive
            ? `/profile/${userId}`
            : userId == undefined
            ? "/auth/sign-in"
            : `/plan/${type}`
        }
      >
        <MotionDiv
          whileInView={{ x: [200, 0], opacity: [0, 1] }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          key={type}
          className="shadow-md rounded-md relative h-[400px] overflow-hidden flex flex-col cursor-pointer"
        >
          <Image
            src={bgImg}
            fill
            priority
            alt="coin"
            className="object-cover object-center -z-10"
          />
          <div className="bg-black/40 p-2 w-11/12 place-self-center absolute bottom-5 rounded-sm">
            <h3 className="text-white font-[300]">{type}</h3>
            <h2 className="text-white text-3xl font-[700]">{duration}</h2>
            <p className="font-[200] text-white">{desc}</p>
          </div>
        </MotionDiv>
      </Link>
    </>
  );
};

export default PlanCard;
