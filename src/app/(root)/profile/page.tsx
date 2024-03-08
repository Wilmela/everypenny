import { getSession } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/auth/sign-in");
  } else {
    redirect(`/profile/${session.userId}`);
  }
  return <div>Redirecting to your profile page.</div>;
};

export default ProfilePage;
