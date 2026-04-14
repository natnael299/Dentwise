"use server"
import { Gender } from "@prisma/client";
import { prisma } from "../prisma"
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";
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

type editDoctorsPro = {
  id: string
} & Partial<doctorsProps>

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

export async function updateDoctor(inputs: editDoctorsPro) {
  try {
    if (!inputs.name || !inputs.email) throw new Error("no name or email provided!!");

    //look for the selected doctor in the db
    const currentDoc = await prisma.doctor.findUnique({
      where: { id: inputs.id },
      select: { email: true }
    });
    if (!currentDoc) throw new Error("Doctor not found!!");

    let exsitingEmail = null;
    //check if the email has been updated
    if (inputs.email !== currentDoc.email) {
      //if updated check if the new email is already in use
      exsitingEmail = await prisma.doctor.findUnique({ where: { email: inputs.email } })
    }

    if (exsitingEmail) throw new Error("The email is already in use!!");

    //update the selected doctors data
    const doctor = await prisma.doctor.update({
      where: { id: inputs.id },
      data: {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        speciality: inputs.speciality,
        gender: inputs.gender,
        isActive: inputs.isActive,
      }
    });
    return doctor;
  } catch (error) {
    console.log("error while updating doctor info!!");
  }
  throw new Error("Failed to update data");
}