import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import key from '../../assets/images/forgotPassword/key.png'
import vector from '../../assets/images/forgotPassword/vector.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import UserService from '../../redux/services/UserService';
import ReactLoading from "react-loading";

function ForgotPasswordComponent(props) {

    const navigator = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required').test('has-com', 'Email must end with .com', (value) =>
            value.endsWith('.com')),
    });

    return (
        <div className="h-screen flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 bg-bg-primary">
            <div className="w-full p-10 bg-white shadow-md md:mt-0 sm:max-w-md sm:p-8 rounded-xl">
                <div className='m-auto'>
                    <div className='flex justify-center'>
                        <img src={key} width={80} height={80} alt="" />
                    </div>
                    <h2 className="mb-1 text-xl font-sp-pro-text-semibold leading-tight text-primary md:text-2xl text-center pt-4">
                        Forgot Password
                    </h2>
                    <p className="text-center text-sm text-text-color font-sp-pro-text-regular pt-1">
                        Please enter your email address.
                    </p>
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        onSubmit={value => {
                            setIsLoading(true)
                            UserService.forgotPassword(value.email).then(res => {
                                if (res.data?.success) {
                                    navigator("/email-sending", { state: { email: value.email } })
                                    setIsLoading(false)
                                }
                            }, err => {
                                setIsLoading(false)
                            })
                        }}
                        validationSchema={SignupSchema}
                    >
                        {({ }) => (
                            <Form>
                                <div className="md:space-y-5 pt-5">
                                    <div className="text-left">
                                        <label className="block mb-2 ml-1 text-sm">Email</label>
                                        <Field name='email' type="email" className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2.5 px-4 mb-1 outline-none focus:border-primary" placeholder="Enter you email" />
                                        <ErrorMessage name="email" component="div" className="text-reject text-xs ml-1" />
                                    </div>
                                    <div>
                                        {isLoading ?

                                            <button
                                                type="button"
                                                className="hover:bg-pending-hover w-full rounded-lg bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white"
                                            >

                                                <ReactLoading
                                                    type="spin"
                                                    color="#FFFFFF"
                                                    width={19}
                                                    height={19}
                                                />{" "}
                                                <span className="ml-2">Sending</span>
                                            </button>
                                            :
                                            <button
                                                type="submit"
                                                className="hover:bg-pending-hover w-full rounded-lg bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white"
                                            >
                                                Send
                                            </button>
                                        }
                                    </div>
                                    <div className="py-2 text-sm text-center text-text-color hover:text-text-color font-sp-pro-text-medium ">
                                        <Link to={"/signin"} className='text-text-color'><img className='inline-block pr-2 pb-1' src={vector} width={20} /> Back  to Sign in</Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordComponent;