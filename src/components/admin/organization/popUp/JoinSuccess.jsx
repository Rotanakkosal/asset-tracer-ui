import React from 'react'
import suc_pic from '../../../assets/images/success.png'

export default function JoinSuccess() {

    return (
        <div>
            <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular bg-none right-0 bottom-0 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 py-10 w-72 z-10 border border-bg-primary shadow-xl" >
                    <div className="flex flex-col justify-end">
                        <div className="relative w-40 m-auto pb-7">
                            <img src={suc_pic} alt="Signup Picture" className="w-28 m-auto" />
                        </div>
                        <p className={`text-2xl text-center font-sp-pro-text-semibold ${setIsShowErr ? 'text-custom-red' : 'text-custom-blue'}`}>
                            Success
                        </p>
                        <p className="text-sm font-sp-pro-text-regular text-center text-text-color mt-3">
                            {setIsShowErr ? 'This email is already registered' : <>
                                You have joined successfully! <span className='text-blue-700'> Please wait admin approving </span>
                            </>}
                        </p>
                        <button
                            onClick={() => hanldeHideModal(false)}
                            className={`bg-custom-blue text-white  mt-8 py-2 px-4 bg-bl rounded-2xl`}
                        >
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
