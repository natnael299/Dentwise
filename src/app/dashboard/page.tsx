import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  return (
    <div>
      <SignOutButton redirectUrl="/">
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  )
}

export default Dashboard
