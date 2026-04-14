import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import Doctors from "../../components/admin/Doctors";
async function AdminPage() {
  const user = await currentUser(); //GET current user
  if (!user) redirect("/dashboard");
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;
  //check whether the user is an admin or not
  if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard");
  return < AdminDashboard />;

}

export default AdminPage
