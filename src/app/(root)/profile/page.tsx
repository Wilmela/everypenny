// import { getSession } from "@/lib/actions/auth.action";
// import { redirect } from "next/navigation";

const ProfilePage = async () => {
  // const session = await getSession();

  // if (!session.isLoggedIn) {
  //   redirect("/auth/sign-in");
  // } else {
  //   redirect(`/profile/${session.userId}`);
  // }

  return (
    <div className="text-center p-text">
      You need to be signed in to get access to your personalized page.
    </div>
  );
};

export default ProfilePage;
