import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUserAppoitmentStates } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server"
import { Brain, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import Link from "next/link"
async function Activities() {
  const user = await currentUser();
  const userStates = await fetchUserAppoitmentStates();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Brain className="text-primary" />  Your Dental Health
        </CardTitle>
        <CardDescription>Keep Track of your Dental Health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 p-4">

          <div className="flex flex-col items-center gap-3 p-4 bg-primary/60 rounded-xl">
            <span className="text-2xl font-bold text-popover-foreground mb-1">
              {userStates.completedVisites}
            </span>
            <p className="text-sm text-muted-foreground">Completed Visits</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 bg-primary/60 rounded-xl">
            <span className="text-2xl font-bold text-popover-foreground mb-1">
              {userStates.totalVisites}
            </span>
            <p className="text-sm text-muted-foreground">Total Appointments</p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 bg-primary/60 rounded-xl">
            <span className="text-2xl font-bold text-popover-foreground mb-1">
              {format(user?.createdAt!, "MMM yyyy")}
            </span>
            <p className="text-sm text-muted-foreground">Member Since</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Ready to get started?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Book your first appointment or try our AI voice assistant for instant dental advice.
              </p>
              <div className="flex gap-2">
                <Link href="/voice">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Try AI Assistant
                  </Button>
                </Link>
                <Link href="/appointments">
                  <Button size="sm" variant="outline">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Activities
