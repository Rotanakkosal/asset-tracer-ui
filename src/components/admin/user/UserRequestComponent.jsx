import React, { useEffect, useRef, useState } from "react";
import { BiCheck, BiDotsHorizontalRounded } from "react-icons/bi";
import UserSortByComponent from "./UserSortByComponent";
import { RxCheck } from "react-icons/rx";


import UserService from "../../../redux/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setRequestUsers, setUserReject, setUserapprove } from "../../../redux/slices/UserSlice";
import FileUploadService from "../../../redux/services/FileUploadService";
import { isRejected } from "@reduxjs/toolkit";
import no_data_pic from "../../../assets/images/empty_box.png";
import { Slide, ToastContainer, toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import LoadingBar from "react-top-loading-bar";

const sort = [
  {
    id: "",
    name: "Default",
  },
  {
    id: "asc",
    name: "A -> Z",
  },
  {
    id: "desc",
    name: "Z -> A",
  },
];

export default function UserRequestComponent() {
  const ref = useRef(null);
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const dispatch = useDispatch();
  const requestUsers = useSelector((state) => state.user.requestUsers);
  const [isApprove, setIsApprove] = useState(false)
  const [isReject, setIsReject] = useState(false)
  const [search, setSearch] = useState();

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  const handleGetAllRequestUsers = (search = "", sort = "") => {
    if (ref.current) {
      ref.current.staticStart()
    }
    if (sort == "Default") {
      sort = ""
    }

    UserService.getAllRequestUsers(search, sort).then((res) => {
      if (res.data?.success) {
        dispatch(setRequestUsers(res.data.payload));
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete()
          }
        }, 500);
      }
    }, err => {
      dispatch(setRequestUsers([]));
      setTimeout(() => {
        if (ref.current) {
          ref.current.complete()
        }
      }, 500);
    });
  };

  const handleApproveUserReq = (user) => {
    setIsApprove(false)
    UserService.approveUserRequests(organization.id, user.id).then((res) => {
      if (res.data.success) {
        setIsApprove(true)
        toast.success("Approved", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })
  }

  const handleRejectUserReq = (user) => {
    setIsReject(false)
    UserService.rejectUserRequest(user.id, organization.id).then((res) => {
      if (res.data.success) {
        setIsReject(true)
        toast.error("Rejected", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })
  }

  useEffect(() => {
    handleGetAllRequestUsers();
  }, [isApprove, isReject]);

  useEffect(() => {
    handleGetAllRequestUsers();
  }, []);

  useEffect(() => {
    if (selectedSort != null || search != null) {
      handleGetAllRequestUsers(search, selectedSort);
    }
    else {
      handleGetAllRequestUsers();
    }
  }, [selectedSort, search]);

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />
      <main className="p-6 con-Shadow px-4 lg:px-3 py-6 bg-white rounded-2xl relative">
        <div className="gap-6 overflow-hidden z-10 ">
          <div className="xl:flex xl:flex-row md:flex-col sm:flex-col justify-between gap-5 p-5">
            {/* header */}
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0">
              <h2 className="text-2xl font-sp-pro-text-semibold">
                All <span className="text-pending">Requested User</span>{" "}
                Management
              </h2>
              <p className="font-sp-pro-text-regular text-sm text-green">
                Requested User
              </p>
            </div>
            {/* search */}
            <div className="md:flex md:flex-row justify-start gap-6 ">
              <div className="mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                <div className="relative text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20 bg-[#F9FBFF]  border rounded-lg block w-full py-2 px-1 mb-1  focus:border-primary">
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
                  <input
                    className="w-full pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                    type="text"
                    name="search"
                    onInput={handleInputSearch}
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* filter */}
              <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                <Listbox
                  as="div"
                  value={selectedSort}
                  onChange={handleSelectedSort}
                >
                  {({ open }) => (
                    <>
                      <div className="relative z-30">
                        <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                          <Listbox.Button className="w-full border-[#E1E9EE] border rounded-lg bg-[#F9FBFF] py-2 pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary">
                            {selectedSort ? (
                              <span
                                className={`block truncate text-sm w-full md:w-36 lg:w-full xl:w-36 text-left text-text-color ${selectedSort == "Default"
                                  ? "text-black text-opacity-20"
                                  : ""
                                  }`}
                              >
                                <span className="text-black text-opacity-20">
                                  Sort by Name:{" "}
                                </span>
                                {selectedSort == "Default"
                                  ? ""
                                  : selectedSort == "asc"
                                    ? "A -> Z"
                                    : "Z -> A"}
                              </span>
                            ) : (
                              <span className="block w-full md:w-32 lg:w-full xl:w-32 text-left truncate text-sm text-black text-opacity-20">
                                Sort by Name:{" "}
                              </span>
                            )}

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
                            {sort.length == 0 ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                Nothing found.
                              </div>
                            ) : (
                              sort.map((val, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={val.id}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""
                                    }`
                                  }
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                                          } ${index == 0
                                            ? "text-black text-opacity-20"
                                            : ""
                                          }`}
                                      >
                                        {val.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? "text-primary" : "text-primary"
                                            } absolute inset-y-0 left-0 flex items-center pl-2`}
                                        ></span>
                                      ) : null}
                                    </>
                                  )}
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
            </div>
          </div>
          <div className="space-y-8 sm:px-3 px-10">
            {requestUsers.length != 0 ? (
              requestUsers.map((list, firstIndex) => (
                <div key={firstIndex} className="overflow-x-auto px-10 mb-10">
                  <div
                    className="rounded-xl border border-bg-main shadow my-5"
                    style={{
                      boxShadow: " rgba(0, 0, 0, 0.1)  0px 2.45px 11.28px",
                    }}
                  >
                    <div className="rounded-md p-5 flex-col">
                      {/* ======= Logo and name =========== */}
                      {list.logo ? (
                        <div className="flex flex-row items-center space-x-5 mx-5">
                          <img
                            src={FileUploadService.getImage(list.logo)}
                            className="rounded-full w-14   "
                          />
                          <h1 className="mb-2 text-text-color font-sp-pro-text-bold text-xl">
                            {list.name}
                          </h1>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center space-x-5 mx-5">
                          <h1 className="mb-2 font-sp-pro-text-bold text-xl bg-red-300 bg-opacity-30 w-12 h-12 rounded-full flex justify-center items-center text-red-500">
                            {list.name.substring(0, 2)}
                          </h1>
                          <h1 className="mb-2 text-text-color font-sp-pro-text-bold text-xl">
                            {list.name}
                          </h1>
                        </div>
                      )}

                      <div className="overflow-x-auto">
                        <div className=" xl:px-11 sm:px-5 2xl:px-10 3xl:px-32 overflow-y-scroll">
                          <div className="overflow-x-auto">
                            <div className="p-1 overflow-y-scroll items-start">
                              <table className="table border-spacing-y-3 border-separate w-[1020px]">
                                <tbody>
                                  {list?.users &&
                                    list.users.map((user, secondIndex) => (
                                      <tr key={secondIndex} className="font-md text-text-color border-none">
                                        <td
                                          className="bg-bg-main text-center rounded-s-[5px]"
                                          style={{ padding: "1.5rem" }}
                                        >
                                          {secondIndex + 1}
                                        </td>
                                        <td className="bg-bg-main w-1/6 items-start  ">
                                          <div className="flex items-center mr-20 space-x-3 ">
                                            {user?.image ? (
                                              <img
                                                src={FileUploadService.getImage(
                                                  user.image
                                                )}
                                                className="rounded-full h-10 "
                                              />
                                            ) : (
                                              <span className="w-10 font-sp-pro-text-semibold h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-sm">
                                                {user.name.substring(0, 1)}
                                              </span>
                                            )}
                                            <span className="font-sp-pro-text-medium text-sm text-text-color">
                                              {user.email}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="bg-bg-main w-1/12 items-start  ">
                                          {list?.logo ? (
                                            <div className="flex items-center mr-16 space-x-3 ">
                                              <img
                                                src={FileUploadService.getImage(
                                                  list.logo
                                                )}
                                                className="rounded-full w-10   "
                                              />
                                              <span className=" text-text-color font-sp-pro-text-bold text-md">
                                                {list.name}
                                              </span>
                                            </div>
                                          ) : (
                                            <div className="flex justify-center items-center gap-x-3">
                                              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-sp-pro-text-regular text-red-500 text-sm">
                                                {list.name.substring(0, 1)}
                                              </span>
                                              <span className=" text-text-color font-sp-pro-text-bold text-md">
                                                {list.name}
                                              </span>
                                            </div>
                                          )}
                                        </td>
                                        <td className="bg-bg-main rounded-e-[4px] ">
                                          <div className="flex justify-center space-x-5 items-center">
                                            <label onClick={() => handleRejectUserReq(user)} className="cursor-pointer w-8 h-8 rounded-md bg-white border border-border-strock text-reject flex items-center justify-center font-sp-pro-text-medium">
                                              X
                                            </label>

                                            <label onClick={() => handleApproveUserReq(user)} >
                                              {/* {user?.id != 0 ? (
                                              toast.success("success")
                                            ):(
                                              toast.error("Not success")
                                            )} */}

                                              <RxCheck className="cursor-pointer w-8 h-8 p-1 rounded-md bg-white border border-border-strock text-green" />
                                            </label>
                                          </div>

                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center w-full col-span-12 h-[calc(100vh-18.5rem)] flex justify-center items-center">
                  <div className="mt-[-6rem]">
                    <img src={no_data_pic} className="w-2/6 xl:w-3/6 m-auto pb-5" />
                    <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                      No Requested User
                    </h2>
                  </div>
                </div>
              </>
            )}
          </div>
          <ToastContainer transition={Slide} autoClose={1200} />
        </div>
      </main>
    </>
  );
}
