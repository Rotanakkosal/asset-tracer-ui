import React, { useState } from "react";
import { RiNotification3Line, RiArrowDownSLine } from "react-icons/ri";
import {
  Menu,
  MenuItem,
  MenuButton,
  FocusableItem,
  MenuGroup
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import '@szhsin/react-menu/dist/index.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/A_Tracer_logo1.png";
import "../../style/navbar.css";
import SignOutComponent from "./popUp/SignOutComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrganizationService from "../../redux/services/OrganizationService";
import {
  setAllOrganization,
  setItem,
} from "../../redux/slices/OrganizationSlice";
import jwt_decode from "jwt-decode";
import FileUploadService from "../../redux/services/FileUploadService";
import placeholder from "../../assets/images/placeholder/placeholder.png";
import LoadingComponent from "../../components/LoadingComponent";
import emoji from '../../assets/images/emoji.svg'
import NewLoadingComponent from "../NewLoadingComponent";
import NotificationService from "../../redux/services/NotificationService";
import { setNotificationByUser } from "../../redux/slices/NotificationSlice";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {

  const [overflow, setOverflow] = useState('auto');
  const [position, setPosition] = useState('auto');
  const [filter, setFilter] = useState('');

  const [isShowLoading, setIsShowLoading] = useState(false);
  const item = useSelector((state) => state.organization.item);
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const organizations = useSelector((state) => state.organization.data);
  const [path, setPath] = useState()
  let pathName = document.location.pathname
  const getAllNotificationByUser = useSelector(state => state.notification.notificationByUser)
  const [countNotification, setCountNotification] = useState(0)

  useEffect(() => {
    if (pathName.includes("invoice")) {
      setPath("Invoice")
    } else if (pathName.includes("organization")) {
      setPath("Organization")
    } else if (pathName.includes("dashboard")) {
      setPath("Dashboard")
    } else if (pathName.includes("super-category")) {
      setPath("Super Category")
    } else if (pathName.includes("normal-category")) {
      setPath("Normal Category")
    } else if (pathName.includes("invoice")) {
      setPath("Invoice")
    } else if (pathName.includes("room")) {
      setPath("Room")
    } else if (pathName.includes("tracking")) {
      setPath("Tracking")
    } else if (pathName.includes("user-request")) {
      setPath("User Request")
    } else if (pathName.includes("user")) {
      setPath("All User")
    } else if (pathName.includes("notification")) {
      setPath("Notification")
    } else if (pathName.includes("profile")) {
      setPath("Profile")
    } else if (pathName.includes("asset-add")) {
      setPath("Create Asset")
    } else if (pathName.includes("asset-set")) {
      setPath("Import Asset")
    } else if (pathName.includes("asset")) {
      setPath("All Asset")
    }
  }, [pathName])

  let session = sessionStorage.getItem("organization");
  if (session) {
    session = JSON.parse(session);
  }

  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  var userId = decoded.id;

  const getAllOrganizations = () => {
    OrganizationService.getAllOrganizations(userId).then(
      (res) => {
        if (res.data?.success) {
          dispatch(setAllOrganization(res.data.payload));
        }
      },
      (err) => {
        dispatch(setAllOrganization([]));
      }
    );
  };

  const handleGetAllNotificationByUser = () => {
    NotificationService.getAllNotificationByUser().then(res => {
      if (res.data.success) {
        dispatch(setNotificationByUser(res.data.payload))
        setCountNotification(res.data.payload.length)
      }
    }, err => {
      dispatch(setNotificationByUser([]))
      setCountNotification(0)
    })
  }

  useEffect(() => {
    getAllOrganizations();
    handleGetAllNotificationByUser()
  }, []);

  const [isWaitingApprove, setIsWaitingApprove] = useState(false)

  const handleShowOrganization = (val) => {
    if (!val.isActive) {
      setIsWaitingApprove(true)
      dispatch(setItem(null));
      sessionStorage.removeItem("organization")
    } else {
      setIsWaitingApprove(false)
      setIsShowLoading(true);
      dispatch(setItem(val));
      sessionStorage.setItem("organization", JSON.stringify(val));
      setTimeout(() => {
        navigator("/dashboard", { state: { hideOrganizationBar: true } });
        setIsShowLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {

    const interval = setInterval(() => {
      handleGetAllNotificationByUser()
    }, 8000);

    return () => clearInterval(interval);

  }, []);

  return (
    <>
      {isWaitingApprove &&
        <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular bg-none right-0 bottom-0 flex items-center justify-center">
          <div className="bg-white rounded-xl p-16  z-10 border border-bg-primary shadow-xl" >
            <div className="flex flex-col justify-end">
              <div className="relative w-40 m-auto pb-7">
                <img src={emoji} className="w-14 m-auto" />
              </div>
              <p className={`text-2xl text-center font-sp-pro-text-semibold text-primary`}>
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
      }

      {isShowLoading && <NewLoadingComponent />}
      <header
        className="flex-shrink-0 bg-white px-8 h-[4.3rem] flex flex-row items-center justify-between text-text-color"
        style={{
          zIndex: "100",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 5px",
        }}
      >
        <div className="flex items-center w-[16rem] lg:flex-shrink-0 invisible lg:visible">
          <img src={logo} alt="" className="w-16 h-16" />
          <h1 className="text-center text-xl font-sp-pro-text-bold">
            Asset Tracer
          </h1>
        </div>

        <div className="flex items-center w-full justify-between">
          <div className="font-sp-pro-text-bold text-xl invisible lg:visible flex items-center rounded-md pl-12">
            <h1>{path}</h1>
          </div>
          <nav className="flex items-center gap-2 ">
            <Menu
              menuButton={
                <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors">
                  <RiNotification3Line className="text-primary " />
                  <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content rounded-full text-[8px] font-bold">
                    {countNotification != 0 ? countNotification : "0"}
                  </span>
                </MenuButton>
              }
              align="end"
              arrow
              transition
              arrowClassName="bg-secondary-100"
              menuClassName="bg-secondary-100 rounded-lg shadow-lg"
            >
              <div className="flex justify-between px-3">
                <h1 className="flex  items-center ">
                  <span className="text-lg text-text-color font-sp-pro-text-bold">
                    Notification
                  </span>{" "}
                  {/* <span className="text-sm ml-3 text-blue-500">{countNotification != 0 ? "(" + countNotification + ")" : "0"}</span> */}
                </h1>
              </div>

              <hr className="my-2 border-text-color border-opacity-20" />

              {getAllNotificationByUser.length != 0 ? getAllNotificationByUser.map((list, index) => (
                <div key={index}>
                  {
                    list.status == "is_invited" ?
                      <MenuItem className={`py-3 px-3 my-3 bg-opacity-30 mx-3 rounded-lg w-96 bg-blue-100`}>
                        <div className="w-full">

                          <NavLink
                            to="/organization-create"
                            className="text-gray-300 flex items-center py-1 px-2 transition-colors rounded-md"
                          >
                            <span className="text-xs text-green absolute right-2 top-2">{list.createdAt ? moment(list.createdAt).format("DD MMM YYYY, h:mm A") : moment(list.updatedAt).format("DD MMM YYYY, h:mm A")}</span>
                            <div className="flex justify-center items-center gap-2 mt-2">
                              <div>
                                {list.orgLogo ?
                                  <img
                                    src={FileUploadService.getImage(list.orgLogo)}
                                    className="w-10 h-10 object-cover rounded-full"
                                  />
                                  :
                                  <div className="w-10 h-10 object-cover rounded-full flex justify-center items-center text-xl bg-green text-white">
                                    {list.orgName.substring(0, 1)}
                                  </div>
                                }
                              </div>
                              <div className="text-sm flex flex-col">

                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-sp-pro-text-regular text-sm text-slate-800">
                                    You was {list.status == "is_invited" ? "Invited" : list.status == "is_rejected" ? "rejected" : ""} by <span className="font-sp-pro-text-semibold">{list.orgName}</span>
                                  </span>
                                </div>
                                <p className="text-slate-600 text-xs">
                                  {list.email}
                                </p>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      </MenuItem>
                      :
                      <div className={`py-3 px-3 my-3 bg-opacity-30 mx-3 rounded-lg w-96 bg-blue-100 relative`}>
                        <div className="w-full">
                          <div
                            className="text-gray-300 flex items-center py-1 px-2 transition-colors rounded-md"
                          >
                            <span className="text-xs text-green absolute right-2 top-2">{list.createdAt ? moment(list.createdAt).format("DD MMM YYYY, h:mm A") : moment(list.updatedAt).format("DD MMM YYYY, h:mm A")}</span>
                            <div className="flex justify-center items-center gap-2 mt-2">
                              <div>
                                {list.orgLogo ?
                                  <img
                                    src={FileUploadService.getImage(list.orgLogo)}
                                    className="w-10 h-10 object-cover rounded-full"
                                  />
                                  :
                                  <div className="w-10 h-10 object-cover rounded-full flex justify-center items-center text-xl bg-green text-white">
                                    {list.orgName.substring(0, 1)}
                                  </div>
                                }
                              </div>
                              <div className="text-sm flex flex-col">

                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-sp-pro-text-regular text-sm text-slate-800">
                                    You was {list.status == "is_invited" ? "Invited" : list.status == "is_rejected" ? "rejected" : list.status == "is_approved" ? "approved" : list.status == "is_requested" ? "requested" : ""} by <span className="font-sp-pro-text-semibold">{list.orgName}</span>
                                  </span>
                                </div>
                                <p className="text-slate-600 text-xs">
                                  {list.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  }
                </div>
              ))
                :
                <MenuItem className="py-3 my-2 hover:bg-bg-primary rounded-none w-96">
                  <div className="w-full text-center text-text-color">
                    No Notification
                  </div>
                </MenuItem>
              }

            </Menu>

            <Menu
              menuButton={
                <MenuButton className="flex font-sp-pro-text-medium items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
                  {organization ?
                    <>
                      {organization.logo ?
                        <>
                          <img
                            src={FileUploadService.getImage(organization.logo)}
                            className="w-9 h-9 object-cover rounded-full"
                          />
                        </>
                        :
                        <div className="w-9 h-9 bg-green rounded-full flex justify-center items-center m-auto">
                          <p className="font-sp-pro-text-bold text-2xl lg:text-2xl text-white">
                            {organization?.name.substring(0, 1)}
                          </p>
                        </div>
                      }
                    </>

                    :
                    item ?
                      <>
                        {item?.log ?
                          <img
                            src={FileUploadService.getImage(item.logo)}
                            className="w-9 h-9 object-cover rounded-full"
                          /> :

                          <div className="w-9 h-9 bg-green rounded-full flex justify-center items-center m-auto">
                            <p className="font-sp-pro-text-bold text-2xl lg:text-2xl text-white">
                              {item?.name.substring(0, 1)}
                            </p>
                          </div>
                        }
                      </>
                      : null
                  }

                  {organization ? (
                    <span className="header">{organization.name}</span>
                  ) : (
                    <span className="header">No Organization Selected</span>
                  )}

                  <RiArrowDownSLine className="w-5" />
                </MenuButton>
              }
              align="end"
              arrow
              transition
              arrowClassName="bg-secondary-100 "
              menuClassName="bg-bg-color px-4 rounded-lg border"
            >
              <div className="p-4">
                <div className="relative text-sm border-[#edf0f1]  bg-[#F9FBFF]  border rounded-lg block w-full py-2 px-1  focus:border-primary">
                  <FocusableItem>
                    {({ ref }) => (
                      <>
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
                          ref={ref}
                          type="text"
                          name="search"
                          placeholder="Search..."
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                      </>
                    )}
                  </FocusableItem>
                </div>
              </div>

              {organizations.length != 0 ?
                <MenuItem className="p-0 m-0 hover:bg-transparent">
                  <div className="w-60">
                    <div className="max-h-[40vh] overflow-y-scroll">
                      <>
                        {organizations.filter((list) => list.name.toUpperCase().includes(filter.trim().toUpperCase()))
                          .map((list, index) => (
                            <label
                              key={index}
                              onClick={() => handleShowOrganization(list)}
                              className="rounded-0 hover:bg-bg-primary cursor-pointer w-full bg-bg-color  transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-2 py-1.5 px-6 flex-1"
                            >
                              {list?.logo ? (
                                <img
                                  src={
                                    list.logo != null && list.logo != ""
                                      ? FileUploadService.getImage(list.logo)
                                      : placeholder
                                  }
                                  className="w-7 h-7 object-cover rounded-full border-2 border-bg-feature shadow-md"
                                />
                              ) : (
                                <div className="w-7 h-7 bg-green rounded-full flex justify-center items-center">
                                  <p className="font-sp-pro-text-bold text-md  text-white">
                                    {list.name.substring(0, 1)}
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-col">
                                <span className="text-xs text-text-color font-sp-pro-text-regular py-2">
                                  {list.name}
                                </span>
                              </div>
                            </label>

                          ))}
                      </>
                    </div>
                  </div>
                </MenuItem>
                : null}
            </Menu>
          </nav>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <SignOutComponent className="modal" />
        </div>
      </header>
    </>
  );
}
