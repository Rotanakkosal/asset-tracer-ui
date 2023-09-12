import React, { useEffect } from 'react'
import { HomeModernIcon } from '@heroicons/react/20/solid';
import upload_placeholder from '../../../../assets/images/placeholder/upload_placeholder.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { RiCloseFill } from 'react-icons/ri';
import { FiSave } from 'react-icons/fi';
import FileUploadService from '../../../../redux/services/FileUploadService';
import RoomService from '../../../../redux/services/RoomService';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../../../../redux/slices/RoomSlice';
import placeholder from "../../../../assets/images/placeholder/placeholder-image.png"
import ReactLoading from 'react-loading';

export default function RoomUpdateComponent({ handleIsUpdateSuccess }) {
    const organization = JSON.parse(sessionStorage.getItem("organization"))
    const orgId = organization.id
    const dispatch = useDispatch()
    const room = useSelector(state => state.room.room)

    // Upload file
    let formData = new FormData()
    const [selectedFile, setSelectedFile] = useState()
    const [image, setImage] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [newData, setNewData] = useState({
        name: "",
        type: "",
        floor: "",
        description: "",
        image: "",
        organizationId: orgId
    })

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    };

    const handleUpdateRoom = () => {
        setIsLoading(true)
        if (selectedFile) {
            formData.append("file", selectedFile)
            FileUploadService.storeFile(formData, localStorage.getItem("token")).then(res => {
                if (res.data.success) {
                    RoomService.updateRoom(room.id, {
                        ...newData,
                        image: res.data.payload
                    }).then(res => {
                        if (res.data.success) {
                            setTimeout(() => {
                                handleIsUpdateSuccess(true)
                                setIsLoading(false)
                                document.getElementById("edit-room").click()
                            }, 500)
                            setSelectedFile("")
                            setNewData({
                                name: "",
                                type: "",
                                floor: "",
                                description: "",
                                image: "",
                                organizationId: orgId
                            })
                        }
                    })
                }
            })
        } else {
            RoomService.updateRoom(room.id, newData).then(res => {
                if (res.data.success) {
                    if (res.data.success) {
                        setTimeout(() => {
                            handleIsUpdateSuccess(true)
                            setIsLoading(false)
                            document.getElementById("edit-room").click()
                        }, 500)
                        setSelectedFile("")
                        setNewData({
                            name: "",
                            type: "",
                            floor: "",
                            description: "",
                            image: "",
                            organizationId: orgId
                        })
                    }
                }
            })
        }
    }

    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Room name is required"),
        }),
        onSubmit: (val, { resetForm }) => {
            handleUpdateRoom()
            resetForm(val = {
                name: "",
                type: "",
                floor: "",
                description: "",
                image: "",
                organizationId: orgId
            })
        }
    });

    useEffect(() => {
        setNewData(room)
        formik.setValues(room)
        if (room.image) {
            setImage(room.image)
        }
    }, [room])

    const handleHideModal = () => {
        setImage("")
        setSelectedFile("")
        dispatch(setRoom({}))
        setNewData({
            name: "",
            type: "",
            floor: "",
            description: "",
            image: "",
            organizationId: orgId
        })
    }

    return (
        <div>
            <input type="checkbox" id="edit-room" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-5xl relative">
                    <div className='absolute top-4 right-4'>
                        <label htmlFor="edit-room" onClick={handleHideModal}><RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" /></label>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <HomeModernIcon className="h-9 rounded-lg w-9 text-white bg-primary p-2" />
                            <p className='flex items-center font-sp-pro-text-bold text-xl pl-5 text-text-color'>Room Information</p>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>

                        <div className='flex flex-wrap md:flex-row mt-5 justify-center'>
                            <div className="px-6">
                                <div className='space-y-5 shadow p-5 rounded-md mb-1 relative'>
                                    <div className='border border-dashed py-2 border-primary block justify-center text-center rounded-lg'>
                                        <div className='w-64 p-5 min-h-[13.8rem] flex relative'>
                                            {
                                                selectedFile ? <img src={URL.createObjectURL(selectedFile)} className='h-full m-auto' />
                                                    : image ? <img src={FileUploadService.getImage(image)} className='h-full m-auto' />
                                                        : <img className="block m-auto" src={placeholder} />
                                            }
                                        </div>
                                        <p className='mt-5 text-xs'>Upload Room Picture</p>
                                        <br />
                                        <label htmlFor='room-image' className='cursor-pointer shadow-md rounded-md border border-bg-primary px-5 py-2 my-2 '>Browse</label>
                                        <input type="file" className='hidden' id='room-image' onChange={handleFileSelect} />
                                        <br /><br />
                                    </div>
                                </div>
                            </div>
                            <div className='flex-grow'>
                                <div className="px-6">
                                    <div className='space-y-3 shadow px-10 py-8 rounded-md'>
                                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row">
                                            <div className='text-left w-full'>
                                                <label className="block mb-2 ml-1 text-sm">Room Name <span className='text-reject'>*</span></label>
                                                <input
                                                    type='text'
                                                    onInput={handleInputChange}
                                                    onChange={formik.handleChange}
                                                    value={newData.name}
                                                    name="name"
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                    placeholder='Enter room name'
                                                />
                                                {formik.touched.name && formik.errors?.name ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.name}</p> : null}
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row">
                                            <div className='text-left w-full'>
                                                <label className="block mb-2 ml-1 text-sm">Room Type</label>
                                                <input
                                                    type='text'
                                                    onInput={handleInputChange}
                                                    onChange={formik.handleChange}
                                                    value={newData.type}
                                                    name="type"
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                    placeholder='Enter room type'
                                                />
                                            </div>
                                            <div className='text-left w-full'>
                                                <label className="block mb-2 ml-1 text-sm">Floor</label>
                                                <input
                                                    type='text'
                                                    onInput={handleInputChange}
                                                    onChange={formik.handleChange}
                                                    value={newData.floor}
                                                    name="floor"
                                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                                    placeholder='Enter floor'
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                                            <div className='text-left w-full'>
                                                <label className="block mb-2 ml-1 text-sm">Description</label>
                                                <textarea onInput={handleInputChange} name="description" value={newData.description} rows="5" className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none" placeholder="Enter description"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='opacity-0 my-4' />
                        <div className='w-full flex justify-end gap-3'>

                            {isLoading ? <>
                                <label
                                    className="rounded-md opacity-50 bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                                >
                                    <RiCloseFill className='text-lg' />
                                    Cancel
                                </label>
                                <button
                                    type="button"
                                    className="hover:bg-opacity-90 bg-accept rounded-md cursor-pointer  py-2 px-5 text-sm font-sp-pro-text-medium text-white flex justify-center items-center gap-1"
                                >
                                    <ReactLoading type="spin" color="#FFFFFF" width={19} height={19} /> <span className="ml-2">Saving</span>
                                </button>
                            </> : <>
                                <label
                                    onClick={handleHideModal}
                                    htmlFor='edit-room'
                                    className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                                >
                                    <RiCloseFill className='text-lg' />
                                    Cancel
                                </label>
                                <button
                                    type="submit"
                                    className="hover:bg-opacity-90 bg-accept rounded-md cursor-pointer  py-2 px-5 text-sm font-sp-pro-text-medium text-white flex justify-center items-center gap-1"
                                >
                                    <FiSave className='text-lg' />
                                    Save changes
                                </button>
                            </>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
