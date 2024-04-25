import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { Button } from "../ui/button";
import { getSession, signOut } from "@/lib/actions/auth.action";
import { findUserById } from "@/lib/actions/user.action.";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Header = async () => {
  const session = await getSession();
  const user = await findUserById(session.userId!);

  return (
    <header className="bg-primary fixed opacity-90 top-0 inset-x-0 z-50">
      <MaxWidthContainer>
        <div className="flex items-center justify-between py-6 h-14">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              width={60}
              height={60}
              priority
              alt="company-logo"
            />
          </Link>
          <div className="hidden md:block">
            <NavItems userId={user?._id} role={user?.role} />
          </div>
          <div className="flex gap-2 items-center">
            <div>
              {!session.isLoggedIn && (
                <div className="flex gap-2">
                  <Button asChild className="auth-btn" variant="secondary">
                    <Link href="/auth/sign-in">Sign-in</Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full hover:text-APP_GREEN text-white"
                    variant="ghost"
                  >
                    <Link href="/auth/sign-up">Sign-up</Link>
                  </Button>
                </div>
              )}

              {/* DP HERE */}
              {session.isLoggedIn && (
                <Popover>
                  <div className="flex items-center gap-2">
                    <p className={"text-sm text-white hidden sm:block"}>
                      Hi,{" "}
                      {user?.firstName!.length <= 6
                        ? user?.firstName
                        : `${user?.firstName?.slice(0, 6)}...`}
                    </p>

                    {/* IMAGE WRAPPER */}
                    <PopoverTrigger
                      className={cn(
                        "size-10 rounded-full relative overflow-hidden bg-APP_GREEN"
                      )}
                    >
                      <Image
                        src={
                          user.imageUrl
                            ? `${process.env.CLOUDINARY_IMAGE_URL}/${user?.imageUrl}`
                            : "/assets/images/dp.jpeg"
                        }
                        fill
                        alt="user"
                        className="object-cover"
                      />
                    </PopoverTrigger>

                    <PopoverContent className="w-fit">
                      {/* POPOVER CONTENT */}
                      <form action={signOut}>
                        <Button
                          className="rounded-full hover:text-gray-300 text-white"
                          type="submit"
                        >
                          Logout
                        </Button>
                      </form>
                    </PopoverContent>
                  </div>
                </Popover>
              )}
            </div>

            <MobileNav userId={user?._id} role={user?.role!} />
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  );
};

export default Header;
