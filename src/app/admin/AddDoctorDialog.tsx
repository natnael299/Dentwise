import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { Gender } from "@prisma/client"

type AddDoctorDialogProp = {
  open: boolean
  onClose: () => void
}

function AddDoctorDialog({ open, onClose }: AddDoctorDialogProp) {
  //inital values
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    gender: "MALE" as Gender,
    phone: "",
    speciality: "",
    isActive: true
  })

  //handle phone number
  const setPhoneNo = (num: string) => {
    setNewDoctor({ ...newDoctor, phone: num });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practise
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Dr. John Doe"
                value={newDoctor.name}
                onChange={((e) => setNewDoctor({ ...newDoctor, name: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speciality">Speciality</Label>
              <Input
                id="speciality"
                placeholder="General Dentisity"
                value={newDoctor.speciality}
                onChange={((e) => setNewDoctor({ ...newDoctor, speciality: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              value={newDoctor.email}
              onChange={((e) => setNewDoctor({ ...newDoctor, email: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+35853647233"
              onChange={(e) => { setPhoneNo(e.target.value) }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })}>
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
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) => setNewDoctor({ ...newDoctor, isActive: value === "active" })}>
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

        <DialogFooter>
          <Button variant="secondary">
            Cancel
          </Button>
          <Button variant="default">
            Add Doctor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default AddDoctorDialog