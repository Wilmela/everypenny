import { ReactNode } from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import NavItems from "./NavItems";

const Footer = () => {
  return (
    <footer>
      <div className="py-8 bg-green-800">
        <MaxWidthContainer className="flex flex-col">
          <div className="flex justify-between items-center">
            <Image
              src="/assets/images/logo.png"
              alt="company_logo"
              width={60}
              height={40}
            />
            <div className="flex items-center gap-2">
              <Logo>
                <TwitterLogoIcon />
              </Logo>
              <Logo>
                <InstagramLogoIcon />
              </Logo>
              <Logo>
                <LinkedInLogoIcon />
              </Logo>
            </div>
          </div>
          {/* Links */}
          <div className="flex items-center justify-center my-2">
            <NavItems />
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

const Logo = ({ children }: { children: ReactNode }) => (
  <div className="w-10 h-10 rounded-full bg-APP_GREEN/20 flex items-center justify-center hover:bg-APP_GREEN/40 text-APP_GREEN cursor-pointer duration-300 ease-in">
    {children}
  </div>
);
