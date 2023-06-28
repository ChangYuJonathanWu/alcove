import React, { useState } from 'react'
import Home from '@/components/home/Home'
import Dashboard from '@/components/dashboard/Dashboard'
import { useAuthContext } from "@/context/AuthContext";

export default function Admin() {
  const { user } = useAuthContext()

  return <Dashboard/>
}