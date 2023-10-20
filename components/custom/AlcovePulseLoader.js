import React from 'react'
import { PulseLoader } from "react-spinners";

export default function AlcovePulseLoader({color = "#F97B22", size = 12}) {
  return (
    <PulseLoader color={color} size={size} />
  )
}
