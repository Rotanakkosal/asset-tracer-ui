import React, { useEffect, useState } from 'react';
import message from '../../assets/images/forgotPassword/message.png'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UserService from '../../redux/services/UserService';
import ReactLoading from "react-loading";

function EmailSendingComponent(props) {

    const [email, setEmail] = useState()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEmail(location.state?.email)
    }, [])

    const handleResendEmail = () => {
        setIsLoading(true)
        UserService.forgotPassword(email).then(res => {
            if (res.data?.success) {
                setIsLoading(false)
            }
        }, err => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            <section className="bg-bg-primary">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-xl shadow-md  md:mt-0 sm:max-w-md sm:p-8">
                        <div className=" container m-auto">
                            <div className='flex justify-center'>
                                <img src={message} width={80} height={80} alt="" />
                            </div>
                            <h2 className="mb-1 text-lg font-sp-pro-text-semibold text-primary leading-tight md:text-2xl text-center pt-4">
                                Check your email
                            </h2>
                            <p className="text-center font-sp-pro-text-regular mb-1 text-sm text-text-color pt-1">
                                We sent a link to reset password to email:
                            </p>
                            <p className="text-center font-sp-pro-text-medium text-sm text-blue-700">{email}</p>
                            <div className="py-5">
                                <NavLink
                                    to={"/signin"}
                                    className="flex justify-center gap-3 w-full text-center rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-regular text-white"
                                >
                                    <BiArrowBack className='text-xl' />
                                    Back  to Sign in
                                </NavLink>
                            </div>
                            <p className="mt-2 mb-0 pt-1 text-sm text-center text-text-color">
                                Din't recieve the email ?
                                {isLoading ?
                                    <button
                                        type='button'
                                        className="text-primary"
                                    >

                                        <span className="ml-2 flex items-center gap-1">
                                            <ReactLoading
                                                type="spin"
                                                color="#F8C400"
                                                width={14}
                                                height={14}
                                            />{" "}
                                            Sending
                                        </span>
                                    </button>
                                    :
                                    <button
                                        onClick={handleResendEmail}
                                        className="pl-3 text-primary"
                                    >
                                        Click to resend
                                    </button>
                                }
                            </p>
                            <div className="mt-2 mb-0 text-sm text-center text-text-color pt-5 font-sp-pro-text-medium ">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EmailSendingComponent;