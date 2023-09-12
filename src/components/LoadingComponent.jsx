import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

export default function LoadingComponent() {
    return (
        <div>
            <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 right-0 z-[1000] bg-white bg-opacity-40 text-primary">
                <PulseLoader color="#F8C400"/>
            </div>
        </div>
    )
}
