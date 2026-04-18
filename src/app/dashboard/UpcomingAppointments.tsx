import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, User } from "lucide-react"
import { fetchUserAppoitment } from "@/lib/actions/appointments"
import { isSameDay, parseISO, format } from "date-fns"
import NoNextAppointments from "./NoNextAppointments";
async function UpcomingAppointments() {
  const appointments = await fetchUserAppoitment();
  if (appointments.length === 0) return <NoNextAppointments />;
  const closestApp = appointments[0];
  const appointmentDate = parseISO(closestApp.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const isToday = isSameDay(appointmentDate, new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <CalendarIcon className="size-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="w-full flex items-center justify-between px-5">
            <div className="flex items-center text-center gap-2 border p-2 rounded-lg bg-primary/40">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" /> Upcoming
            </div>
            <p className="text-lg">{isToday ? "Today" : "Upcoming"}</p>
          </div>

          <div className="flex flex-col items-start gap-3 mr-auto mt-7 ml-3">
            <div className="flex gap-5">
              <div className="bg-primary/40 rounded-full flex items-center px-3"><User /></div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-lg">{closestApp.doctorName}</p>
                <span className="text-muted-foreground">{closestApp.reason}</span>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="bg-primary/40 rounded-full flex items-center px-3"><CalendarIcon /></div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-lg">{formattedDate}</p>
                <span className="text-muted-foreground"> {isToday ? "Today" : format(appointmentDate, "EEEE")}</span>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="bg-primary/40 rounded-full flex items-center px-3"><Clock /></div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-lg">{closestApp.time}</p>
                <span className="text-muted-foreground">local time</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mt-4">
            {
              appointments.length > 1
                ? `+${appointments.length - 1}  Upcoming Appointment${appointments.length > 2 ? "s" : ""}`
                : "No other Upcoming Appointment"
            }
          </p>
        </div>
      </CardContent>
    </Card >
  )
}
export default UpcomingAppointments
