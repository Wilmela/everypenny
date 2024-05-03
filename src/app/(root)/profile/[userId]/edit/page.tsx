import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import UserUpdateForm from "@/components/shared/UserUpdateForm";
import { getSession } from "@/lib/actions/auth.action";
import { findUserById } from "@/lib/actions/user.action.";
import { UpdateUserProps } from "@/types";

const EdiPage = async ({ params }: { params: { userId: string } }) => {
  const session = await getSession();
  if (!session) throw new Error("No logged in user..");

  const user: UpdateUserProps = await findUserById(params.userId);
  if (!user) throw new Error("No user found.");

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading
        title="Update User"
        description={` Make changes to ${user.firstName}&apos;s profile`}
      />

      <div className="w-full flex items-center justify-center mt-8">
        <UserUpdateForm user={user} session={session} />
      </div>
    </MaxWidthContainer>
  );
};

export default EdiPage;
