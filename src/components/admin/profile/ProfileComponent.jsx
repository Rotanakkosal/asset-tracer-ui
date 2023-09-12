import React, { Fragment, useEffect } from 'react'
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import moment from "moment";
import * as Yup from "yup"
import jwt_decode from "jwt-decode";
import UserService from '../../../redux/services/UserService';
import successIcon from '../../../assets/images/success.png'
import verifyIcon from '../../../assets/images/false.png'
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setOrgId, setOrganizationByOwner, setProfileDetail, setProfileImage } from '../../../redux/slices/UserSlice';
import coconut_trees from '../../../assets/images/profile/coconut_trees.svg'
import plans from '../../../assets/images/profile/plans.svg'
import user_placeholder from '../../../assets/images/profile/profile_2.svg'
import { RiCloseFill } from 'react-icons/ri';
import avatar01 from "../../../assets/images/organization/avatar01.png";
import avatar02 from "../../../assets/images/organization/avatar02.png";
import avatar03 from "../../../assets/images/organization/avatar03.png";
import avatar04 from "../../../assets/images/organization/avatar04.png";
import { FiPlus } from 'react-icons/fi';
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import FileUploadService from '../../../redux/services/FileUploadService';
import no_data_pic from "../../../assets/images/empty_box.png";
import InviteUserComponent from './modal/InviteUserComponent';
import { setItem } from '../../../redux/slices/OrganizationSlice';
import { useNavigate } from 'react-router-dom';

export default function ProfileComponent() {

    var profileImageToken = localStorage.getItem("profileImage")
    const [isShowLoading, setIsShowLoading] = useState(false)
    const dispatch = useDispatch()
    const profileDetail = useSelector(state => state.user.profileDetail)
    const [isShowSuccess, setIsShowSuccess] = useState(false)
    const [isShowErr, setIsShowErr] = useState(false)
    const [isSuccessUpdateProfile, setIsSuccessUpdateProfile] = useState(false)
    const [isShowFormUpdateProfile, setIsShowFormUpdateProfile] = useState(false)
    const [fileName, setFileName] = useState()
    const [file, setFile] = useState()
    const token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    var userId = decoded.id;
    var profileImageToken = localStorage.getItem("profileImage")
    const navigator = useNavigate()
    const [newData, setNewData] = useState({
        oldPassword: "", newPassword: "", confirmNewPassword: ""
    })

    let getAllOrganizatonByOwner = useSelector(state => state.user.organizationByOwner)

    // Change Password
    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required("Current password is required"),
            newPassword: Yup.string().min(6, 'Password must be at least 6 characters long').required('New password is Required'),
            confirmNewPassword: Yup.string().required("Confirm new password is required").oneOf([Yup.ref('newPassword'), null], 'Password not match'),
        }),
        onSubmit: (val, { resetForm }) => {
            resetForm(val = { oldPassword: "", newPassword: "", confirmNewPasswrod: "" })
            setNewData({ oldPassword: "", newPassword: "", confirmNewPassword: "" })
            handleChangePassword()
        }
    });

    const handleChangePassword = () => {
        UserService.changeUserPassword(userId, newData).then(res => {
            if (res.data?.success) {
                setIsShowSuccess(true)
                setIsShowErr(false)
            }
        }, err => {
            if (err?.response?.data.status == 400) {
                setIsShowSuccess(false)
                setIsShowErr(true)
            }
        })
    }

    const handleGetAllOrganizationByOwner = () => {
        UserService.getAllOrganizationByOwner().then(res => {
            if (res.data.success) {
                dispatch(setOrganizationByOwner(res.data.payload))
            }
        }, err => {
            dispatch(setOrganizationByOwner([]))
        })
    }

    // Get profile detail
    const handleGetProfileDetail = () => {
        UserService.getProfileUser(userId).then(res => {
            if (res.data?.success) {
                dispatch(setProfileDetail(res.data.payload))
                if (res.data.payload?.image) {
                    setFile(FileUploadService.getImage(res.data.payload.image))
                }
            }
        })
    }

    useEffect(() => {
        handleGetProfileDetail()
        handleGetAllOrganizationByOwner()
    }, [])

    let formData = new FormData()

    // Upload file
    const [selectedFile, setSelectedFile] = useState('')

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    };

    // Update Profile
    const [profile, setProfile] = useState({
        name: "", gender: "", phone: "", address: "", image: ""
    })

    const handleInputChangeProfile = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    };

    const handleUpdateProfile = () => {
        if (selectedFile) {
            formData.append("file", selectedFile)
            FileUploadService.storeFile(formData, localStorage.getItem("token")).then(res => {
                UserService.updateProfile(userId, {
                    name: profile.name,
                    gender: profile.gender,
                    phone: profile.phone,
                    address: profile.address,
                    image: res.data.payload
                }).then(res => {
                    if (res.data?.success) {
                        if (res.data.payload?.image) {
                            setFile(FileUploadService.getImage(res.data.payload.image))
                            dispatch(setProfileImage(FileUploadService.getImage(res.data.payload.image)))
                            localStorage.setItem("profileImage", FileUploadService.getImage(res.data.payload.image))
                        }

                        document.getElementById("modal-profile").click()
                        setTimeout(() => {
                            handleGetProfileDetail()
                        }, 800)

                        setTimeout(() => {
                            setIsSuccessUpdateProfile(true)
                        }, 1000)
                    }
                })
            })
        } else {
            UserService.updateProfile(userId, profile).then(res => {
                if (res.data?.success) {
                    setIsSuccessUpdateProfile(true)
                    handleGetProfileDetail()
                    document.getElementById("modal-profile").click()
                }
            })
        }
    }

    const formikProfile = useFormik({
        initialValues: profile,
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            gender: Yup.string().required("Gender is required"),
        }),
        onSubmit: (val, { resetForm }) => {
            handleUpdateProfile()
            setIsShowFormUpdateProfile(false)
        }
    })

    const handleShowProfile = () => {
        UserService.getProfileUser(userId).then(res => {
            if (res.data.success) {
                setProfile(res.data.payload)
            }
        })
    }

    useEffect(() => {
        formikProfile.setValues(profile);
    }, [profile])

    const handleShowOrg = (val) => {
        dispatch(setOrgId(val))
    }

    const handleGetIntoOrganization = (val) => {
        dispatch(setItem(val));
        sessionStorage.setItem("organization", JSON.stringify(val));
        navigator("/dashboard", { state: { hideOrganizationBar: true } });
    };

    return (
        <>
            <main className="overflow-y-auto pb-4 text-text-color">
                <h2 className="text-2xl text-gray-700 dark:text-gray-200 font-sp-pro-text-semibold">
                    Account Settings
                </h2>
                <Tab.Group>
                    <div className="mt-5 gap-6 bg-white rounded-xl overflow-hidden" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 10px" }}>
                        <div className="overflow-x-auto px-5 shadow-sm relative">
                            <label
                                onClick={handleShowProfile}
                                id='profile-troggle'
                                htmlFor="update-profile"
                                className="absolute flex-row right-5 top-5 bg-bg-primary w-9 h-9 rounded-full flex justify-center cursor-pointer items-center hover:bg-bg-primary-strock focus:bg-bg-primary-strock focus:text-white text-gray hover:text-white"
                            >
                                <FaUserEdit />
                            </label>

                            <input type="checkbox" id="update-profile" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box max-w-2xl rounded-lg">
                                    <div className='absolute right-4 top-3 hover:bg-bg-primary w-8 h-8 flex justify-center rounded-full items-center cursor-pointer'>
                                        <label
                                            id="modal-profile"
                                            htmlFor="update-profile"
                                        ><RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" /></label>
                                    </div>
                                    <div>
                                        <h3 className='text-center font-sp-pro-text-bold text-lg my-3 mb-5'>My Profile</h3>
                                        <div className='w-28 h-28 border border-bg-primary-strock rounded-full m-auto relative overflow-hidden'>
                                            {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className='w-full rounded-full' /> : file ? <img src={file} className='w-full rounded-full' /> : <img src={user_placeholder} className='w-full rounded-full' />}
                                            <label htmlFor='updateProfile' type='file' className='w-full absolute bg-black bg-opacity-30 shadow-sm bottom-0 py-1.5 text-xs cursor-pointer text-white text-center'>Upload</label>
                                            <input type="file"
                                                id='updateProfile'
                                                name="file"
                                                accept="image/*"
                                                className='hidden'
                                                onChange={handleFileSelect} />
                                        </div>
                                    </div>
                                    <div>
                                        <form className='space-y-5 pt-5' onSubmit={formikProfile.handleSubmit}>
                                            <div className='flex md:flex-row gap-6'>
                                                <div className='text-left w-full md:w-1/2'>
                                                    <label className="block mb-2 ml-1 text-sm">Name</label>
                                                    <input
                                                        type='text'
                                                        onInput={handleInputChangeProfile}
                                                        onChange={formikProfile.handleChange}
                                                        value={profile.name}
                                                        name="name"
                                                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                        placeholder='Enter name'
                                                    />
                                                    {formikProfile.touched.name && formikProfile.errors?.name ? <p className="text-reject text-xs mt-2 pl-1">{formikProfile.errors.name}</p> : null}
                                                </div>
                                                <div className="text-left  w-full md:w-1/2">
                                                    <label className="block mb-2 ml-1 text-sm">Gender</label>
                                                    <select
                                                        onInput={handleInputChangeProfile}
                                                        onChange={formikProfile.handleChange}
                                                        value={profile.gender}
                                                        name="gender"
                                                        placeholder='Gender'
                                                        className={`text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary w-full border rounded-lg block py-2 px-4 mb-1 outline-none ${profile.gender == "" ? "text-gray" : ""}`}
                                                    >
                                                        <option value="" disabled>Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                    {formikProfile.touched.gender && formikProfile.errors?.gender ? <p className="text-reject font-sp-pro-text-regular text-xs mt-2 pl-1">{formikProfile.errors.gender}</p> : null}
                                                </div>
                                            </div>
                                            <div className='text-left  w-full '>
                                                <label className="block mb-2 ml-1 text-sm">Phone Number</label>
                                                <input
                                                    type='number'
                                                    onInput={handleInputChangeProfile}
                                                    onChange={formikProfile.handleChange}
                                                    value={profile.phone}
                                                    name="phone"
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                    placeholder='Enter phone number'
                                                />
                                                {formikProfile.touched.phone && formikProfile.errors?.phone ? <p className="text-reject text-xs mt-2 pl-1">{formikProfile.errors.phone}</p> : null}
                                            </div>

                                            <div className='text-left'>
                                                <label className="block mb-2 ml-1 text-sm">Address</label>
                                                <textarea
                                                    onInput={handleInputChangeProfile}
                                                    onChange={formikProfile.handleChange}
                                                    value={profile.address}
                                                    rows={4}
                                                    name="address"
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary border w-full  rounded-lg block py-2 px-4 mb-1 outline-none"
                                                    placeholder='Enter address'
                                                >
                                                </textarea>
                                            </div>
                                            <div className='w-1/3 m-auto'>
                                                <button type='submit' className="inline-block w-full rounded text-center bg-primary pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white cursor-pointer hover:bg-pending-hover">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {isSuccessUpdateProfile ? <>
                                <div className={`${isSuccessUpdateProfile ? "modal rounded-sm modal-open" : ""} bg-opacity-0`}>
                                    <div className="modal-box max-w-md">
                                        <div className="flex justify-center"> <img src={successIcon} width={80} alt="" /></div>
                                        <h2 className="mb-1 text-xl font-sp-pro-text-semibold leading-tight text-primary text-center mt-5">Profile Updated!</h2>
                                        <p className="mt-3 text-sm text-text-color text-center">Your profile has been updated successfully</p>
                                        <br />
                                        <div className="modal-action">
                                            <button onClick={() => setIsSuccessUpdateProfile(false)} htmlFor="my-modal" className="inline-block w-full rounded text-center bg-primary px-7 py-2 text-sm font-sp-pro-text-medium text-white cursor-pointer">OK</button>
                                        </div>
                                    </div>
                                </div>
                            </> : null}

                            <div className='px-5 py-4'>
                                <div className='flex flex-row gap-10 md:gap-5 justify-center w-full flex-wrap sm:flex-nowrap'>
                                    <div>
                                        <div className='w-32 h-32 md:w-24 md:h-24 rounded-full overflow-hidden relative'>
                                            <img src={file != null ? file : profileImageToken != null ? profileImageToken : user_placeholder} alt="" className="w-full" />
                                        </div>
                                    </div>
                                    <div className='flex flex-row justify-start w-full'>
                                        <div className='leading-7 w-full md:w-1/2'>
                                            {profileDetail?.name != null &&
                                                <div className='flex'>
                                                    <p className='w-32'>Name</p>
                                                    <p className='break-all w-full font-sp-pro-text-bold capitalize'>: {profileDetail?.name != "" && profileDetail?.name != null ? profileDetail?.name : <> <span className='opacity-50'>(Update Your Name)</span></>}</p>
                                                </div>
                                            }

                                            <div className='flex'>
                                                <p className='w-32'>Email</p>
                                                <p className='break-all w-full text-blue-700'>: {profileDetail?.email}</p>
                                            </div>

                                            {profileDetail?.gender != null &&
                                                <div className='flex'>
                                                    <p className='w-32'>Gender</p>
                                                    <p className='break-all w-full capitalize'>: {profileDetail?.gender != "" && profileDetail?.gender != null ? profileDetail?.gender : <> <span>(Update Your Gender)</span></>}</p>
                                                </div>
                                            }

                                            <div className='flex'>
                                                <p className='w-32'>Created Date</p>
                                                <p className='break-all w-full'>: {moment(profileDetail?.createdAt).format("DD MMMM YYYY")}</p>
                                            </div>

                                            <span className='md:hidden block'>

                                                {profileDetail?.phone != null &&
                                                    <div className='flex'>
                                                        <p className='w-32'>Phone</p>
                                                        <p className='break-all w-full'>: {profileDetail?.phone != "" && profileDetail?.phone != null ? profileDetail?.phone : <> <span className='opacity-50'>(Update Your Phone)</span></>}</p>
                                                    </div>
                                                }

                                                {profileDetail?.address != null &&
                                                    <div className='flex'>
                                                        <p className='w-32'>Address</p>
                                                        <p className='break-all w-full'>: {profileDetail?.address != "" && profileDetail?.address != null ? profileDetail?.address : <> <span className='opacity-50'>(Update Your Address)</span></>}</p>
                                                    </div>
                                                }

                                            </span>
                                        </div>
                                        <div className='leading-7 pl-10 border-l-2 border-dashed w-1/2 border-gray-light md:block hidden'>
                                            <div className='flex'>
                                                <p className='w-24'>Phone</p>
                                                <p className='break-all w-1/2'>: {profileDetail?.phone != "" && profileDetail?.phone != null ? profileDetail?.phone : <> <span className='opacity-50'>(Update Your Phone)</span></>}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='w-24'>Address</p>
                                                <p className='break-all w-1/2'>: {profileDetail?.address != "" && profileDetail?.address != null ? profileDetail?.address : <> <span className='opacity-50'>(Update Your Address)</span></>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tab.List className="flex space-x-1 text-text-color">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={`px-4 py-3 rounded-sm outline-none border-b-4 border-white ${selected ? "bg-custom-yellow-showdow-light border-b-primary" : ""}`}>
                                        Your Organizations
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={`px-4 py-3 rounded-sm outline-none border-b-4 border-white ${selected ? "bg-custom-yellow-showdow-light border-b-primary" : ""}`}>
                                        Change Password
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                    </div>

                    {/* =========== Organization ============== */}
                    <div className='my-5 p-5 relative gap-6 bg-white rounded-xl' style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 10px" }}>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className='w-full'>
                                    {getAllOrganizatonByOwner.length != 0 ?
                                        <div className="flex overflow-x-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-10 gap-y-8 p-5 px-10 w-full scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-bg-primary-strock scrollbar-track-bg-primary">
                                            {getAllOrganizatonByOwner.map((list, index) => (
                                                <div key={index} className='relative con-Shadow-Card rounded-xl w-64 cursor-pointer '>
                                                    <label onClick={() => handleShowOrg(list)} htmlFor='invite-user' className='absolute right-2 top-3 cursor-pointer'>
                                                        <PlusCircleIcon className="w-8 h-8 hover:w-9 hover:h-9 transition-all duration-200 text-green rounded-full" />
                                                    </label>
                                                    <label onClick={() => handleGetIntoOrganization(list)} className=' con-Shadow-Card rounded-xl w-64 cursor-pointer '>
                                                        <div className='flex flex-row justify-start items-center p-3 w-60 gap-x-2'>
                                                            {list.logo ?
                                                                <span className='w-10 h-10 rounded-full overflow-hidden'>
                                                                    <img src={FileUploadService.getImage(list.logo)} className='w-full h-full' />
                                                                </span>
                                                                :
                                                                <span className='w-10 h-10 bg-green text-green bg-opacity-20 rounded-full flex justify-center items-center'>
                                                                    <p className='font-sp-pro-text-bold text-xl'>{list.name.substring(0, 1)}</p>
                                                                </span>
                                                            }

                                                            <p className='font-sp-pro-text-bold text-lg text-text-color capitalize cursor-pointer'>{list.name}</p>


                                                        </div>
                                                        <div className='px-5 mt-3 font-sp-pro-text-semibold text-sm'>
                                                            Date of create :
                                                            <div className='font-sp-pro-text-light'>
                                                                <small>{moment(list.createdAt).format("MMM DD YYYY")}</small>
                                                            </div>
                                                        </div>

                                                        <div className='px-5 mt-3 font-sp-pro-text-semibold text-sm'>
                                                            Organization Owner :
                                                            <div className="relative w-full my-1">
                                                                <div className='flex justify-start items-center gap-x-1'>
                                                                    <div>
                                                                        {list.userImage ?
                                                                            <img
                                                                                src={FileUploadService.getImage(list.userImage)}
                                                                                loading="lazy"
                                                                                className="rounded-full w-6 h-6"
                                                                            />
                                                                            :

                                                                            < img
                                                                                src={user_placeholder}
                                                                                loading="lazy"
                                                                                className="rounded-full w-6 h-6"
                                                                            />
                                                                        }

                                                                    </div>
                                                                    <small className='font-sp-pro-text-regular'>{list.userName}</small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='px-5 mt-3 font-sp-pro-text-semibold'>
                                                            Member : <span className='text-blue-500'>{list.totalUser}</span>

                                                            <div className='w-full flex justify-start my-1'>
                                                                {list?.users.map((user, i) => (
                                                                    <div>
                                                                        {
                                                                            user.image ?
                                                                                <div className="relative w-6 h-6 mr-[-10px] z-10">
                                                                                    <img
                                                                                        src={FileUploadService.getImage(user.image)}
                                                                                        loading="lazy"
                                                                                        className="rounded-full h-full w-full"
                                                                                    />
                                                                                </div>
                                                                                :
                                                                                <div className="relative w-6 h-6 mr-[-10px] z-10">
                                                                                    <img
                                                                                        src={user_placeholder}
                                                                                        loading="lazy"
                                                                                        className="rounded-full h-full w-full"
                                                                                    />
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                ))}
                                                                {list.totalUser - list.users.length > 3 ?
                                                                    <div className="relative  w-6 h-6 mr-[-10px] z-50 border-2 text-xs font-sp-pro-text-semibold bg-white  border-bg-primary rounded-full flex items-center justify-center">
                                                                        {list.totalUser - list.users.length} <FiPlus />
                                                                    </div>
                                                                    : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="px-6">
                                                                <div className="w-full px-8 text-center cursor-pointer">
                                                                    <span className="inline-block w-full rounded-md py-2 px-3 text-xs font-semibold text-white bg-primary">Joined</span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div className="text-center w-full col-span-12 h-[calc(100vh-18.5rem)] flex justify-center items-center">
                                            <div className="mt-[-6rem]">
                                                <img src={no_data_pic} className="w-2/6 xl:w-3/6 m-auto pb-5" />
                                                <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                                                    No Super Category
                                                </h2>
                                            </div>
                                        </div>
                                    }
                                    <InviteUserComponent className="modal" />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='w-full md:w-6/12 lg:w-4/12 m-auto'>
                                    <h2 className='text-center text-2xl font-sp-pro-text-bold my-5 pt-5'>Change Password</h2>
                                    {/* <p className='mb-5'>Your password must be at least 6 characters</p> */}
                                    <form onSubmit={formik.handleSubmit} className='space-y-5 py-8 rounded-lg'>
                                        <div className='text-left  w-full '>
                                            <label className="block mb-2 ml-1 text-sm">Current Password</label>
                                            <input
                                                type='password'
                                                onInput={handleInputChange}
                                                onChange={formik.handleChange}
                                                value={newData.oldPassword}
                                                name="oldPassword"
                                                className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                placeholder="********"
                                            />
                                            {formik.touched.oldPassword && formik.errors?.oldPassword ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.oldPassword}</p> : null}
                                        </div>
                                        <div className='text-left  w-full '>
                                            <label className="block mb-2 ml-1 text-sm">New Password</label>
                                            <input
                                                type='password'
                                                onInput={handleInputChange}
                                                onChange={formik.handleChange}
                                                value={newData.newPassword}
                                                name="newPassword"
                                                className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                placeholder="********"
                                            />
                                            {formik.touched.newPassword && formik.errors?.newPassword ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.newPassword}</p> : null}
                                        </div>
                                        <div className='text-left  w-full '>
                                            <label className="block mb-2 ml-1 text-sm">Confirm New Password</label>
                                            <input
                                                type='password'
                                                onInput={handleInputChange}
                                                onChange={formik.handleChange}
                                                value={newData.confirmNewPassword}
                                                name="confirmNewPassword"
                                                className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  focus:border-primary     w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                placeholder="********"
                                            />
                                            {formik.touched.confirmNewPassword && formik.errors?.confirmNewPassword ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.confirmNewPassword}</p> : null}
                                        </div>
                                        <div className="text-left mb-4 mt-2 py-3">
                                            <button type='submit' className='w-full bg-primary text-white rounded-md py-2'>Save changes</button>
                                        </div>
                                    </form>

                                    <div className='absolute top-8 left-8 w-36'>
                                        <img src={plans} />
                                    </div>
                                    <div className='absolute bottom-8 right-8 w-36'>
                                        <img src={coconut_trees} />
                                    </div>
                                    <div className='absolute top-14 rounded-full right-14 w-32 h-32 bg-primary bg-opacity-20'>
                                    </div>
                                    <div className='absolute bottom-14 rounded-full left-14 w-32 h-32 bg-primary bg-opacity-20'>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </div>
                </Tab.Group>

                {isShowSuccess ? <>
                    <div className={`${isShowSuccess ? "modal rounded-sm modal-open" : ""} bg-opacity-0`}>
                        <div className="modal-box">
                            <div className="flex justify-center"> <img src={successIcon} width={80} alt="" /></div>
                            <h2 className="mb-1 text-xl font-sp-pro-text-semibold leading-tight text-primary sm:text-2xl text-center pt-[25px]">Password Changed!</h2>
                            <p className="mt-3 text-sm text-gray-500 text-center">Your password has been updated successfully</p>
                            <div className="modal-action mt-[70px]">
                                <button onClick={() => setIsShowSuccess(false)} htmlFor="my-modal" className="inline-block w-full rounded text-center bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white cursor-pointer">OK</button>
                            </div>
                        </div>
                    </div>
                </> : null}

                {isShowErr ? <>
                    <div className={`${isShowErr ? "modal rounded-sm modal-open" : ""}`}>
                        <div className="modal-box">
                            <div className="flex justify-center"> <img src={verifyIcon} width={80} alt="" /></div>
                            <h2 className="mb-1 text-xl font-sp-pro-text-semibold leading-tight text-primary sm:text-2xl text-center pt-[25px]">Unable To Update Password!</h2>
                            <p className="mt-3 text-sm text-gray-500 text-center">Your old password is incorrect. Please check again!</p>
                            <div className="modal-action mt-[70px]">
                                <button onClick={() => setIsShowErr(false)} htmlFor="my-modal" className="inline-block w-full rounded text-center bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white cursor-pointer">OK</button>
                            </div>
                        </div>
                    </div>
                </> : null}
            </main>
        </>
    )
}
