

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader from 'react-spinners/CircleLoader';
import Navbar from "./home/Navbar";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function DefaultLoader() {
    return (
        <div style={{height: '100vh', backgroundColor: 'black', width: '100%'}}>
           
        </div>
    )
}
