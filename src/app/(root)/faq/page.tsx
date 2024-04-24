import FaQAccordion from "@/components/shared/FaqAccordion";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faq",
};
const FaqPage = () => {
  return (
    <MaxWidthContainer className="paddingY flex flex-col items-center">
      <h1 className="page-title text-center">Faq</h1>
      <h3 className="page-sub-title text-center my-1">Right to know more</h3>

      <div className="w-full max-w-4xl">
        <FaQAccordion />
      </div>
    </MaxWidthContainer>
  );
};

export default FaqPage;
