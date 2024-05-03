import PageHeading from "@/components/blocks/PageHeading";
import FaQAccordion from "@/components/shared/FaqAccordion";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faq",
};
const FaqPage = () => {
  return (
    <MaxWidthContainer className="paddingY flex flex-col items-center">
      <PageHeading title="Faq" description="Right to know more" />
      
      <div className="w-full max-w-4xl">
        <FaQAccordion />
      </div>
    </MaxWidthContainer>
  );
};

export default FaqPage;
