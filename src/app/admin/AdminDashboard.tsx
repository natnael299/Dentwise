"use client"
import React from 'react'
import NavBarAdmin from "@/components/ui/NavBarAdmin"
import { useUser } from '@clerk/nextjs'
import { SettingsIcon } from 'lucide-react'
import { UseGetDoctor } from '@/hooks/use-doctors'
import { UseGetAppointments } from '@/hooks/use-appointments'
import AdminDashboardInfo from "./AdminDashboardInfo"
import Doctors from './Doctors'
//fetch doctors, appointments ...
export type StatesType = {
  totalDoctors: number,
  activeDocs: number,
  totalAppointments: number,
  completedApp: number
}
function AdminDashboard() {
  const { user } = useUser();
  const { data: doctors = [], isLoading: doctorsLoading } = UseGetDoctor();
  const { data: appointments = [], isLoading: appLoading } = UseGetAppointments();

  const states: StatesType = {
    totalDoctors: doctors.length,
    activeDocs: doctors.filter(d => d.isActive === true).length,
    totalAppointments: appointments.length,
    completedApp: appointments.filter(a => a.status === "COMPLETED").length
  };

  if (doctorsLoading || appLoading) return <LoadingUI />

  return (
    <div className='min-h-screen bg-background '>
      <NavBarAdmin />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Admin Dashboard</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Manage doctors, oversee appointments, and monitor your dental practice performance.
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <AdminDashboardInfo
        info={states}
      />
      <Doctors />
    </div>
  )
}

function LoadingUI() {
  return (
    <div className="min-h-screen bg-background">
      <NavBarAdmin />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard