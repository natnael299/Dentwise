import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import NavBarAdmin from "@/components/ui/NavBarAdmin";
import WelcomeBanner from "./WelcomeBanner";
async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  return (
    <>
      <NavBarAdmin />
      <WelcomeBanner />
    </>
  )
}

export default Dashboard
