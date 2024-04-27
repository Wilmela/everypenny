import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import UsersTable from "@/components/shared/UsersTable";
import { findAllUsers } from "@/lib/actions/user.action.";
import { baseUrl } from "@/lib/utils";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async () => {
  const users: User[] = await findAllUsers(); //

  if (users == null) throw new Error("No users found.");

  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading title="Users" description="All registered users." />
      <div className="hidden lg:max-w-5xl mx-auto md:flex flex-col justify-center">
        <UsersTable users={users} />
      </div>

      <div className="md:hidden w-full mx-auto flex flex-col justify-center">
        {users.map((user, i:number) => {
          let sn = i + 1;
          return (
            <UserRow
              href={user._id!}
              key={user.regId}
              sn={sn}
              firstName={user.firstName}
              lastName={user.lastName}
              regId={user.regId}
              imageUrl={user.imageUrl}
            />
          );
        })}
      </div>
    </MaxWidthContainer>
  );
};

export default UsersPage;

function UserRow({
  sn,
  firstName,
  lastName,
  imageUrl,
  regId,
  href,
}: {
  sn: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  regId: string;
  href: string;
}) {
  return (
    <Link
      href={`/profile/${href}`}
      className="shadow-sm flex gap-2 items-center p-2"
    >
      <p>{sn}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{regId}</p>
      <div className="relative size-10 rounded-full overflow-hidden">
        <Image
          src={`${baseUrl}/${imageUrl}`}
          fill
          alt="user"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
