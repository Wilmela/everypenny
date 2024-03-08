import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import SignInForm from "@/components/shared/SignInForm";

const SignIn = () => {
  return (
    <MaxWidthContainer className="auth-wrapper">
      <h1 className="title mb-8">Sign In</h1>
      <SignInForm />
    </MaxWidthContainer>
  );
};

export default SignIn;
