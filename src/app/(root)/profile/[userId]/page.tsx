import PersonalDetails from "@/components/shared/PersonalDetails";
import ChronoTimeline from "@/components/shared/ChronoTimeline";
import ContributionForm from "@/components/shared/ContributionForm";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { getSubType, subscriptionPlans } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { getUserPlan } from "@/lib/actions/plan.action";
import { getUserTimeline } from "@/lib/actions/timeLines.actions";
import { redirect } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";
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
import { Separator } from "@/components/ui/separator";
import { findUserById } from "@/lib/actions/user.action.";

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
  const [user, userPlan, timeline, sum, userContributions] =
    await Promise.all<any>([
      findUserById(userId),
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
          Welcome, {user.firstName} {user.lastName}
        </h3>
        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-5 justify-between rounded-md my-8 gap-4 md:gap-0 relative">
          {/* COLUMN-1 */}
          <div className="items-start col-span-1 md:col-span-1 md:border-r-[0.5px] md:pr-2 sticky top-0 left-0">
            <>
              <PersonalDetails
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                regId={user.regId}
                plan={userSub}
                role={user.role}
                phone={user.phone}
                userId={user._id}
                userImage={user.imageUrl}
              />
              <Separator className="mt-4" />

              <p className="p-text uppercase mt-8">Make Contribution</p>
              <div className="my-6 px-2 py-6 bg-white shadow-md w-full rounded-lg">
                <ContributionForm
                  contributor={userId}
                  plan={userPlan?.type}
                  chosenAmount={userPlan?.amount || 0}
                />
              </div>

              <div className="flex flex-col items-center md:hidden">
                <Separator className="mb-4" />
                <p className="p-text">Bank: United Bank for Africa (UBA)</p>
                <div className="flex items-center gap-2">
                  <p className="p-text">Account Number: 1234567890</p>
                  <CopyIcon />
                </div>
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

                    {/* ACCOUNT MOBILE VIEW */}
                  </div>
                )}
              </div>
              {userContributions.contributions.length > 0 && (
                <>
                  <Separator />
                  <p className="p-text uppercase mb-4 mt-8">
                    Download Statement
                  </p>
                  <Statement
                    userContributions={userContributions.contributions}
                  />
                </>
              )}
            </>
            <Separator className="mt-4" />
            Overall Amount Calculate Payment based on steps <br />
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
              <CardFooter className="flex flex-col items-start bg-gray-50 pt-4 over border-t">
                <p className="p-text">Bank: United Bank for Africa (UBA)</p>
                <div className="flex items-center gap-2">
                  <p className="p-text">Account Number: 1234567890</p>
                  <CopyIcon />
                </div>
              </CardFooter>
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
