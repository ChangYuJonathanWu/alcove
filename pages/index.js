import React, { useState } from 'react'
import Home from '@/components/home/Home'
import { Capacitor } from '@capacitor/core'
import SignIn from '@/components/signIn/SignIn'

export default function Main() {
  if (Capacitor.isNative) {
    return <SignIn />
  }
  return <Home />
}