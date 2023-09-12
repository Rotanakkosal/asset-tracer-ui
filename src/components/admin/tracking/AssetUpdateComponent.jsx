import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiCloseFill } from 'react-icons/ri';
import ReactLoading from "react-loading";
import { FiSave } from "react-icons/fi";
import gift from "../../../assets/icon/gift.svg";
import { Combobox, Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import RoomService from '../../../redux/services/RoomService';
import AssetService from '../../../redux/services/AssetService';
import { useDispatch, useSelector } from 'react-redux';

const status = [
    { id: "in_stock", name: "In Stock" },
    { id: "in_used", name: "In Used" },
    { id: "damage", name: "Damage" },
    { id: "donated", name: "Donated" },
    { id: "lost", name: "Lost" },
    { id: "broken", name: "Broken" },
]

export default function AssetUpdateComponent({handleIsUpdateSuccess}) {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState()
    const organization = JSON.parse(sessionStorage.getItem("organization"))
    const orgId = organization.id
    const [selectedRoom, setSelectedRoom] = useState()
    const [rooms, setRooms] = useState([])
    let asset = useSelector(state => state.asset.asset)
    const dispatch = useDispatch()

    const [newData, setNewData] = useState({
        id: "",
        labelCode: "",
        serialCode: "",
        owner: "",
        status: "",
        roomId: "",
        description: "",
        organizationId: orgId,
    })

    useEffect(() => {
        RoomService.getAllRoomByOrgId(orgId).then(res => {
            if (res.data.success) {
                setRooms(res.data.payload)
            }
        })
        setNewData({ ...asset })
        setSelectedStatus(asset?.status)
        setSelectedRoom({ id: asset?.roomId, name: asset?.roomName })
        formik.setValues({ ...asset })
    }, [asset])

    const handleSelectedRoom = (val) => {
        setSelectedRoom(val)
        setNewData({ ...newData, roomId: val.id })
    }

    const handleSelectedStatus = (val) => {
        formik.setValues({ ...newData, status: val })
        setSelectedStatus(val)
        setNewData({ ...newData, status: val })
    }

    const [queryRoom, setQueryRoom] = useState("");
    const filteredRoom =
        queryRoom === ""
            ? rooms
            : rooms.filter((list) =>
                list.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(queryRoom.toLowerCase().replace(/\s+/g, ""))
            );

    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    const handleUpdateImportedAsset = () => {
        setIsLoading(true)
        AssetService.updateImportedAsset(newData?.id, newData).then(res => {
            if (res.data.success) {
                setTimeout(() => {
                    document.getElementById("update-asset").click();
                    setIsLoading(false)
                    handleIsUpdateSuccess(true)
                }, 500)
            }
        }, err => {
            setTimeout(() => {
                document.getElementById("update-asset").click();
                setIsLoading(false)
                handleIsUpdateSuccess(false)
            }, 500)
        })
    }

    const formik = useFormik({
        initialValues: newData,
        validationSchema: Yup.object().shape({
            status: Yup.string().required("Status is required"),
            labelCode: Yup.string().required("Label code is required")
        }),
        onSubmit: (val, { resetForm }) => {
            handleUpdateImportedAsset()
        },
    });

    const handleHideModal = () => {
        setNewData({
            id: "",
            labelCode: "",
            serialCode: "",
            owner: "",
            status: "",
            roomId: "",
            description: "",
            organizationId: orgId,
        })
    }


    return (
        <div>
            <input type="checkbox" id="update-asset" className="modal-toggle" />
            <div className=" modal">
                <div className=" modal-box relative rounded-lg max-w-3xl">
                    <div className="absolute top-7 right-7">
                        <label
                            htmlFor="update-asset"
                            id="add-super-category"
                            onClick={handleHideModal}
                        >
                            <RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <img src={gift} className="h-12 rounded-lg w-12 " />
                            <p className="mt-2 items-center font-sp-pro-text-semibold text-lg pl-3 text-text-color">
                                Update Imported Asset
                            </p>
                        </div>
                    </div>
                    <br />
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3'>
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Select Status <span className='text-reject'>*</span></label>
                                <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                                    <Listbox as="div" value={selectedStatus} onChange={handleSelectedStatus}>
                                        {({ open }) => (
                                            <>
                                                <div className="relative z-30">
                                                    <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                                                        <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue relative border border-slate-200 bg-bg-main rounded-md text-gray-800">
                                                            {selectedStatus ? <span className="block truncate text-sm text-text-color">
                                                                {selectedStatus == "in_stock" ? "In Stock" : selectedStatus == "in_used" ? "In Used" : selectedStatus == "damage" ? "Damage" : selectedStatus == "donated" ? "Donated" : selectedStatus == "broken" ? "Broken" : selectedStatus == "lost" ? "Lost" : ""}
                                                            </span> : <span className="block truncate text-sm text-black text-opacity-20">Select status</span>}

                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ChevronUpDownIcon
                                                                    className="h-5 w-5 text-text-color"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Listbox.Button>
                                                    </div>
                                                    <Transition
                                                        show={open}
                                                        leave=""
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            static
                                                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                        >
                                                            {status.length == 0 ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                                                    Nothing found.
                                                                </div>
                                                            ) : (
                                                                status.map((val, index) => (
                                                                    <Listbox.Option key={index} value={val.id}
                                                                        className={({ active }) =>
                                                                            `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""}`
                                                                        }
                                                                    >
                                                                        {val.name}
                                                                    </Listbox.Option>
                                                                ))
                                                            )}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                                {formik.touched.status && formik.errors?.status ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.status}</p> : null}
                            </div>
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Select Room</label>
                                <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                                    <Combobox
                                        value={selectedRoom}
                                        onChange={handleSelectedRoom}
                                        className="z-20"
                                    >
                                        <div className="relative z-20">
                                            <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                                                <Combobox.Input
                                                    className="w-full border-[#E1E9EE] placeholder-black placeholder-opacity-20 border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                                                    displayValue={(val) => val.name}
                                                    onChange={(e) => setQueryRoom(e.target.value)}
                                                    placeholder='Select room'
                                                />
                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                        className="h-5 w-5 text-text-color"
                                                        aria-hidden="true"
                                                    />
                                                </Combobox.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                                afterLeave={() => setQueryRoom("")}
                                            >
                                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {filteredRoom.length == 0 && queryRoom !== "" ? (
                                                        <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                                            Nothing found.
                                                        </div>
                                                    ) : (
                                                        filteredRoom.map((val, index) => (
                                                            <Combobox.Option
                                                                key={index}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""}`
                                                                }
                                                                value={val}
                                                            >
                                                                {val.name}
                                                            </Combobox.Option>
                                                        ))
                                                    )}
                                                </Combobox.Options>
                                            </Transition>
                                        </div>
                                    </Combobox>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Label Code <span className='text-reject'>*</span></label>
                                <input
                                    type='text'
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.labelCode}
                                    name="labelCode"
                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                    placeholder='Enter label code'
                                />
                            </div>
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Serial Code</label>
                                <input
                                    type='text'
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.serialCode}
                                    name="serialCode"
                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                    placeholder='Enter serial code'
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Owner</label>
                                <input
                                    type='text'
                                    onInput={handleInputChange}
                                    onChange={formik.handleChange}
                                    value={newData.owner}
                                    name="owner"
                                    className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                                    placeholder='Enter owner'
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                            <div className='text-left w-full'>
                                <label className="block mb-2 ml-1 text-sm">Description</label>
                                <textarea name="description" value={newData.description} onInput={handleInputChange} rows="4" className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none" placeholder="Enter description"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end flex-row space-x-4 mt-10">
                            <div className="flex gap-4">
                                {isLoading ? (
                                    <>
                                        <label className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1">
                                            <RiCloseFill className="text-lg" />
                                            Cancel
                                        </label>
                                        <button
                                            type="button"
                                            className={`hover:bg-accept bg-accept hover:bg-opacity-90 rounded-md cursor-pointer py-2 px-5 text-sm font-sp-pro-text-medium text-white hover:opacity-90 w-full flex items-center`}
                                        >
                                            <ReactLoading
                                                type="spin"
                                                color="#FFFFFF"
                                                width={19}
                                                height={19}
                                            />{" "}
                                            <span className="ml-2">Updating</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <label
                                            htmlFor="update-asset"
                                            className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                                        >
                                            <RiCloseFill className="text-lg" />
                                            Cancel
                                        </label>
                                        <button
                                            type="submit"
                                            className={`hover:bg-accept bg-accept hover:bg-opacity-90 rounded-md cursor-pointer py-2 px-5 text-sm font-sp-pro-text-medium text-white hover:opacity-90 w-full flex items-center`}
                                        >
                                            <FiSave className="text-lg" /> &nbsp; Save changes
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
