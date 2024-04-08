import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import UserUpdateForm from "@/components/shared/UserUpdateForm";
import { findUserById } from "@/lib/actions/user.action.";
import { UpdateUserProps } from "@/types";
import React from "react";

const EdiPage = async ({ params }: { params: { userId: string } }) => {
  const user: UpdateUserProps = await findUserById(params.userId);

  return (
    <MaxWidthContainer className="paddingY">
      <h3 className="page-title">Update User</h3>
      <div className="w-full flex items-center justify-center mt-8">
        <UserUpdateForm user={user} />
      </div>
    </MaxWidthContainer>
  );
};

export default EdiPage;
