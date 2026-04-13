"use server"

import { prisma } from "../prisma";

export default async function fecthAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstname: true,
            Lastname: true,
            email: true,
          }
        },
        doctor: {
          select: {
            firstname: true,
            Lastname: true,
            email: true,
            imageUrl: true
          }
        },
      },
      orderBy: { createdAt: "desc" }
    });
    return appointments;
  } catch (error) {
    console.log("Error while fetching appointments" + error);
  }
}