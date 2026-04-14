import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UseGetDoctor } from "@/hooks/use-doctors"
import { MailIcon, PenIcon, PhoneIcon, PlusIcon, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import { Doctor } from "@prisma/client";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";

function Doctors() {
  const { data: Doctors } = UseGetDoctor();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsEditDialogOpen(true)
  }
  return (
    <>
      <Card className="mb-12">
        <CardHeader className="flex items-center justify-between px-3">
          <div className="flex flex-col items-start gap-1">
            <CardTitle className="flex gap-2">
              <Stethoscope className="text-secondary" />
              Doctors Management
            </CardTitle>
            <CardDescription>Manage and oversee all doctors in your practice</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusIcon />
            Add Doctor
          </Button>
        </CardHeader>
        <CardContent>
          {Doctors && Doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center justify-between px-2 py-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex gap-5">
                <Image src={doctor.imageUrl} alt="doctor-profile" height={45} width={45} className="size-12 rounded-full object-cover ring-2 ring-background" />
                <div className="flex flex-col items-start">
                  <div>{doctor.name}</div>
                  <div className="flex gap-2 text-muted-foreground">
                    {doctor.speciality}
                    <Badge>{doctor.gender.toLowerCase()}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-muted-foreground">
                    <p className="flex  items-center gap-1">
                      <MailIcon className="h-3 w-3" />
                      {doctor.email}
                    </p>
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <PhoneIcon className="h-3 w-3" />
                      {doctor.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="flex flex-row sm:flex-col items-center text-muted-foreground gap-1 sm:gap-0">
                  <span>
                    {doctor.appointmentsCount}
                  </span>
                  Appointments
                </div>
                <Badge>{doctor.isActive ? "Active" : "Inactive"}</Badge>
                <Button onClick={() => handleEditDialog(doctor)}>
                  <PenIcon />
                  Edit
                </Button>
              </div>
            </div>
          ))}

        </CardContent>
      </Card >

      <AddDoctorDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {selectedDoctor && (
        <EditDoctorDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          doctor={selectedDoctor}
        />
      )}
    </>
  )
}

export default Doctors
