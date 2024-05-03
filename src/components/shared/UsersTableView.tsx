import { User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { baseUrl } from "@/lib/utils";
import { LuMoreVertical } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Contribute,
  DeleteUser,
  EditUser,
  ToggleUserActive,
} from "./UserActions";
import { notFound } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const UsersTableView = ({ users }: { users: User[] }) => {
  if (users.length <= 0) return notFound();

  return (
    <>
      <Button asChild size="lg" className="w-fit btn self-end mb-8">
        <Link href="/auth/sign-up">Register User</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Reg ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Verified</span>
            </TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => {
            let sn = i + 1;
            return (
              <TableRow key={user._id}>
                <TableCell>{sn}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.regId}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <div className="size-10 border border-APP_GRREN overflow-hidden rounded-full relative">
                    <Image
                      src={`${baseUrl}${user.imageUrl}`}
                      fill
                      alt="user"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <MdOutlineVerified className="size-6 text-green-600 " />
                  ) : (
                    <GoUnverified className="size-6 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <>
                        <LuMoreVertical />
                        <span className="sr-only">Action</span>
                      </>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ToggleUserActive
                        userId={user._id as string}
                        verify={user.isVerified as boolean}
                      />
                      <EditUser userId={user._id!} />
                      <Contribute userId={user._id!} />

                      <DropdownMenuSeparator />
                      <DeleteUser userId={user._id!} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTableView;
