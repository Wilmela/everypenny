import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import PlanCard from "@/components/shared/PlanCard";
import { subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { findUserById } from "@/lib/actions/user.action.";
import { cn } from "@/lib/utils";

const PlanPage = async () => {
  const { userId } = await getSession();

  const user = await findUserById(userId!);

  const isActive = user?.plan.isActive || false;

  return (
    <MaxWidthContainer className="paddingY flex flex-col">
      <div className="text-center mb-8">
        <h1 className="page-title">Pick A Plan</h1>
        <p className={cn("mt-2 page-sub-title")}>
          Choose a comfortable plan and start growing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-2">
        {subscriptionPlans.map((plan) => {
          return (
            <PlanCard
              key={plan.type}
              bgImg={plan.bgImg}
              type={plan.type}
              duration={plan.duration}
              desc={plan.desc}
              isActive={isActive}
              userId={userId!}
            />
          );
        })}
      </div>
    </MaxWidthContainer>
  );
};

export default PlanPage;
