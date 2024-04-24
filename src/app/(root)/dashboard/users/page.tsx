import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import UsersTable from "@/components/shared/UsersTable";
import { findAllUsers } from "@/lib/actions/user.action.";
import { User } from "@/types";

const UsersPage = async () => {
  const users: User[] = await findAllUsers();

  if (users == null) throw new Error("No users found.");

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading title="Users" description="All registered users." />
      <div className="max-w-5xl mx-auto flex flex-col justify-center">
        <UsersTable users={users} />
      </div>
    </MaxWidthContainer>
  );
};

export default UsersPage;
