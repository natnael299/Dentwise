"use client"

import { fetchDoctors, createDoctors } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function UseGetDoctor() {
  const doctors = useQuery({
    queryKey: ["fetchDoctors"],
    queryFn: fetchDoctors
  });
  return doctors
}

export function UseCreateDoctor() {
  const query = useQueryClient();
  const result = useMutation({
    mutationFn: createDoctors,
    onSuccess: (doctor) => {
      if (!doctor) return;
      console.log("Doctor Created!");
      //update the ui with the new data
      query.invalidateQueries({ queryKey: ["fetchDoctors"] })
    },
    onError: (error) => console.log(error?.message || "Failed to create a new Doctor!")
  });
  return result
}