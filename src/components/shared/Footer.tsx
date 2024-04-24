import { PropsWithChildren } from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { AiOutlineMail, AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import NavItems from "./NavItems";
import { getSession } from "@/lib/actions/auth.action";
import Link from "next/link";
import { findUserById } from "@/lib/actions/user.action.";

const Footer = async () => {
  const session = await getSession();
  const user = await findUserById(session.userId!);

  return (
    <footer>
      <div className="py-8 bg-[#064b1e] relative">
        <MaxWidthContainer className="flex flex-col">
          <div className="flex justify-between items-center mb-8 ">
            <Image
              src="/assets/images/logo.png"
              alt="company_logo"
              width={60}
              height={40}
            />
            <div className="flex items-center gap-2">
              <p className="text-white hidden md:block">Reach us:</p>
              <Logo href="">
                <AiOutlinePhone />
              </Logo>
              <Logo href="">
                <AiOutlineMail />
              </Logo>
              <Logo href="">
                <AiOutlineWhatsApp />
              </Logo>
              <Logo href="">
                <FaXTwitter />
              </Logo>
              <Logo href="">
                <InstagramLogoIcon />
              </Logo>
            </div>
          </div>
          {/* Links */}
          <div className="justify-center flex my-2">
            <NavItems userId={user?._id} role={user?.role!} />
          </div>
          <Link
            href="/privacy"
            className="text-center mt-4 p-text-white hover:text-green-200 underline"
          >
            Privacy Policy
          </Link>
        </MaxWidthContainer>
        {/* BG GRADIENT */}
        <div className=" size-44 rounded-full blur-[120px] bg-gradient-to-tr to-40% from-green-900 from-20% via-green-500 to-yellow-600 absolute left-52 top-20" />
      </div>
      <div className="bg-[#06401b] py-2">
        <p className="text-white text-center">
          &copy;2024 EveryPenny. All rights reserved.
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
