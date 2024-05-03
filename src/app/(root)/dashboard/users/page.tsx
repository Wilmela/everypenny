import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
// import UsersTable from "@/components/shared/UsersTable";
import UsersTableView from "@/components/shared/UsersTableView";
import { findAllUsers } from "@/lib/actions/user.action.";
import { cache } from "@/lib/cache";
import { User } from "@/types";

import { notFound } from "next/navigation";

const getUsers = cache(
  async () => {
    const users: User[] = await findAllUsers();
    return users;
  },
  ["/dashboard/users", "getUsers"],
  { revalidate: 60 * 60 * 24 }
);

const UsersPage = async () => {
  const users = await getUsers();
  if (users == null) return notFound();

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading title="Users" description="All registered users." />
      <div className="lg:max-w-5xl mx-auto md:flex flex-col justify-center">
        {/* <UsersTable users={users} /> */}
        <UsersTableView users={users} />
      </div>

    </MaxWidthContainer>
  );
};

export default UsersPage;