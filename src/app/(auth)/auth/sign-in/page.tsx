import Circles from "@/components/blocks/Circles";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { getSession } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import AuthForm from "@/components/shared/AuthForm";

const SignIn = async () => {
  const session = await getSession();

  if (session.isLoggedIn) redirect("/");
  return (
    <section
      className={
        "bg-green-50 flex flex-col items-center justify-center relative"
      }
    >
      <MaxWidthContainer className="auth-wrapper relative">
        <h1 className="title mb-8">Sign In</h1>
        <AuthForm type="SignIn" />

        {/* <Circles /> */}
      </MaxWidthContainer>
    </section>
  );
};

export default SignIn;
