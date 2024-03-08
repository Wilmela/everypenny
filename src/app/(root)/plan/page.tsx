import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import PlanCard from "@/components/shared/PlanCard";
import { subscriptionPlans } from "@/constants";
import { cn } from "@/lib/utils";

const PlanPage = async () => {

  // if (plan.isActive) {
  //   redirect(`/profile/${session.userId}`);
  // }
  return (
    <MaxWidthContainer className="paddingY flex flex-col">
      <div className="text-center mb-6">
        <h1 className="page-title">Pick A Plan</h1>
        <p className={cn("mt-2 page-sub-title")}>
          Choose a comfortable plan and start growing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {subscriptionPlans.map((plan) => {
          return (
            <PlanCard
              key={plan.type}
              bgImg={plan.bgImg}
              type={plan.type}
              duration={plan.duration}
              desc={plan.desc}
            />
          );
        })}
      </div>
    </MaxWidthContainer>
  );
};

export default PlanPage;
