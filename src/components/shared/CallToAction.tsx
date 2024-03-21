import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 md:gap-2 md:justify-center lg:justify-start">
      <Button size="lg" className="btn" asChild variant="default">
        <Link href="#explore">Explore</Link>
      </Button>
      <Button
        size="lg"
        className="btn hover:text-green-700"
        asChild
        variant="ghost"
      >
        <Link href="/plan">Save &rarr;</Link>
      </Button>
    </div>
  );
};

export default CallToAction;
