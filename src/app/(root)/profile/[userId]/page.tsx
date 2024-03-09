import ChronoTimeline from "@/components/shared/ChronoTimeline";
import ContributionForm from "@/components/shared/ContributionForm";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { getUserPlan } from "@/lib/actions/plan.action";
import Image from "next/image";

type MediaProps = {
  type: string;
  source: {
    url: string;
  };
};
type TimeLineProps = {
  title: string;
  cardTitle: string;
  media: MediaProps;
};

const ProfileDetail = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const session = await getSession();

  const plan = await getUserPlan(userId);

  const userSub = subscriptionPlans.find((sub) => sub.type === plan?.type);

  const timeLineItems: TimeLineProps[] = [
    {
      title: "May 2024",
      cardTitle: "Monthly Savings",
      media: {
        type: "IMAGE",
        source: {
          url: "/assets/images/logo.png",
        },
      },
    },
  ];

  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <h3 className="page-title text-center">Profile</h3>
        <h3 className="page-sub-title text-center my-2">
          Welcome, {session.firstName} {session.lastName}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-between rounded-md my-8 gap-8 md:gap-0">
          <div className="flex flex-col items-start col-span-2 md:w-[300px]">
            {/* Image */}
            <div className="relative w-full  h-[320px] flex gap-2 col-span-1">
              <Image
                src="/assets/images/dp.jpeg"
                fill
                alt="user_image"
                className="object-cover"
              />
            </div>

            {/* Details */}
            <>
              <div className="flex gap-2 mt-4">
                <p className="p-text">Full name: {session.firstName}</p>
                <p className="p-text">{session.lastName}</p>
              </div>
              <p className="p-text">Email: {session.email}</p>
              <p className="p-text">Registration No: {session.regId}</p>
              <span className="inline-flex items-center justify-center gap-2 p-text">
                Current plan:
                <p className="py-1 px-2 rounded-xl bg-APP_GREEN/20 w-fit ">
                  {userSub?.type || "No plan."}
                </p>
              </span>
            </>

            <div className="my-6 p-6 bg-white shadow-md w-full rounded-md">
              <p className="p-text text-center py-2">Make Contribution</p>
              <ContributionForm contributor={userId} plan={plan?.type} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <ChronoTimeline timeLineItems={timeLineItems} />
          </div>
        </div>
        Request Statement
      </MaxWidthContainer>
    </section>
  );
};

export default ProfileDetail;
