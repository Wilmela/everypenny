import FaQAccordion from "@/components/shared/FaqAccordion";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import { Metadata } from "next";
import Image from "next/image";
// import QandA from "@/components/atom/QandA";

export const metadata: Metadata = {
  title: "Faq",
};
const FaqPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <h1 className="page-title text-center">Faq</h1>
      <h3 className="page-sub-title text-center my-1">Right to know more</h3>

      <div className="w-full self-center lg:flex lg:gap-4 flex-1 mt-8">
        <div className="flex-1">
          <FaQAccordion />
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default FaqPage;
