

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader from 'react-spinners/CircleLoader';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function DefaultLoader() {
    return (
        <div>
            <CircleLoader
                loading={true}
                color={'#F97B22'}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}
