import PersonalDetails from "@/components/shared/PersonalDetails";
import ChronoTimeline from "@/components/shared/ChronoTimeline";
import ContributionForm from "@/components/shared/ContributionForm";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { getUserPlan } from "@/lib/actions/plan.action";
import { getUserTimeline } from "@/lib/actions/timeLines.actions";
import { findUserById } from "@/lib/actions/user.action.";
import { TimeLineParams } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfileDetail = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/auth/sign-in");
  }

  const userPlan = await getUserPlan(userId);

  const userSub = subscriptionPlans.find(
    (sub) => sub.type === userPlan.type
  ) as (typeof subscriptionPlans)[number];

  const timeline: TimeLineParams[] = await getUserTimeline(
    userId,
    `/profile/${userId}`
  );

  // const data = await findUserById(userId); populate contributions for account statement

  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <h3 className="page-title text-center">Profile</h3>
        <h3 className="page-sub-title text-center my-2">
          Welcome, {session.firstName} {session.lastName}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 justify-between rounded-md my-8 gap-8 md:gap-0">
          {/* First */}
          <div className="items-start col-span-1 md:col-span-1">
            <p className="p-text py-2 uppercase">personal detail</p>
            <PersonalDetails type={userSub.type} />

            <>
              <p className="p-text uppercase mt-8">Make Contribution</p>
              <div className="my-6 p-2 bg-white shadow-md w-full rounded-md">
                <ContributionForm
                  contributor={userId}
                  plan={userPlan.type}
                  chosenAmount={userPlan.amount || 0}
                />
              </div>

              <h3 className="font-semibold text-3xl md:hidden text-center mt-8 ">
                Savings: ₦10000
              </h3>
            </>
          </div>

          {/* Second */}
          <div className="hidden md:block md:col-span-2">
            <h3 className="font-semibold text-3xl text-center">
              Savings: ₦10000
            </h3>
          </div>

          {/* Third */}
          <div className="col-span-1 md:col-span-2">
            {timeline.length ? (
              <ChronoTimeline timeLineItems={timeline} />
            ) : (
              <p className="p-text text-center">Start Contributing</p>
            )}
          </div>
        </div>
        Request Statement
        <br />
        Verify transaction by Admin
        <br />
        Overall Amount Calculate Payment based on steps <br />
      </MaxWidthContainer>
    </section>
  );
};

export default ProfileDetail;
