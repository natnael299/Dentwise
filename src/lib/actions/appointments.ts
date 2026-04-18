"use server"

import { prisma } from "../prisma";
import { auth } from "@clerk/nextjs/server";

export async function fecthAppointments() {
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
            name: true,
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
    return [];
  }
}

export async function fetchUserAppoitmentStates() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated!!");

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });
    if (!user) throw new Error("User not found!!");

    const [completedC, totalC] = await Promise.all([
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED"
        }
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
        }
      })
    ]);

    return {
      completedVisites: completedC,
      totalVisites: totalC
    }
  } catch (error) {
    console.log("Error while fethcing user appointments.")
    return {
      completedVisites: 0,
      totalVisites: 0
    }
  }
}

export async function fetchUserAppoitment() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated!!");


    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });
    if (!user) throw new Error("User not found!!");

    const userApp = await prisma.appointment.findMany(
      {
        where: { userId: user.id, status: "CONFORMED" },
        include: {
          doctor: { select: { name: true, imageUrl: true } },
          user: { select: { firstname: true, Lastname: true, email: true } }
        },
        orderBy: [{ date: "asc" }, { time: "asc" }]
      }
    );

    return userApp.map((app) => (
      {
        ...app,
        patientName: `${app.user.firstname || ""} ${app.user.Lastname || ""}`.trim(),
        pEmail: app.user.email,
        doctorName: app.doctor.name,
        dImageURL: app.doctor.imageUrl || "",
        date: app.date.toISOString().split("T")[0], //eg. "2026-04-18"
      }
    ))

  } catch (error) {
    console.log("Error while fetching user appointments", error);
    return [];
  }
}