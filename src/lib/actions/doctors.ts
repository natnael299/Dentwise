"use server"
import { Gender } from "@prisma/client";
import { prisma } from "../prisma"
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";
export async function fetchDoctors() {
  try {
    //fetch every doctor & booked appointments
    const doctors = await prisma.doctor.findMany({
      include: { _count: { select: { appointments: true } } },
      orderBy: { createdAt: "desc" }
    })
    //map the doctors by including the appointments and return it
    return doctors.map((doctor) => ({ ...doctor, appointmentsCount: doctor._count.appointments }))
  } catch (error) {
    console.log("Error while fetching doctors" + error);
  }
}

type doctorsProps = {
  name: string,
  email: string,
  gender: Gender,
  phone: string,
  speciality: string,
  isActive: boolean
}

export async function createDoctors(inputs: doctorsProps) {
  try {
    if (!inputs.name || !inputs.email) throw new Error("No name or email!!");
    const doctor = await prisma.doctor.create({
      data: {
        ...inputs,
        imageUrl: generateAvatar(inputs.name, inputs.gender),
      }
    });
    revalidatePath("/admin"); //refetch admin page info
    return doctor;
  } catch (error: any) {
    console.log("Error while creating doctors" + error);

    if (error?.code == "P2002") {
      throw new Error("Email already in use!!");
    };
  }
  throw new Error("Failed to create a new Doctor!!");
}