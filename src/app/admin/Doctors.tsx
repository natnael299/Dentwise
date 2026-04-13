import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UseGetDoctor } from "@/hooks/use-doctors"
import { MailIcon, PenIcon, PhoneIcon, PlusIcon, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import AddDoctorDialog from "./AddDoctorDialog";



function Doctors() {
  const { data: Doctors } = UseGetDoctor();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<boolean>(false);
  console.log(Doctors);

  const handleEditDialog = () => { }
  const handleAdddDialog = () => { }
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
          <Button onClick={handleAdddDialog}>
            <PlusIcon />
            Add Doctor
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between px-2 py-3 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex gap-5">
              <Image src="/image.png" alt="doctor-profile" height={45} width={45} className="size-12 rounded-full object-cover ring-2 ring-background" />
              <div className="flex flex-col items-start">
                <div>Dr. Kevin De bruyne</div>
                <div className="flex gap-2 text-muted-foreground">
                  Assist Expert
                  <Badge>AM</Badge>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-muted-foreground">
                  <p className="flex  items-center gap-1">
                    <MailIcon className="h-3 w-3" />
                    kdb@gmail.com
                  </p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <PhoneIcon className="h-3 w-3" />
                    +35883023323
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <div className="flex flex-row sm:flex-col items-center text-muted-foreground gap-1 sm:gap-0">
                <span>2</span>
                Appointments
              </div>
              <Badge>Active</Badge>
              <Button onClick={handleEditDialog}>
                <PenIcon />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card >

      <AddDoctorDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
    </>
  )
}

export default Doctors
