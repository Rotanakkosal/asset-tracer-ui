import React, { useEffect, useState } from 'react'
import UserService from '../../../../redux/services/UserService';
import { setSearchUsers } from '../../../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, ToastContainer, toast } from "react-toastify";
import FileUploadService from '../../../../redux/services/FileUploadService';
import { PulseLoader } from 'react-spinners';

export default function InviteUserComponent() {

    let getSearchUsers = useSelector(state => state.user.searchUsers)
    const dispatch = useDispatch()
    const [searchInvite, setSearchInvite] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    let org = useSelector(state => state.user.org)

    // ============ get search user to invite =============== 
    const handleGetAllSearchUsers = () => {
        setIsLoading(true)
        if (searchInvite != null || searchInvite != "") {
            UserService.searchUser(searchInvite).then((res) => {
                if (res.data.success) {
                    setTimeout(() => {
                        dispatch(setSearchUsers(res.data.payload))
                        setIsLoading(false)
                    }, 1000)
                }
            }, err => {
                setTimeout(() => {
                    dispatch(setSearchUsers([]))
                    setIsLoading(false)
                }, 1000)
            });
        }
    };

    // ============ Invite User to Organization ===============
    const inviteUserToOrganization = (userId) => {
        UserService.inviteUser({
            userId: userId,
            organizationId: org.id,
        }).then(
            (res) => {
                if (res.data?.success) {
                    toast.success(" Invite Successfully !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            },
            (err) => {
                toast.error("User was invited !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        );
    };

    const handleInputSearchUser = (e) => {
        setSearchInvite(e.target.value);
    };

    const handleClearData = () => {
        setSearchInvite("")
        dispatch(setSearchUsers([]))
    }

    return (
        <div>
            <input type="checkbox" id="invite-user" className="modal-toggle" />
            <div className="modal duration-300">
                <div className="bg-bg-primary overflow-hidden sm:h-[29rem] sm:w-[30rem] lg:h-[35rem] lg:w-[35rem] 2xl:h-[35rem] 2xl:w-[36] lt-16:w-4/12 h-[35rem] rounded-[20px] relative p-4">
                    <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                            <div className="flex items-center my-2">
                                <div className="rounded-full p-3 ml-3">
                                    <div className="w-[60px] h-[60px] con-pro-color rounded-full flex justify-center items-center">
                                        <p className="font-sp-pro-text-bold uppercase text-2xl text-green ">
                                            {org.name.substring(0, 2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-text-color font-sp-pro-text-bold text-xl">
                                        {org.name}
                                    </span>
                                    <span className="text-sm text-text-color font-sp-pro-text-regular">
                                        Manage invitations and requests to join your team.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <label
                                htmlFor="invite-user"
                                onClick={handleClearData}
                                className="btn border-bg-primary-strock bg-white text-red-500 hover:bg-white hover:border-red-400 btn-sm btn-circle absolute right-7 top-6"
                            >
                                ✕
                            </label>
                        </div>
                    </div>

                    <div className="px-6">
                        <div className="w-full">
                            <div className="relative w-full border rounded-[4px] border-slate-200 bg-bg-main p-[5px]">
                                <div className="absolute inset-y-0 flex items-center pl-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="flex">
                                    <input
                                        onInput={handleInputSearchUser}
                                        className=" w-full h-9 pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none"
                                        type="text"
                                        name="search"
                                        value={searchInvite}
                                        placeholder="Search member by email"
                                    />
                                    <button
                                        onClick={handleGetAllSearchUsers}
                                        className="px-4 py-1 text-white bg-primary rounded-md focus:outline-none focus:border-none"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* featch data invite user */}
                    </div>
                    <div className="relative overflow-y-auto p-4 px-6 ">
                        <div className="overflow-y-auto rounded-lg scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-bg-primary-strock scrollbar-track-bg-primary sm:h-[15rem] lg:h-[20rem] h-[20rem] relative max-w-xl  mx-auto divide-border-strock bg-bg-main ring-1 ring-black/5 flex flex-col divide-y highlight-white/5 ">
                            {isLoading ?
                                <div className="flex justify-center py-5">
                                    <PulseLoader color="#F8C400" size={10} />
                                </div>
                                : <>
                                    {getSearchUsers.length != 0 && getSearchUsers.map((users, index) => (
                                        <div key={index} className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-4 p-4 ">
                                                {users.image != null ? (
                                                    <>
                                                        <div className="font-bold text-lg w-full cursor-pointer">
                                                            <img
                                                                src={FileUploadService.getImage(users.image)}
                                                                className="w-12 h-12  rounded-full flex justify-center items-center m-auto"
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="font-bold text-xl w-full cursor-pointer">
                                                            <div className="w-12 h-12 bg-red-200 rounded-full flex justify-center items-center m-auto uppercase">
                                                                <p className="font-sp-pro-text-bold text-2xl lg:text-2xl text-red-600">
                                                                    {users.name.substring(0, 1)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="flex flex-col">
                                                    <strong className="text-text-color text-sm font-sp-pro-text-regular ">
                                                        {users.name}
                                                    </strong>
                                                    <span className="text-slate-500 text-xs font-sp-pro-text-regular ">
                                                        {users.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center mr-4">
                                                <button
                                                    onClick={() =>
                                                        inviteUserToOrganization(users.id)
                                                    }
                                                    className="w-20 h-8 bg-blue-500 rounded-[3px] text-white text-md "
                                                >
                                                    <p>Invite</p>
                                                </button>
                                                <ToastContainer transition={Slide} autoClose={1200} />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
