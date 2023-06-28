import React, { useState } from 'react'
import Home from '@/components/home/Home'
import Dashboard from '@/components/dashboard/Dashboard'
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from 'next/router';

export default function Admin() {
  const { user } = useAuthContext()
  const router = useRouter();
  if(!user) {
    router.replace('/login')
  }

  return <Dashboard/>
}