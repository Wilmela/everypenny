import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import Opt from "@/components/shared/Opt";

const OtpPage = () => {
  return (
    <MaxWidthContainer className="paddingY ">
      <PageHeading title="Otp" description="Get verified" />
      <div className="flex items-center w-full justify-center mt-20">
        <Opt />
      </div>
    </MaxWidthContainer>
  );
};

export default OtpPage;
