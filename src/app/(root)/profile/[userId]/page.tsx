import PersonalDetails from "@/components/shared/PersonalDetails";
import ChronoTimeline from "@/components/shared/ChronoTimeline";
import ContributionForm from "@/components/shared/ContributionForm";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { getSubType, subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { getUserPlan } from "@/lib/actions/plan.action";
import { getUserTimeline } from "@/lib/actions/timeLines.actions";
import { redirect } from "next/navigation";
import {
  getUserContributions,
  getUserTotalAmount,
} from "@/lib/actions/contribution.action";
import { cn, formatNaira } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "@radix-ui/react-icons";
import { ContributionParams } from "@/types";
import Statement from "@/components/shared/Statement";

const ProfileDetail = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/auth/sign-in");
  }

  // API CALL
  const [userPlan, timeline, sum, userContributions] = await Promise.all<any>([
    getUserPlan(userId),
    getUserTimeline(userId, `/profile/${userId}`),
    // Verify the contribution before running the sum function
    getUserTotalAmount(userId),
    getUserContributions(userId),
  ]);

  // GET USER SUBSCRIPTION TYPE
  const userSub = getSubType(userPlan);

  // Get the latest contribution for verification
  const latestContribution: Pick<
    ContributionParams,
    "contributionId" | "amount" | "dateOfContribution" | "verifiedContribution"
  >[] = userContributions.contributions;

  const latestContributionResult =
    latestContribution[latestContribution.length - 1];

  return (
    <section className="relative">
      <MaxWidthContainer className="paddingY">
        <h3 className="page-title text-center">Profile</h3>
        <h3 className="page-sub-title text-center my-1">
          Welcome, {session.firstName} {session.lastName}
        </h3>
        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-5 justify-between rounded-md my-8 gap-8 md:gap-0">
          {/* COLUMN-1 */}
          <div className="items-start col-span-1 md:col-span-1 md:border-r-[0.5px] md:pr-2">
            <>
              <PersonalDetails
                firstName={session.firstName!}
                lastName={session.lastName!}
                email={session.email!}
                regId={session.regId!}
                plan={userSub}
                role={session.role}
              />
              <p className="p-text uppercase mt-8">Make Contribution</p>
              <div className="my-6 px-2 py-6 bg-white shadow-md w-full rounded-lg">
                <ContributionForm
                  contributor={userId}
                  plan={userPlan?.type}
                  chosenAmount={userPlan?.amount || 0}
                />
              </div>
              <div className="flex flex-col items-center gap-2 md:hidden">
                {latestContribution && (
                  <div>
                    <div className="font-semibold text-3xl mt-8 text-center">
                      <p>Savings:</p>

                      <p>{formatNaira(sum)}</p>
                    </div>
                    <span className="flex items-center justify-center">
                      <VerificationStatus
                        contribution={latestContributionResult}
                      />
                    </span>
                  </div>
                )}
              </div>
              <p className="p-text uppercase mt-8">Download Statement</p>
              {userContributions.contributions.length > 0 && (
                <Statement
                  userContributions={userContributions.contributions}
                />
              )}
              <br />
              Contribution account.
              <br />
              Overall Amount Calculate Payment based on steps <br />
            </>
          </div>

          {/* COLUMN-2 */}
          <div className="hidden md:col-span-2 items-center md:flex md:flex-col">
            <Card
              className={cn("h-auto w-fit", {
                hidden: sum <= 0 || sum === null,
              })}
            >
              <CardHeader>
                <CardTitle className="p-text uppercase">Savings:</CardTitle>
                <CardDescription>Your available fund.</CardDescription>
              </CardHeader>
              <CardContent>
                {latestContribution && (
                  <>
                    <h3 className="font-semibold text-3xl">
                      {formatNaira(sum)}
                    </h3>
                    <VerificationStatus
                      contribution={latestContributionResult}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* COLUMN-3 */}
          <div className="col-span-1 md:col-span-2">
            {timeline.length ? (
              <ChronoTimeline timeLineItems={timeline} />
            ) : (
              <p className="p-text text-center">Start Contributing</p>
            )}
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
};

// Verification status component.
const VerificationStatus = ({
  contribution,
}: {
  contribution: { verifiedContribution: boolean };
}) => (
  <>
    {contribution ? (
      <div className="inline-flex gap-1 items-center">
        <p className="text-sm text-muted-foreground font-light">
          Last savings:{" "}
          {contribution.verifiedContribution ? "verified." : "Not verified."}
        </p>
        <CheckIcon
          width={34}
          height={34}
          className={cn("text-gray-200 font-bold text-2xl", {
            "text-APP_GREEN": contribution.verifiedContribution,
          })}
        />
      </div>
    ) : null}
  </>
);
export default ProfileDetail;
