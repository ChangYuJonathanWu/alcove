

import { useState, CSSProperties } from "react";
import { PulseLoader } from "react-spinners";
import Navbar from "./home/Navbar";
import { Stack } from "@mui/material";
import Image from "next/image";
import Logo from "../public/favicon.svg"


export default function DefaultLoader() {
    return (
        <div style={{ height: '100vh', backgroundColor: 'white', width: '100%' }}>
            <Stack style={{height: '100%'}} justifyContent={"center"} spacing={1} alignItems="center">
                <Image priority={true} src={Logo} width={250} height={80} alt="Alcove logo" />
                <PulseLoader color="#F97B22" size={12} />
            </Stack>

        </div>
    )
}
