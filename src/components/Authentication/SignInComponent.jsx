import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import signin from '../../assets/images/signin.png'
import WarningPopUpComponents from './popup/WarningPopUpComponents';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../redux/services/googleAuth/firebase';
import api from '../../redux/services/api';
import UserService from '../../redux/services/UserService';
import RegisterPopUpComponent from './popup/RegisterPopUpComponent';
import SpinnerComponent from '../admin/spinner/SpinnerComponent';
import jwt_decode from "jwt-decode";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";


import LoadingComponent from '../LoadingComponent';
import FileUploadService from '../../redux/services/FileUploadService';
export default function SignInComponent() {
    const [message, setMessage] = useState()
    const [isShowErr, setIsShowErr] = useState(false)
    const [isShowSuc, setSuccess] = useState(false)
    const [isSuccessSignUp, setIsSuccessSignUp] = useState(false)
    const [isRememberMe, setIsRememberMe] = useState()
    const navigator = useNavigate();
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code != null) {
            UserService.verifyRegistration(code)
        }

        if (location.state?.isShowSuc) {
            setIsSuccessSignUp(true)
        } else {
            setIsSuccessSignUp(false)
        }
    }, [])


    const SignInWithFirebase = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                if (result) {
                    api.post("/users/register-with-google", {
                        name: result._tokenResponse.displayName,
                        email: result._tokenResponse.email,
                        password: result._tokenResponse.idToken,
                    })
                        .then(res => {
                            setSuccess(true);
                            localStorage.setItem("token", res.data.payload.token)
                            let getToken = jwt_decode(res.data.payload.token)
                            if (localStorage.getItem("token")) {
                                if (getToken?.image) {
                                    localStorage.setItem("profileImage", FileUploadService.getImage(getToken.image))
                                }
                                setTimeout(() => {
                                    setLoading(false)
                                    navigator("/organization", { state: { isLoggedIn: true } });
                                }, 1000)
                            }
                        })
                }
            })
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Required")
            .test("has-com", "Email must end with .com", (value) =>
                value.endsWith(".com")
            ),
        password: Yup.string().required("Required"),
    });

    function blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const inputType = showPassword ? 'text' : 'password';
    return (
        <>
            {isShowErr && (
                <WarningPopUpComponents setIsShowErr={setIsShowErr} message={message} />
            )}

            {loading && <LoadingComponent />}

            <div className="h-screen w-full m-auto font-sp-pro-text-regular md:w-full text-text-color">
                <div className="flex h-full items-center justify-center lg:px-10 px-5 md:justify-around z-10">
                    <div className="hidden lg:block">
                        <img src={signin} alt="Signup Picture" className='w-[560px] ' />
                    </div>
                    <div className="p-10 rounded-2xl border-slate-100 md:border bg-white sm:shadow-lg" >
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={values => {
                                setLoading(true)
                                UserService.signin(values).then(res => {
                                    localStorage.setItem("token", res.data.payload.token)
                                    let getToken = jwt_decode(res.data.payload.token)
                                    if (localStorage.getItem("token")) {
                                        if (getToken?.image) {
                                            localStorage.setItem("profileImage", FileUploadService.getImage(getToken.image))
                                        }
                                        setTimeout(() => {
                                            setLoading(false)
                                            navigator("/organization", { state: { isLoggedIn: true } });
                                        }, 1000)
                                    }
                                }, err => {
                                    setLoading(false)
                                    setIsShowErr(true)
                                    if (err.response.data.title == "User is disabled") {
                                        setMessage("Please confirm your acount before signin")
                                    }
                                    else if (err.response.data.title == "Not Found Exception") {
                                        setMessage("Account does not exist! Please register your account.")
                                    }
                                    else if (err.response.data.title = "Password not correct") {
                                        setMessage("Your email or password is incorrect")
                                    }
                                })
                            }}
                            validationSchema={SignupSchema}>
                            {({ }) => (
                                <Form>
                                    <h2 className="text-3xl text-center font-sp-pro-text-bold text-text-color">
                                        Login Into Your Account
                                    </h2>
                                    <p className='text-sm text-left my-6'><span className='text-blue-600'>Welcome back!</span> Please enter your information</p>
                                    {/* input Email */}
                                    <div className="text-left mb-3">
                                        <label className="block mb-1 ml-0.5 text-sm">Email</label>
                                        <Field name="email" type="email"
                                            className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary"
                                            placeholder="Enter your email" />
                                        <ErrorMessage name="email" component="div" className="text-reject text-xs ml-1" />
                                    </div>
                                    {/* Input Password */}
                                    <div className="text-left mb-3">
                                        <label className="block mb-1 ml-0.5 text-sm">Password</label>
                                        <div className='flex justify-end'>
                                            <Field name="password"
                                                type={inputType}
                                                className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary"
                                                placeholder="Enter your passowrd"
                                            />
                                            <div className='absolute h-6 w-6 m-2 '>
                                                {showPassword ? (
                                                    <EyeSlashIcon
                                                        className=" text-gray-500 cursor-pointer opacity-50"
                                                        onClick={handleTogglePassword}
                                                    />
                                                ) : (
                                                    <EyeIcon
                                                        className=" text-gray-500 cursor-pointer opacity-50"
                                                        onClick={handleTogglePassword}
                                                    />
                                                )}
                                            </div>

                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-reject text-xs ml-1" />
                                    </div>
                                    <div className="text-sm flex justify-between my-5">
                                        <div className="flex items-center">
                                            {/* <input type="checkbox" value="" id='remember-me' onChange={setIsRememberMe} className="w-3.5 h-3.5  text-blue-600 bg-gray-100 border-bg-primary rounded-xl" /> */}
                                            <label className="ml-2 text-sm font-sm" htmlFor='remember-me'></label>
                                        </div>
                                        <div
                                            className="text-primary"
                                        >
                                            <Link to={"/forgot-password"}>Forgot password?</Link>
                                        </div>
                                    </div>

                                    {/* <div className="my-6"> */}
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-pending-hover w-full text-white font-sp-pro-text-regular py-2 px-4 my-6 rounded"
                                    >

                                        Sign in
                                    </button>
                                    {/* </div> */}

                                    <div className="text-sm flex justify-between z-0">
                                        <span className="text-text-color">Don't have account?</span>
                                        <div className="text-primary">
                                            <Link to={"/signup"}>Sign Up</Link>
                                        </div>
                                    </div>

                                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t-2 before:border-gray-light after:mt-0.5 after:flex-1 after:border-t-2 after:border-gray-light">
                                        <p className="mx-4 mb-0 text-center text-sm text-text-color ">
                                            OR
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <button onClick={SignInWithFirebase} className="font-sp-pro-text-regular border border-slate-300  flex items-center justify-center w-full rounded-lg py-2 text-sm text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#FF3D00"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4CAF50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1976D2"
                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                            <span className="ml-2 font-semibold">
                                Google
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
