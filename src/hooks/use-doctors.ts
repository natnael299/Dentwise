"use client"

import { fetchDoctors } from "@/lib/actions/doctors";
import { useQuery } from "@tanstack/react-query";

export function UseGetDoctor() {
  const doctors = useQuery({
    queryKey: ["doctors-info"],
    queryFn: fetchDoctors
  });
  return doctors
}