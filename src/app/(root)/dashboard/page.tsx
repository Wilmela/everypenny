import PageHeading from "@/components/blocks/PageHeading";
import MaxWidthContainer from "@/components/shared/MaxWidthContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminActions } from "@/constants";

import Link from "next/link";

const DashboardPage = () => {
  return (
    <MaxWidthContainer className="paddingY">
      <PageHeading
        title="Dashboard"
        description=" Perform administrative functions"
      />

      <div className="w-full flex flex-col md:flex-row gap-4">
        {adminActions.map((action) => {
          return (
            <Link href={action.href} key={action.text}>
              <Card>
                <CardHeader>
                  <CardTitle className="p-text uppercase">
                    {action.tag}
                  </CardTitle>
                  <CardDescription>{action.text}</CardDescription>
                </CardHeader>
                <CardContent className="relative w-full h-fit">
                  <action.icon className="size-12 text-APP_GREEN" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </MaxWidthContainer>
  );
};

export default DashboardPage;
