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
import { cn } from "@/lib/utils";

// OVERLAY COMPONENT
const Overlay = ({
  text,
  className,
  title,
}: {
  text: string;
  className?: string;
  title: string;
}) => (
  <div
    className={cn(
      "group-hover:absolute transition-all top-0 right-0 bottom-0 left-0 bg-black/70 text-primary-foreground hidden group-hover:flex items-center justify-center h-full p-4 rounded-md overflow-hidden",
      { className }
    )}
  >
    <div className="flex flex-col gap-2">
      <h3 className="card-title">{title}</h3>
      <p className="text-sm font-cambay font-[400]">{text}</p>
    </div>
  </div>
);

const smallCard = "relative group cursor-pointer rounded-md overflow-hidden";
const bigCard = "relative group cursor-pointer rounded-md overflow-hidden";

export default function Home() {
  return (
    <>
      {/* Landing */}
      <section className="h-auto relative">
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
        <MaxWidthContainer className="flex flex-col paddingY justify-center xl:h-screen">
          <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between items-center">
            {/* Introduction and call to action */}
            <div className="w-full lg:w-6/12 xl:w-9/12 flex flex-col gap-8 md:gap-8 fold:gap-4">
              <div className="flex flex-col gap-6">
                <h1 className="title">
                  Make Every Penny <br className="hidden lg:block" /> Count
                </h1>
                <div className="md:max-w-[27ch] lg:max-w-prose desc font-[300] -z-10 md:text-center lg:text-left">
                  <p className="desc-text">
                    Join the community of over 1000+ people growing financially.
                  </p>
                  <p className="desc-text">
                    Let&apos;s help you save up and grow!
                  </p>
                </div>
              </div>

              <div className="my-10 md:my-6">
                <CallToAction />
              </div>
            </div>

            {/* Review Carousel */}
            <div className="sm:mt-6 fold:mt-4 md:mt-12 w-full md:pl-16 lg:pl-0 md:w-6/12 xl:w-[35%] ">
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

      {/* Good to Know */}
      <section className="bg-APP_ASH paddingY relative" id="explore">
        <MaxWidthContainer>
          <h3 className="dark-page-title mb-4">Good To Know</h3>
          <p className="p-text-white-2">
            Helpful tidbits to fuel your journey!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-12 ">
            {points.map((point) => {
              return (
                <MotionDiv
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 my-4 mr-4 shadow-sm text-white p-6 rounded-md cursor-pointer h-auto relative hover:bg-black/30 transition-all ease-in z-10"
                  key={point.title}
                >
                  <h3 className="sub-title">{point.title}</h3>

                  <MotionDiv
                    whileInView={{ x: [-100, 0] }}
                    className="absolute top-16 left-24 md:left-32 -z- opacity-30"
                  >
                    <Image
                      src={point.image}
                      width={150}
                      height={100}
                      alt={`${point.title}`}
                    />
                  </MotionDiv>

                  <MotionP
                    whileHover={{ scale: 1.01 }}
                    className="max-w-[30h] z-10 p-text-white"
                  >
                    {point.desc}
                  </MotionP>
                </MotionDiv>
              );
            })}
          </div>
        </MaxWidthContainer>
        {/* BG GRADIENT */}
        <div className=" size-56 rounded-full blur-[200px] bg-gradient-to-tr to-40% from-green-700 from-20% via-yellow-500 to-green-300 absolute right-5 top-10 " />
      </section>

      {/* Benefits*/}
      <section className="bg-APP_JUNGLE_GREEN paddingY relative">
        <MaxWidthContainer>
          <h3 className="dark-page-title mb-4">Reap the rewards</h3>
          <p className="p-text-white-2">Explore How We Benefit You!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 md:mt-12">
            <div className={cn("h-[20rem]", smallCard)}>
              <Image
                src="/assets/images/travel.jpeg"
                fill
                alt="travel"
                className="object-cover"
              />
              <Overlay
                title="Travel"
                text="Every Penny helps you turn small, everyday savings into unforgettable travel experiences. By tracking your progress and visualizing your goals, you can transform seemingly insignificant amounts into plane tickets, dream accommodations, and the chance to explore new cultures and broaden your horizons."
              />
            </div>

            <div className={cn("h-[20rem] lg:h-[25rem]", bigCard)}>
              <Image
                src="/assets/images/study.jpeg"
                fill
                alt="study"
                className="object-cover"
              />
              <Overlay
                title="Study"
                text="Saving with Every Penny can unlock the door to your academic dreams. Small, consistent savings can add up to significant amounts, helping you cover tuition fees, textbooks, and living expenses. Every Penny empowers you to visualize your educational goals and track your progress, turning spare change into the fuel for a brighter future. Don't let financial limitations hold you back - Every Penny can help you invest in your education and unlock a world of knowledge."
              />
            </div>
            <div className={cn("h-[20rem] lg:h-[30rem] ", bigCard)}>
              <Image
                src="/assets/images/invest.jpeg"
                fill
                alt="invest"
                className="object-cover"
              />
              <Overlay
                title="Investment"
                text="Saving with Every Penny can unlock the door to your academic dreams. Small, consistent savings can add up to significant amounts, helping you cover tuition fees, textbooks, and living expenses. Every Penny empowers you to visualize your educational goals and track your progress, turning spare change into the fuel for a brighter future. Don't let financial limitations hold you back - Every Penny can help you invest in your education and unlock a world of knowledge."
              />
            </div>

            <div className={cn("h-[20rem] lg:h-[35rem] ", smallCard)}>
              <Image
                src="/assets/images/projects.png"
                fill
                alt="projects"
                className="object-cover"
              />
              <Overlay
                title="Projects"
                text="Every Penny can be your project powerhouse! Those everyday savings, diligently tracked and visualized, can transform into the resources you need to bring your dreams to life. Whether it's a home renovation, a creative venture, or that passion project you've always envisioned, Every Penny helps you turn small amounts into big results.  See your progress unfold, celebrate milestones, and watch your project savings grow, one penny at a time."
              />
            </div>
          </div>
          <h3 className="text-green-50 text-4xl font-play font-[700] text-center mt-8">
            And lots more...
          </h3>
        </MaxWidthContainer>
        {/* BG GRADIENT */}
        <div className=" size-56 rounded-full blur-[200px] bg-gradient-to-tr to-40% from-green-700 from-20% via-yellow-500 to-green-300 absolute left-5 top-10 " />
      </section>
    </>
  );
}
