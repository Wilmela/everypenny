"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteUser, toggleVerification } from "@/lib/actions/user.action.";
import Link from "next/link";

export function ToggleUserActive({
  userId,
  verify,
}: {
  userId: string;
  verify: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleVerification(userId, !verify);
        })
      }
    >
      {verify ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}
export function EditUser({ userId }: { userId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Link href={`/profile/${userId}/edit`}>Edit</Link>
    </DropdownMenuItem>
  );
}
export function Contribute({ userId }: { userId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Link href={`/profile/${userId}`}>Contribute</Link>
    </DropdownMenuItem>
  );
}
export function DeleteUser({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUser(userId);
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
