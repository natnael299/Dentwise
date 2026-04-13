"use client"
import fetchAppointments from "@/lib/actions/appointments"
import { useQuery } from "@tanstack/react-query"

export function UseGetAppointments() {
  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments
  })

  return appointments;
}