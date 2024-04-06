import MaxWidthContainer from "./MaxWidthContainer";
import Image from "next/image";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { Button } from "../ui/button";
import { getSession, signOut } from "@/lib/actions/auth.action";

const Header = async () => {
  const session = await getSession();
  const role = session.role;

  return (
    <header className="bg-APP_GREEN sticky top-0 z-50">
      <MaxWidthContainer>
        <div className="flex items-center justify-between py-4 h-14">
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
            <NavItems userId={session.userId!} role={role!} />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
              {!session.isLoggedIn ? (
                <>
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
                </>
              ) : (
                <form action={signOut} className="flex items-center gap-2">
                  <p className="text-sm text-white hidden sm:block">
                    Hi, {session.firstName}
                  </p>
                  <Button
                    className="rounded-full hover:text-gray-300 text-white"
                    type="submit"
                  >
                    Logout
                  </Button>
                </form>
              )}
            </div>

            <MobileNav userId={session.userId!} />
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  );
};

export default Header;
