import React, { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import {
  BiDotsHorizontalRounded,
  BiHome,
  BiMessageSquareEdit,
} from "react-icons/bi";
import { HiOutlineCheck, HiOutlineCurrencyDollar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAllOrganization,
  setItem,
  setOrgDetail,
} from "../../../redux/slices/OrganizationSlice";
import jwt_decode from "jwt-decode";
import OrganizationService from "../../../redux/services/OrganizationService";
import { FiTrash2 } from "react-icons/fi";
import no_data_pic from "../../../assets/images/empty_box.png";
import "../../../style/shadow.css";
import "../../../style/dropdown.css";
import trash_ico from "../../../assets/images/trash.png";
import { Listbox, Tab } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
import FileUploadService from "../../../redux/services/FileUploadService";
import { Transition } from "@headlessui/react";
import {
  CalendarDaysIcon,
  ChevronUpDownIcon,
  HomeIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TbCalendarStats, TbListDetails } from "react-icons/tb";
import UpdateOrganizationComponent from "./popUp/UpdateOrganizationComponent";
import emoji from "../../../assets/images/emoji.svg";
import { Edit, Person, Person4, Update } from "@mui/icons-material";
import { Slide, ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import { AiOutlineShopping } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import placeholder_square from "../../../assets/images/placeholder/placeholder_square.jpg"
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

export default function OrganizationListComponent() {
  const organization = JSON.parse(sessionStorage.getItem("organization"))
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const [search, setSearch] = useState();
  const [orgId, setOrgId] = useState();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isWaitingApprove, setIsWaitingApprove] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const orgDetail = useSelector((state) => state.organization.orgDetail);

  const ref = useRef(null);

  useEffect(() => {
    getAllOrganizations();
    setIsUpdateSuccess(false);
  }, [isUpdateSuccess]);

  const handleIsUpdateSuccess = (val) => {
    setIsUpdateSuccess(val);
    toast.success(" Update Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organization.data);
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  var userId = decoded.id;

  const getAllOrganizations = () => {
    if (ref.current) {
      ref.current.staticStart()
    }

    OrganizationService.getAllOrganizations(userId).then(
      (res) => {
        if (res.data?.success) {
          dispatch(setAllOrganization(res.data.payload));
          setTimeout(() => {
            if (ref.current) {
              ref.current.complete()
            }
          }, 500);
        }
      },
      (err) => {
        dispatch(setAllOrganization([]));
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete()
          }
        }, 500);
      }
    );
  };

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowOrganization = (val) => {
    if (!val.isActive) {
      setIsWaitingApprove(true);
    } else {
      setIsWaitingApprove(false);
      dispatch(setItem(val));
      sessionStorage.setItem("organization", JSON.stringify(val));
      navigator("/dashboard", { state: { hideOrganizationBar: true } });
    }
  };

  const handleDetailOrg = (val) => {
    dispatch(setOrgDetail(val));
  };

  useState(() => {
    getAllOrganizations();
  }, []);

  useEffect(() => {
    if (selectedSort != null || search != null) {
      OrganizationService.getAllOrganizations(
        userId,
        search,
        selectedSort
      ).then(
        (res) => {
          if (res.data?.success) {
            dispatch(setAllOrganization(res.data.payload));
          }
        },
        (err) => {
          dispatch(setAllOrganization([]));
        }
      );
    }
  }, [selectedSort, search]);

  const handleDeleteOrganization = () => {
    OrganizationService.deleteOrganization(orgId).then((res) => {
      if (res.data.success) {
        if (res.data.payload == organization.id) {
          sessionStorage.removeItem("organization")
          localStorage.removeItem("profileImage")
          dispatch(setItem(null))
        }
        getAllOrganizations();
        document.getElementById("delete_org").click();

        toast.success(" Delete Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const handleSetOrgDetail = (val) => {
    dispatch(
      setOrgDetail({
        id: val.id,
        name: val.name,
        code: val.code,
        address: val.address,
        logo: val.logo,
      })
    );
  };

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />

      <main className="p-5 lg:px-3 con-Shadow bg-white rounded-xl min-h-[calc(100vh-9rem)]">
        <input type="checkbox" id="delete_org" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <div className="absolute right-4 top-3 hover:bg-bg-primary w-8 h-8 flex justify-center rounded-full items-center cursor-pointer">
              <label htmlFor="delete_org">
                <RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
              </label>
            </div>
            <div className="flex justify-start">
              <div>
                <img
                  src={trash_ico}
                  width={55}
                  height={55}
                  className="inline-block"
                />
              </div>
              <div className="pl-3 leading-none">
                <h3 className="font-sp-pro-text-bold text-xl">Delete</h3>
                <p className="pt-1 py-5">
                  Are you sure want to delete this organization?
                </p>
              </div>
            </div>
            <br />
            <div className="flex justify-end space-x-4">
              <label
                htmlFor="delete_org"
                className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-90 border border-[#D0D5DD] flex justify-center items-center gap-1"
              >
                Cancel
              </label>
              <button
                onClick={handleDeleteOrganization}
                type="button"
                className="bg-opacity-10 rounded-md cursor-pointer bg-reject border border-reject py-2 px-5 text-sm font-sp-pro-text-medium text-reject flex justify-center items-center gap-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <ToastContainer transition={Slide} autoClose={1200}></ToastContainer>
        {/* Update */}
        <UpdateOrganizationComponent
          className="modal"
          val={orgDetail}
          handleIsUpdateSuccess={handleIsUpdateSuccess}
        />

        <div className="xl:flex xl:flex-row md:flex-col sm:flex-col justify-between gap-5 p-5">
          {/* header */}
          <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0">
            <h2 className="text-2xl font-sp-pro-text-semibold">
              All <span className="text-pending">Organization</span> Management
            </h2>
          </div>

          {/* search */}
          <div className="md:flex md:flex-row justify-start gap-6 ">
            <div className="mb-4 md:mb-0 lg:mb-0 xl:mb-0">
              <div className="relative text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20   bg-[#F9FBFF]  border rounded-lg block w-full py-2 px-1 mb-1  focus:border-primary">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-10 lg:gap-14 gap-y-8 p-5 w-full">
          {organizations.length != 0 ? (
            organizations.map((list, index) => (
              <div
                key={index}
                className="relative con-Shadow-Card rounded-xl min-w-max w-52 cursor-pointer"
              >
                {list.status != "is_invited" && (
                  <>
                    {list.isActive && (list?.roleName == "ADMIN" || list?.roleName == "USER") && (
                      <div className="absolute top-3 right-3 cursor-pointer">
                        <Listbox as="div">
                          {({ open }) => (
                            <>
                              <div className="relative">
                                <span className="">
                                  <Listbox.Button className="hover:bg-bg-primary focus:bg-bg-primary w-7 h-7 rounded-full flex justify-center cursor-pointer items-center text-gray   ">
                                    <span>
                                      <BiDotsHorizontalRounded className="w-6 h-6" />
                                    </span>
                                  </Listbox.Button>
                                </span>
                                <Transition
                                  show={open}
                                  leave=""
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options
                                    static
                                    className="border border-bg-primary mt-2  bg-white shadow-md rounded-md absolute right-0 z-50 w-40 p-2"
                                  >
                                    <Listbox.Option>
                                      <label
                                        onClick={() => handleDetailOrg(list)}
                                        htmlFor="show-org-detail"
                                        className={`cursor-pointer text-text-color hover:bg-bg-primary inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                      >
                                        <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                          <TbListDetails /> Show Detail
                                        </span>
                                      </label>
                                      {list?.roleName == "ADMIN" && (
                                        <>
                                          <label
                                            onClick={() =>
                                              handleSetOrgDetail(list)
                                            }
                                            htmlFor="update-organization"
                                            className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                          >
                                            <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                              <BiMessageSquareEdit /> Edit
                                            </span>
                                          </label>
                                          <label
                                            onClick={() => setOrgId(list.id)}
                                            htmlFor="delete_org"
                                            className={`cursor-pointer text-reject hover:bg-reject hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full  text-gray-900 rounded-md `}
                                          >
                                            <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                              <FiTrash2 /> Delete
                                            </span>
                                          </label>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                    )}
                    <label
                      className="px-6 cursor-pointer"
                      onClick={() => handleShowOrganization(list)}
                    >
                      <HiOutlineCheck className="w-4 h-4 bg-green text-white rounded-full ml-5 cursor-pointer" />

                      {list.logo != "" && list.logo != null ? (
                        <>
                          <div className="font-bold text-xl mx-auto text-center w-full mt-4 mb-2 cursor-pointer">
                            <img
                              src={FileUploadService.getImage(list.logo)}
                              className="w-12 h-12  rounded-full flex justify-center items-center m-auto"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-xl mx-auto text-center w-full mt-4 mb-2 cursor-pointer">
                            <div className="w-12 h-12 bg-green rounded-full flex justify-center items-center m-auto">
                              <p className="font-sp-pro-text-bold text-2xl lg:text-2xl text-white">
                                {list.name.substring(0, 1)}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      <p className="font-sp-pro-text-semibold text-md w-full text-center text-text-color capitalize cursor-pointer">
                        {list.name}
                      </p>
                      <p className="text-gray-700 text-xs text-center opacity-60 cursor-pointer">
                        {list?.roleName == "ADMIN" ? "Owner" : "Member"}
                      </p>
                      <p className="text-gray-700 text-xs mt-4 text-center text-text-color cursor-pointer h-4">
                        {list.roleName == "ADMIN"
                          ? list.totalUser <= 1
                            ? list.totalUser + " Member"
                            : list.totalUser + " Members"
                          : null}
                      </p>
                      <div className="w-full flex flex-row justify-center my-1 mb-5 cursor-pointer ">
                        <div className="w-full flex justify-center h-5 cursor-pointer">
                          {list.roleName == "ADMIN"
                            ? list.users.map((user, index) => (
                              <span key={index}>
                                {user.image != null ? (
                                  <div className={`relative w-7 h-7 z-10 rounded-full ${index > 0 ? "ml-[-10px] border-2 border-white" : ""}`}>
                                    <img
                                      src={FileUploadService.getImage(
                                        user.image
                                      )}
                                      loading="lazy"
                                      className="rounded-full h-full w-full"
                                    />
                                  </div>
                                ) : (
                                  <div className={`relative  w-7 h-7 z-10 bg-green rounded-full flex justify-center items-center text-white shadow-sm ${index > 0 ? "ml-[-10px] border-2 border-white" : ""}`}>
                                    {user.name.substring(0, 1)}
                                  </div>
                                )}
                              </span>
                            ))
                            : null}
                        </div>
                      </div>
                      <div className="w-full px-8 text-center cursor-pointer">
                        <span
                          className={`inline-block w-full rounded-md py-2 px-3 text-xs font-semibold  bg-opacity-10 ${list?.isActive
                            ? "text-green bg-green"
                            : "text-reject bg-reject"
                            }`}
                        >
                          {list?.isActive ? "Joined" : "Pending"}
                        </span>
                      </div>
                    </label>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center w-full col-span-12 h-[calc(100vh-18.5rem)] flex justify-center items-center">
              <div className="mt-[-6rem]">
                <img src={no_data_pic} className="w-2/6 xl:w-3/6 m-auto pb-5" />
                <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                  No Data
                </h2>
              </div>
            </div>
          )}
        </div>

        {isWaitingApprove && (
          <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular bg-none right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white rounded-xl p-16  z-10 border border-bg-primary shadow-xl">
              <div className="flex flex-col justify-end">
                <div className="relative w-40 m-auto pb-7">
                  <img src={emoji} className="w-14 m-auto" />
                </div>
                <p
                  className={`text-2xl text-center font-sp-pro-text-semibold text-primary`}
                >
                  Waiting For Approve
                </p>
                <p className="text-sm font-sp-pro-text-regular text-center text-text-color mt-3">
                  You cannot join organization until admin approve
                </p>
                <button
                  onClick={() => setIsWaitingApprove(false)}
                  className={`bg-primary text-white  mt-8 py-2 px-4 bg-bl rounded-2xl`}
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <input type="checkbox" id="show-org-detail" className="modal-toggle" />
        <div className="modal">
          <div className="bg-white rounded-lg p-6 modal-box max-w-6xl" >
            <div className="flex justify-between mx-6 ">
              <div className="flex">
                <HomeIcon className="h-8 w-8 text-white bg-primary p-1 rounded-lg" />
                <p className="px-6 text-text-color text-xl font-sp-pro-text-bold">Organization Detail</p>
              </div>
              <div className="">
                <label htmlFor="show-org-detail" ><XMarkIcon className="cursor-pointer h-9 w-9 text-text-color hover:bg-text-color hover:bg-opacity-20 rounded-full p-1 " /></label>
              </div>
            </div>
            <div className="flex">
              <div className="xl:w-5/12 md:w-6/12">
                <div style={{ boxShadow: "0 1px 40px 0 rgb(0 0 0 / 0.06)" }} className="w-full justify-center lg:mx-6 lg:mt-6 lg:pb-2 rounded-xl">

                  {orgDetail.logo != null && orgDetail.logo != "" ?
                    <img
                      className="object-cover w-full h-full rounded-3xl p-7"

                      src={FileUploadService.getImage(orgDetail.logo)}
                      alt=""
                      loading="lazy"
                    />
                    :
                    <img
                      className="object-cover w-full h-full rounded-3xl p-7"

                      src={placeholder_square}
                      alt=""
                      loading="lazy"
                    />
                  }
                </div>
              </div>
              <div className="xl:w-7/12 md:ml-10 md:w-1/2 rounded-lg">
                <div style={{ boxShadow: "0 1px 40px 0 rgb(0 0 0 / 0.06)" }} className="xl:flex lg:flex-row rounded-lg justify-center w-full py-5 lg:mt-6">
                  <div className="w-full flex sm:w-1/2 ">
                    <div className="pl-14">
                      <div className="">
                        <div className="pt-5">
                          <label htmlFor="" className="font-sp-pro-text-semibold text-[15px]">Oranization Name</label>
                          <div className=" mt-2 flex ">
                            {orgDetail.logo != null && orgDetail.logo != "" ?
                              <span className="rounded-full w-10 h-10 flex justify-center items-center overflow-hidden border-2 border-white shadow-md">
                                <img src={FileUploadService.getImage(orgDetail.logo)} className="h-full" />
                              </span>
                              :
                              <span className="font-sp-pro-text-medium p-2 text-[16] rounded-full bg-emerald-200 text-emerald-500 w-10 h-10 flex justify-center items-center">
                                {orgDetail.name.substring(0, 2)}
                              </span>
                            }
                            <p className="font-sp-pro-text-medium text-[13.05px] text-text-color p-2">
                              {orgDetail.name}
                            </p>
                          </div>
                        </div>
                        <div className="pt-5 ">
                          <label htmlFor="" className="font-sp-pro-text-semibold text-[15px]">Members</label>
                          <div className=" mt-2 flex ">
                            <div className="w-full flex justify-start">
                              {orgDetail.roleName == "ADMIN"
                                ? orgDetail.users.map((user, index) => (
                                  <span key={index}>
                                    {user.image != null ? (
                                      <div className={`relative w-9 h-9 z-10 ${index > 0 ? "ml-[-10px]" : ""}`}>
                                        <img
                                          src={FileUploadService.getImage(
                                            user.image
                                          )}
                                          loading="lazy"
                                          className="rounded-full h-full w-full"
                                        />
                                      </div>
                                    ) : (
                                      <div className={`relative  w-9 h-9 z-10 bg-green rounded-full flex justify-center items-center text-white shadow-sm ${index > 0 ? "ml-[-10px]" : ""}`}>
                                        {user.name.substring(0, 1)}
                                      </div>
                                    )}
                                  </span>
                                ))
                                : null}
                            </div>
                          </div>
                        </div>
                        <div className="pt-5">
                          <label htmlFor="" className="font-sp-pro-text-semibold text-[15px]">Code</label>
                          <div className=" mt-2 flex ">
                            <label className="flex font-sp-pro-text-medium text-[14px] justify-center text-[#FA7436] bg-[#FA7436] bg-opacity-10 w-[118px] p-3 rounded-xl border-blue-200">
                              {orgDetail.code}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex xl:border-l-2 sm:w-1/2 border-opacity-30 border-text-color pl-14">
                    <div className="">
                      <div className="pt-5">
                        <label htmlFor="" className="font-sp-pro-text-semibold text-[15px]">Created Date</label>
                        <div className=" mt-2 flex ">
                          <span className="font-sp-pro-text-medium p-2 text-[16] rounded-full bg-emerald-200 text-emerald-500"><CalendarDaysIcon className="h-6 w-6 text-gray-500" /></span>
                          <p className="font-sp-pro-text-medium text-[13.05px] text-text-color p-2">
                            {moment(orgDetail.createdAt).format("DD MMM YYYY")}
                          </p>
                        </div>
                      </div>
                      <div className="pt-5">
                        <label htmlFor="" className="font-sp-pro-text-semibold text-[15px]">Role</label>
                        <div className=" mt-2 flex ">
                          <span className="font-sp-pro-text-medium p-2 text-[16] rounded-full bg-amber-200"><UserCircleIcon className="h-6 w-6 text-white" /></span>
                          <p className="font-sp-pro-text-medium text-[13.05px] text-text-color p-2">
                            {orgDetail.roleName == "ADMIN" ? "Owner" : "Member"}
                          </p>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-[16px] mx-2 mt-2 text-text-color font-sp-pro-text-regular">Address</h1>
                  <p style={{ boxShadow: "0 1px 40px 0 rgb(0 0 0 / 0.06)" }} className="xl:flex lg:flex-row rounded-lg w-full p-4 h-24 mt-1">
                    {orgDetail.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
