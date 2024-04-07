import { PropsWithChildren } from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import NavItems from "./NavItems";
import { getSession } from "@/lib/actions/auth.action";
import Link from "next/link";

const Footer = async () => {
  const session = await getSession();

  return (
    <footer>
      <div className="py-8 bg-green-800">
        <MaxWidthContainer className="flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/assets/images/logo.png"
              alt="company_logo"
              width={60}
              height={40}
            />
            <div className="flex items-center gap-2">
              <p className="text-white hidden md:block">Reach us:</p>
              <Logo href="">
                <PieChartIcon />
              </Logo>
              <Logo href="">
                <TwitterLogoIcon />
              </Logo>
              <Logo href="">
                <InstagramLogoIcon />
              </Logo>
              <Logo href="">
                <LinkedInLogoIcon />
              </Logo>
            </div>
          </div>
          {/* Links */}
          <div className="flex items-center justify-center my-2">
            <NavItems userId={session.userId!} role={session.role!} />
          </div>
        </MaxWidthContainer>
      </div>
      <div className="bg-green-900 py-2">
        <p className="text-white text-center">
          &copy;2024 Every-penny. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

interface Props extends PropsWithChildren {
  href: string;
}
const Logo = ({ children, href }: Props) => (
  <Link
    href={href}
    className="w-10 h-10 rounded-full bg-APP_GREEN/20 flex items-center justify-center hover:bg-APP_GREEN/40 text-APP_GREEN cursor-pointer duration-300 ease-in"
  >
    {children}
  </Link>
);
