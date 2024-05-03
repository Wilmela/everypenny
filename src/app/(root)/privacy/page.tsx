import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";

const PrivacyPage = () => {
  return (
    <MaxWidthContainer className="paddingY flex flex-col items-center">
      <PageHeading
        title="Privacy Policy"
        description="Learn about our privacy policy."
      />

      <div className="w-full max-w-4xl p-text">
        <p className="text-lg mb-4">
          At Everypenny.ng, we are committed to protecting your privacy. This
          Privacy Policy outlines how your personal information is collected,
          used, and shared when you visit or make a purchase from our website.
        </p>
        <p className="text-lg mb-4">
          We collect personal information provided by you when you sign up for
          our services or interact with our website. This may include your name,
          email address, and other relevant information.
        </p>
        <p className="text-lg mb-4">
          We use the information collected to provide and improve our services,
          communicate with you, and personalize your experience. We do not sell
          or share your personal information with third parties for their
          marketing purposes.
        </p>
        <p className="text-lg mb-4">
          By using Everypenny.ng, you consent to the collection and use of your
          personal information as described in this Privacy Policy. If you have
          any questions or concerns about our privacy practices, please contact
          us.
        </p>
        <p className="text-lg">
          This Privacy Policy is subject to change. Please review this page
          periodically for any updates.
        </p>
      </div>
    </MaxWidthContainer>
  );
};

export default PrivacyPage;
