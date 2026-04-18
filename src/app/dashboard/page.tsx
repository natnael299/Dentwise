import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Activities from "./Activities"
import UpcomingAppointments from "./UpcomingAppointments"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import NavBarAdmin from "@/components/ui/NavBarAdmin";
import WelcomeBanner from "./WelcomeBanner";
import MainActions from "./MainAction";
async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  return (
    <>
      <NavBarAdmin />
      <WelcomeBanner />
      <MainActions />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto mb-20">
        <Activities />
        <UpcomingAppointments />
      </div>
    </>
  )
}

export default Dashboard
