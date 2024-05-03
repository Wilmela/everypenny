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
import User from "@/lib/database/model/user.model";

import Link from "next/link";

const DashboardPage = async () => {
  const usersCount = await User.countDocuments();
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
                  <CardTitle className="p-text uppercase inline-flex items-center gap-2">
                    {action.tag}
                    {action.tag === "Users" && (
                      <span className="px-2 bg-APP_GREEN/20 rounded-full text-green-700">
                        {usersCount}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{action.text}</CardDescription>
                </CardHeader>
                <CardContent className="w-full h-fit">
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
