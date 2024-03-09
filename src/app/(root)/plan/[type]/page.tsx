import { MotionDiv } from "@/components/blocks/Blocks";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import PlanCustomizationForm from "@/components/shared/PlanCustomizationForm";
import { subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import Image from "next/image";

type SubType = (typeof subscriptionPlans)[number];

const PlanSetUpPage = async ({
  params: { type },
}: {
  params: { type: string };
}) => {
  const selectedPlan: any = subscriptionPlans.find(
    (p: SubType) => p.type === type
  );

  const session = await getSession();

  console.log(type, selectedPlan.duration);
  
  return (
    <section className="bg-gray-50">
      <MaxWidthContainer className="paddingY">
        <h3 className="sub-title">Setup Your {type} Plan</h3>

        <MotionDiv
          whileInView={{ x: [100, 0] }}
          className="grid grid-cols-1 md:grid-cols-2 md:justify-between mt-16 gap-8"
        >
          <div>
            <div className="w-full md:w-[300px] h-[300px] lg:w-[600px] relative">
              <Image
                src={selectedPlan.bgImg}
                fill
                priority
                alt="type_image"
                className="object-cover"
              />
            </div>

            <div className="my-5">
              <h3 className="text-xl font-[300] text-gray-600">
                {selectedPlan.type}
              </h3>
              <h3 className="text-3xl font-[700]">{selectedPlan.duration}</h3>
              <h3 className="font-[300] text-muted-foreground">
                {selectedPlan.desc}
              </h3>
            </div>
          </div>

          <div className="w-full md:w-[200px] lg:w-[400px] bg-white shadow-md p-4 h-fit rounded-md">
            <h2 className="my-2">Customize Your Plan</h2>
            <PlanCustomizationForm
              userId={session.userId!}
              type={type}
              duration={selectedPlan.duration}
            />
          </div>
        </MotionDiv>
      </MaxWidthContainer>
    </section>
  );
};

export default PlanSetUpPage;
