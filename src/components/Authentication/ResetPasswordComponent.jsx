import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import key from '../../assets/images/forgotPassword/key.png'
import { useFormik } from 'formik';
import * as Yup from "yup";
import UserService from '../../redux/services/UserService';

function ResetPasswordComponent(props) {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const code = urlParams.get('code');
    const navigator = useNavigate()
    const [isValidCode, setIsValidCode] = useState(false)
    const [newData, setNewData] = useState({
        newPassword: "", confirmNewPasswrod: ""
    })
    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    };

    const handleCheckValidCode = () => {
        UserService.checkValidCode(id, code).then(res => {
            if (res.data?.success) {
                setIsValidCode(false)
            }
        })
    }

    const handleSetNewPassword = () => {
        UserService.setNewPassword(id, code, newData).then(res => {
            if (res.data?.success) {
                navigator("/signin")
            }
        })
    }

    useEffect(() => {
        handleCheckValidCode()
    }, [])

    // Change Password
    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape({
            newPassword: Yup.string().required("New password is required"),
            confirmNewPasswrod: Yup.string().required("Confirm new password is required").oneOf([Yup.ref('newPassword'), null], 'Password not match'),
        }),
        onSubmit: (val, { resetForm }) => {
            handleSetNewPassword()
        }
    });

    return (
        <section className="bg-bg-primary">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow sm:max-w-md  sm:p-8">
                    <div className="m-auto">
                        <div className='flex justify-center'>
                            <img src={key} width={80} height={80} alt="" />
                        </div>
                        <h2 className="mb-1 text-xl font-sp-pro-text-semibold leading-tight text-primary text-center pt-4">
                            Set New Password
                        </h2>
                        <p className="text-center text-sm text-text-color font-sp-pro-text-regular pt-1">
                            Your password must be at least 8 characters, numbers, letters and special characters &#40;!$@%&#41;
                        </p>

                        <form className="space-y-5 pt-5" onSubmit={formik.handleSubmit}>
                            <div className='text-left relative'>
                                <label className="block mb-2 ml-1 text-sm">New password</label>
                                <input
                                    type='password'
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.newPassword}
                                    name="newPassword"
                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2 px-4 mb-1 outline-none focus:border-primary"
                                    placeholder='********'
                                />
                                {formik.touched.newPassword && formik.errors?.newPassword ? <p className="text-reject font-sp-pro-text-regular text-sm mt-2 pl-1">{formik.errors.newPassword}</p> : null}
                            </div>
                            <div className='text-left relative'>
                                <label className="block mb-2 ml-1 text-sm">Confirm new password</label>
                                <input
                                    type='password'
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.confirmNewPasswrod}
                                    name="confirmNewPasswrod"
                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg block w-full py-2 px-4 mb-1 outline-none focus:border-primary"
                                    placeholder='********'
                                />
                                {formik.touched.confirmNewPasswrod && formik.errors?.confirmNewPasswrod ? <p className="text-reject font-sp-pro-text-regular text-sm mt-2 pl-1">{formik.errors.confirmNewPasswrod}</p> : null}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="hover:bg-pending-hover w-full rounded-lg bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="mt-2 mb-0 pt-1 text-sm text-text-color flex justify-between">
                                {/* <span>Remember the password?</span>
                                <a className="ml-1 text-primary font-sp-pro-text-semibold">
                                    <Link to={"/signin"}>Sign in</Link>
                                </a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResetPasswordComponent;