import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Doctor, Gender } from "@prisma/client"
import { UseUpdateDoctor } from "@/hooks/use-doctors"
import { formatFinnishPhone } from "@/lib/utils"

type editDoctorDialogProp = {
  open: boolean
  onClose: () => void
  doctor: Doctor
}
function editDoctorDialog({ open, onClose, doctor }: editDoctorDialogProp) {
  //inital values
  const [editDoctor, setEditDoctor] = useState<Doctor | null>({ ...doctor })

  useEffect(() => {
    if (open) {
      setEditDoctor({ ...doctor });
    }
  }, [open, doctor]);

  const mutatedDoctorsInfo = UseUpdateDoctor();
  //handle phone number
  const setPhoneNo = (num: string) => {
    const formatedNum = formatFinnishPhone(num);
    if (editDoctor) {
      setEditDoctor({ ...editDoctor, phone: formatedNum });
    }
  };

  //handle saving doctor's info
  const handleSave = () => {
    if (editDoctor) {
      mutatedDoctorsInfo.mutate(
        { ...editDoctor }, { onSuccess: handleClose }
      );
    }
  }

  //close dialog & reset state
  const handleClose = () => {
    onClose();
    setEditDoctor(null);
  };
  return (

    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Doctor Information</DialogTitle>
          <DialogDescription>
            Add an existing doctors information
          </DialogDescription>
        </DialogHeader>

        {editDoctor && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Dr. John Doe"
                  value={editDoctor.name}
                  onChange={((e) => setEditDoctor({ ...editDoctor, name: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speciality">Speciality</Label>
                <Input
                  id="speciality"
                  placeholder="General Dentisity"
                  value={editDoctor.speciality}
                  onChange={((e) => setEditDoctor({ ...editDoctor, speciality: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                value={editDoctor.email}
                onChange={((e) => setEditDoctor({ ...editDoctor, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editDoctor.phone}
                placeholder="+35853647233"
                onChange={(e) => { setPhoneNo(e.target.value) }} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="">Gender</Label>
                <Select
                  value={editDoctor.gender || ""}
                  onValueChange={(value) => setEditDoctor({ ...editDoctor, gender: value as Gender })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">male</SelectItem>
                    <SelectItem value="FEMALE">female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Status</Label>
                <Select
                  value={editDoctor.isActive ? "active" : "inactive"}
                  onValueChange={(value) => setEditDoctor({ ...editDoctor, isActive: value === "active" })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

          </div>
        )}

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={mutatedDoctorsInfo.isPending}>
            {mutatedDoctorsInfo.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default editDoctorDialog