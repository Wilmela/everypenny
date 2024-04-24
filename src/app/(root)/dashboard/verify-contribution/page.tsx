import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import PersonalDetails from "@/components/shared/PersonalDetails";
import SearchForm from "@/components/shared/SearchForm";
import VerificationButton from "@/components/shared/VerificationButton";
import { getSubType } from "@/constants";
import { getSession } from "@/lib/actions/auth.action";
import { findAllUsers } from "@/lib/actions/user.action.";
import { cn } from "@/lib/utils";
import { SearchUserParams } from "@/types";
import { redirect } from "next/navigation";

const VerifyContributionPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const session = await getSession();

  if (session.role !== "admin") redirect("/");

  const query = searchParams?.query?.toLowerCase() || "";

  const users = await findAllUsers();
  if (!users) throw new Error("No users found.");

  // Filter user by first name, last name, email or regId
  const filteredUser: any = users.find(
    (user: SearchUserParams) =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.regId!.includes(query)
  );

  if (!filteredUser)
    throw new Error(`User with name: ${query} does not exist.`);

  const userSub = getSubType(filteredUser.plan);

  let latestContribution;
  let latestContributionResult;

  // Make sure filtered user is not null
  if (filteredUser !== null) {
    latestContribution = filteredUser.contributions;

    latestContributionResult =
      latestContribution[latestContribution.length - 1];
  }

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading title="Contributions" description="Verify contributions" />
      <div className="flex justify-end items-center gap-4 mb-8">
        <SearchForm />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className={cn("w-96", { hidden: !filteredUser })}>
          <PersonalDetails
            firstName={filteredUser?.firstName!}
            lastName={filteredUser?.lastName!}
            email={filteredUser?.email!}
            regId={filteredUser?.regId!}
            plan={userSub}
            role={filteredUser?.role}
            phone={filteredUser?.phone}
            userId={filteredUser?._id!}
            userImage={filteredUser?.imageUrl!}
            isEditable={session?.userId === filteredUser?._id!}
          />
          <div className="mt-4">
            {!latestContributionResult?.verifiedContribution &&
            latestContributionResult?.verifiedContribution !== undefined ? (
              <VerificationButton
                id={latestContributionResult?._id!}
                userId={filteredUser?._id!}
                sessionUserId={session?.userId}
                isVerified={latestContributionResult?.verifiedContribution!}
              />
            ) : (
              <p className="p-text">No unverified contribution</p>
            )}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default VerifyContributionPage;
