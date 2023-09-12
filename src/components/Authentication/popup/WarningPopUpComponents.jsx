import React from 'react';
import false1 from '../../../assets/images/false.png'
import true1 from '../../../assets/images/success.png'

function WarningPopUpComponents({ setIsShowErr, message }) {
    return (
        <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular right-0  bottom-0 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 py-10 w-72 z-10 border border-bg-primary shadow-xl" >
                <div className="flex flex-col justify-end">
                    <div className="relative w-40 m-auto pb-7">
                        <img src={false1} alt="Signup Picture" className="w-28 m-auto" />
                    </div>
                    <p className={`text-2xl text-center font-sp-pro-text-semibold ${setIsShowErr ? 'text-custom-red' : 'text-custom-blue'}`}>
                        Ooop...
                    </p>
                    <p className="text-sm font-sp-pro-text-regular text-center text-text-color mt-3">
                        {message != null ? message :
                            "Your email or password is incorrect! Please try again"
                        }
                    </p>
                    <button onClick={() => setIsShowErr(false)} className="bg-custom-red hover:bg-red-500 text-white  mt-8 py-2 px-4 bg-bl rounded-2xl">
                        <span >Close </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default WarningPopUpComponents;