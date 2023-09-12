import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

export default function ProgressBarComponent() {
    let i = 0;

    const handleLoading = () => {
        setInterval(() => {
            i++;

            console.log(i)
        }, 5000)
    }

    // handleLoading()

    return (
        <div>
            <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 right-0 z-[1000] bg-white bg-opacity-40 text-primary">
                <ProgressBar  completed={80}
                    className="wrapper w-full rounded-none "
                    // barContainerClassName="container"
                    // completedClassName="barCompleted"
                    // labelClassName="label"
                />

            </div>
        </div>
    )
}
