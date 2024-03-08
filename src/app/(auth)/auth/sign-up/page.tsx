import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import SigUpForm from "@/components/shared/SignUpForm";

const SignUp = () => {
  return (
    <MaxWidthContainer className="auth-wrapper">
      <h1 className="title mb-8">Sign Up</h1>
      <SigUpForm />
    </MaxWidthContainer>
  );
};

export default SignUp;
