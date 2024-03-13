import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import AuthForm from "@/components/shared/AuthForm";

const SignUp = () => {
  return (
    <section className="bg-green-50">
      <MaxWidthContainer className="auth-wrapper">
        <h1 className="title mb-8">Sign Up</h1>
        <AuthForm type="SignUp" />
      </MaxWidthContainer>
    </section>
  );
};

export default SignUp;
