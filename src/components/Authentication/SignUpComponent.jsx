import React from 'react'
import { auth, provider } from '../../redux/services/googleAuth/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import signup from '../../assets/images/signup.png'
import RegisterPopUpComponent from './popup/RegisterPopUpComponent';
import api from '../../redux/services/api';
import UserService from '../../redux/services/UserService';
import LoadingComponent from '../LoadingComponent';
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function SignUpComponent() {
    const navigator = useNavigate();
    const provider = new GoogleAuthProvider();
    const [isShowErr, setIsShowErr] = useState(false)
    const [isShowSuc, setIsShowSuc] = useState(false)
    const validate = () => { }
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)

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
                            localStorage.setItem("token", res.data.payload.token)
                            if (localStorage.getItem("token")) {
                                navigator("/organization-create", { state: { isShowSubMenu: true } });
                            }

                        })
                }
            })
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email').test('has-com', 'Email must end with .com', (value) =>
            value.endsWith('.com')
        ),
        name: Yup.string().required('Name is Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is Required')
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const inputType = showPassword ? 'text' : 'password';
    return (
        <>
            {isShowErr && (
                <RegisterPopUpComponent setIsShowErr={isShowErr} status={status} />
            )}

            {isShowSuc && (
                <RegisterPopUpComponent setIsShowSuc={isShowSuc} status={status} />
            )}

            {loading && <LoadingComponent />}

            <div className="h-screen w-full m-auto font-sp-pro-text-regular md:w-full text-text-color relative">
                <div className="flex h-full items-center justify-center lg:px-10 px-5 md:justify-around z-10">
                    <div className='w-full'>
                        <div className="w-[450px] m-auto p-10 rounded-2xl border-slate-100 md:border bg-white sm:shadow-md"
                        >
                            <h2 className="text-3xl text-center font-sp-pro-text-bold text-text-color">
                                Create Your Account
                            </h2>

                            <div className="my-5 flex font-sp-pro-text-regular text-sm items-center before:mt-0.5 before:flex-1 before:border-t-[4px] before:border-primary after:mt-0.5 after:flex-1 after:border-t after:border-transparent">
                                <p className="mx-4 mb-0 text-center font-sp-pro-text-medium text-primary">
                                    Sign up with
                                </p>
                            </div>
                            <button onClick={SignInWithFirebase} className="font-sp-pro-text-regular border border-border-strock flex items-center justify-center w-full rounded-lg py-2 text-sm text-gray-800">
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
                                <span className="ml-2 font-semibold">Sign up with Google</span>



                            </button>
                            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t-2 before:border-gray-light after:mt-0.5 after:flex-1 after:border-t-2 after:border-gray-light">
                                <p className="mx-4 mb-0 text-center text-sm text-text-color ">
                                    OR
                                </p>
                            </div>
                            <Formik
                                initialValues={{ email: "", name: "", password: "" }}
                                onSubmit={(values, { resetForm }) => {
                                    setLoading(true)
                                    UserService.singup(values).then(res => {
                                        if (res.data?.success) {
                                            setStatus(!status)
                                            setIsShowSuc(true)
                                            setIsShowErr(false)
                                            resetForm({ email: "", name: "", password: "" })
                                            setLoading(false)
                                        }
                                    }, err => {
                                        if (err.response.data.title == "User Duplicate Exception") {
                                            setStatus(!status)
                                            setIsShowErr(true)
                                            setIsShowSuc(false)
                                        }
                                        setLoading(false)
                                    })

                                }}
                                validationSchema={SignupSchema}
                                validate={validate}
                            >
                                {({ }) => (
                                    <Form>
                                        <div className="text-left mb-3">
                                            <label className="block mb-2 ml-1 text-sm">Name</label>
                                            <Field name='name' type="text" className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary" placeholder="Enter your name" />
                                            <ErrorMessage name="name" component="div" className="text-reject text-xs ml-1" />

                                        </div>

                                        <div className="text-left mb-3">
                                            <label className="block mb-2 ml-1 text-sm">Email</label>
                                            <Field name='email' type="email" className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary" placeholder="Enter you email" />
                                            <ErrorMessage name="email" component="div" className="text-reject text-xs ml-1" />

                                        </div>
                                        <div className="text-left mb-3">
                                            <label className="block mb-2 ml-1 text-sm">password</label>
                                            <div className='flex justify-end'>
                                                <Field
                                                    type={inputType}
                                                    name='password'
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary" placeholder="********" />
                                                <div className='absolute m-2 '>
                                                    {showPassword ? (
                                                        <EyeSlashIcon
                                                            className="h-6 w-6 text-gray-500  cursor-pointer opacity-50"
                                                            onClick={handleTogglePassword}
                                                        />
                                                    ) : (
                                                        <EyeIcon
                                                            className="h-6 w-6 text-gray-500  cursor-pointer opacity-50"
                                                            onClick={handleTogglePassword}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <ErrorMessage name="password" component="div" className="text-reject text-xs ml-1" />
                                        </div>

                                        <div className="my-6">
                                            <button type="submit" className="bg-primary w-full hover:bg-pending-hover text-white font-sp-pro-text-regular py-2 px-4 rounded" style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 1px 4px 1px" }}>
                                                Sign up
                                            </button>
                                        </div>
                                        <div className="text-sm flex justify-between">
                                            <span className='text-slate-500'>
                                                Already have an account?
                                            </span>
                                            <div
                                                className="text-primary"
                                            >
                                                <Link to={"/signin"}>Sign In</Link>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    <div className="w-full hidden lg:block justify-center">
                        <img src={signup} alt="Signup Picture" className='w-[560px] m-auto' />
                    </div>
                </div>
            </div>
        </>
    )
}
