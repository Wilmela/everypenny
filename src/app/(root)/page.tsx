import {
  CarouselDiv,
  MotionDiv,
  MotionP,
  Parallax,
} from "@/components/blocks/Blocks";
import CallToAction from "@/components/shared/CallToAction";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import Image from "next/image";
import { points, review } from "@/constants";
import Review from "@/components/shared/Review";

export default function Home() {
  return (
    <>
      {/* Landing */}
      <section>
        <Image
          src="/assets/images/save-up-bg.webp"
          fill
          alt="save_up_banner"
          priority
          className="-z-30 hidden md:block object-cover object-center"
        />
        <Image
          src="/assets/images/save-up-bg-2.webp"
          fill
          alt="save_up_banner"
          priority
          className="-z-30 md:hidden object-cover object-center"
        />
        <MaxWidthContainer className="flex flex-col paddingY justify-center lg:h-screen">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            {/* Introduction and call to action */}
            <div className="w-full lg:w-6/12 xl:w-9/12 flex flex-col gap-4 md:gap-8 fold:gap-4">
              <h1 className="title">
                Make Every Penny <br className="hidden lg:block" /> Count
              </h1>
              <div className="max-w-prose desc font-[300] -z-10 md:text-center lg:text-left">
                <p>Let&apos;s help you save up and grow!</p>
                <p>
                  Join the community of over 1000+ people growing financially.
                </p>
              </div>
              <div className="mt-2 md:mt-4">
                <CallToAction />
              </div>
            </div>

            {/* Review Carousel */}
            <div className="sm:mt-6 fold:mt-4 md:mt-12 w-full lg:w-6/12 xl:w-[35%] ">
              <CarouselDiv
                autoPlay={true}
                infiniteLoop={true}
                showArrows={false}
                showThumbs={false}
                stopOnHover={true}
                showIndicators={false}
                showStatus={false}
                className="w-full"
              >
                {review.map((item) => (
                  <div key={item.name} className="p-4">
                    <Review
                      image={item.photo}
                      name={item.name}
                      location={item.location}
                      remark={item.remark}
                    />
                  </div>
                ))}
              </CarouselDiv>
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      {/* Security */}
      <section className="bg-gray-50 paddingY" id="explore">
        <MaxWidthContainer>
          <h3 className="page-title mb-6">About</h3>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {points.map((point) => {
              return (
                <MotionDiv
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col gap-4 my-4 mr-4 shadow-sm bg-white p-4 rounded-md cursor-pointer"
                  key={point.title}
                >
                  <h3 className="sub-title">{point.title}</h3>
                  <div className="flex gap-4 items-center">
                    <MotionDiv whileInView={{ x: [-100, 0] }}>
                      <Image
                        src={point.image}
                        width={100}
                        height={50}
                        alt="security_icon"
                      />
                    </MotionDiv>
                    <MotionP
                      whileHover={{ scale: 1.05 }}
                      className="max-w-[40ch] text-muted-foreground"
                    >
                      {point.desc}
                    </MotionP>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </MaxWidthContainer>
      </section>
    </>
  );
}
