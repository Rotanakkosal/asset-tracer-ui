import React, { Fragment, useEffect, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import facebook from "../../../assets/icon/social media/facebook.svg";
import instagram from "../../../assets/icon/social media/instagram.svg";
import twinter from "../../../assets/icon/social media/twitter.svg";
import linkedin from "../../../assets/icon/social media/linkedin.svg";
import { BsPlus } from "react-icons/bs";
import { AiFillGift } from "react-icons/ai";
import UserDetail from "./userPopup/UserDetail";
import FileUploadService from "../../../redux/services/FileUploadService";
import { Listbox } from "@headlessui/react";
import trash_ico from "../../../assets/images/trash.png";
import thinking from "../../../assets/icon/thinking-emoji.svg";
import { UserIcon } from "@heroicons/react/20/solid";
import { TbListDetails } from "react-icons/tb";
import "../../../style/shadow.css";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  setAllUser,
  setUserDetail,
  setInviteUser,
  setInvite,
  setRemoveUser,
} from "../../../redux/slices/UserSlice";
import UserService from "../../../redux/services/UserService";
import { FiTrash2 } from "react-icons/fi";
import { ArrowCircleUpSharp } from "@mui/icons-material";
import no_data_pic from "../../../assets/images/empty_box.png";
import { Slide, ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { PulseLoader } from "react-spinners";
import { ref } from "yup";
import { RiCloseFill } from "react-icons/ri";

// import 'react-toastify/dist/ReactToastify.css';
// const people = [
//   { id: 1, name: "Sort by" },
//   { id: 2, name: "A - Z" },
//   { id: 3, name: "Z - A" },
//   { id: 4, name: "Olest - Newest" },
//   { id: 5, name: "Newest - Olest" },
// ];
const sort = [
  {
    id: "",
    name: "Default",
  },
  {
    id: "asc",
    name: "A - Z",
  },
  {
    id: "desc",
    name: "Z - A",
  },
];

export default function UsersAllComponent() {
  const ref = useRef(null);
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();
  const [searchInvite, setSearchInvite] = useState("");
  const CurrentOrg = JSON.parse(sessionStorage.getItem("organization"));
  const userDetail = useSelector((state) => state.user.userDetail);
  const getSearchInvite = useSelector((state) => state.user.searchUsers);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filteredPeople =
    query === ""
      ? sort
      : sort.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  var orgId = organization.id;
  const users = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const getAllUserInOrganizations = () => {
    if (ref.current) {
      ref.current.staticStart();
    }
    UserService.getUserAllInOrganizations(orgId).then(
      (res) => {
        if (res.data?.success) {
          dispatch(setAllUser(res.data.payload));
          setTimeout(() => {
            if (ref.current) {
              ref.current.complete();
            }
          }, 500);
        }
      },
      (err) => {
        dispatch(setAllUser([]));
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete();
          }
        }, 500);
      }
    );
  };
  // ============ get search user to invite ===============
  const getAllSearchInvite = () => {
    setIsLoading(true);
    if (searchInvite != null) {
      UserService.searchUser(searchInvite).then(
        (res) => {
          if (res.data?.success) {
            setTimeout(() => {
              dispatch(setInviteUser(res.data.payload));
              setIsLoading(false);
            }, 1000);
          }
        },
        (err) => {
          setTimeout(() => {
            dispatch(setInviteUser([]));
            setIsLoading(false);
          }, 1000);
        }
      );
    }
  };
  // ============ Invite User to Organization ===============
  const inviteUserToOrganization = (userId) => {
    UserService.inviteUser({
      userId: userId,
      organizationId: orgId,
    }).then(
      (res) => {
        if (res.data?.success) {
          dispatch(setInvite(res.data.payload));
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

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleInputSearchUser = (e) => {
    setSearchInvite(e.target.value);
  };

  useEffect(() => {
    getAllUserInOrganizations();
  }, []);

  useEffect(() => {
    if (selectedSort != null || search != null) {
      UserService.getUserAllInOrganizations(orgId, search, selectedSort).then(
        (res) => {
          if (res.data?.success) {
            dispatch(setAllUser(res.data.payload));
          }
        },
        (err) => {
          dispatch(setAllUser([]));
        }
      );
    }

    if (searchInvite != null) {
      UserService.searchUser(searchInvite).then((res) => {
        if (res.searchUsers?.success) {
          dispatch(setInviteUser(res.searchUsers.payload));
        }
      });
    }
  }, [search, selectedSort]);

  const handleClearData = () => {
    setSearch("");
    dispatch(setSearchInvite([]));
  };

  const [user, setUser] = useState();
  console.log(user);
  const handelRemoveUser = () => {
    UserService.removeUserFromOrg(user, orgId).then((res) => {
      if (res.data?.success) {
        dispatch(setAllUser(""));
        toast.success("🤩 Remove Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      getAllUserInOrganizations();
      document.getElementById("remove_user").click();
    });
  };

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />
      <main className="p-6 con-Shadow px-4 lg:px-3 py-6 bg-white rounded-2xl relative">
        <input type="checkbox" id="remove_user" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <div className="absolute right-4 top-3 hover:bg-bg-primary w-8 h-8 flex justify-center rounded-full items-center cursor-pointer">
              <label htmlFor="remove_user">
                <RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
              </label>
            </div>
            <div className="flex flex-col justify-start">
              <div className="flex float-row items-center space-x-3">
                <img
                  src={trash_ico}
                  width={44}
                  height={44}
                  className="inline-block"
                />
                <h3 className="font-sp-pro-text-bold text-xl">Remove</h3>
              </div>
              <div className="m-auto">
                <div className="w-14 h-14 m-auto">
                  <img src={thinking} alt="" />
                </div>
                <p className="pt-2 py-5 font-sp-pro-text-semibold text-lg">
                  Are you sure want to{" "}
                  <span className="text-red-500"> remove</span> this user?
                </p>
              </div>
            </div>
            <br />
            <div className="flex justify-end space-x-4">
              <label
                htmlFor="remove_user"
                className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-90 border border-[#D0D5DD] flex justify-center items-center gap-1"
              >
                Cancel
              </label>
              <button
                onClick={handelRemoveUser}
                type="button"
                className="bg-opacity-10 rounded-md cursor-pointer bg-reject border border-reject py-2 px-5 text-sm font-sp-pro-text-medium text-reject flex justify-center items-center gap-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {/* <button onClick={showToastMessage}>Notify</button>
            <ToastContainer /> */}
        <div className="gap-6 overflow-hidden z-10 ">
          <div className="xl:flex xl:flex-row md:flex-col sm:flex-col justify-between gap-5 p-5">
            {/* header */}
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0">
              <h2 className="text-2xl font-sp-pro-text-semibold">
                All <span className="text-pending">User</span> Management
              </h2>
              <p className="font-sp-pro-text-regular text-sm text-green">
                Active Users
              </p>
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
                    onInput={handleInputSearch}
                    className="w-full pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* filter */}
              {/* <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
              <Combobox
                value={selectedSort}
                onChange={setSelectedSort}
                className="z-20"
              >
                <div className="relative z-20">
                  <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                    <Combobox.Input
                      className="w-full border-[#E1E9EE] border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                      displayValue={(person) => person.name}
                      onChange={(event) => setQuery(event.target.value)}
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
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPeople.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                          Nothing found.
                        </div>
                      ) : (
                        filteredPeople.map((person) => (
                          <Combobox.Option
                            key={person.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-hover-yellow text-text-color"
                                  : "text-text-color"
                              }`
                            }
                            value={person}
                          >
                            {({ selectedSort, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selectedSort ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selectedSort ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-text-color"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div> */}

              {/* add */}
              <div className="mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                <label
                  htmlFor="invite-user"
                  className="border border-opacity-70 w-max mr-auto md:min-w-max cursor-pointer border-yellow text-yellow hover:bg-primary hover:bg-opacity-10 p-[5px] pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase"
                >
                  <BsPlus className="w-6 h-6" />
                  &nbsp;Invite user
                </label>
              </div>
            </div>
          </div>

          {/* card */}
          <div className=" py-6 relative ">
            <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5   justify-items-center gap-10 lg:gap-x-10  gap-y-8 p-5 w-full">
              {users.length != 0 ? (
                users.map((list, index) => (
                  <div
                    key={index}
                    className="relative con-Shadow-Card rounded-xl min-w-max w-52 cursor-pointer"
                  // style={{
                  //   boxShadow: "0px 2.44633px 11.2792px rgba(0, 0, 0, 0.06)",
                  // }}
                  >
                    <div className="relative ">
                      {/* ========= 3 dot list ============ */}
                      <div className="absolute top-2 right-3 cursor-pointer">
                        <Listbox as="div">
                          {({ open }) => (
                            <>
                              <div className="relative">
                                {/* ========= will coming soon ========= */}
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
                                      {/* <label
                                        htmlFor="show-organization"
                                        className={`cursor-pointer text-text-color hover:bg-bg-primary inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                      >
                                        <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                          <TbListDetails /> Show Detail
                                        </span>
                                      </label> */}
                                      {/* {list?.roleName == "ADMIN" && */}
                                      <>
                                        {/* <label
                                          htmlFor="promote-organization"
                                          className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <ArrowCircleUpSharp /> Promote
                                          </span>
                                        </label> */}
                                        <label
                                          onClick={() => setUser(list.id)}
                                          htmlFor="remove_user"
                                          className={`cursor-pointer text-reject hover:bg-reject hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full  text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <FiTrash2 /> Remove
                                          </span>
                                        </label>
                                      </>
                                      {/* } */}
                                    </Listbox.Option>
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="font-bold text-xl mx-auto pt-6 lt-14:pt-6 text-center flex flex-col justify-center w-full ">
                        {list.image != "" && list.image != null ? (
                          <>
                            {/* <div className="font-bold text-xl mx-auto text-center w-full mt-4 mb-2 cursor-pointer">
                            <img
                              src={FileUploadService.getImage(list.image)}
                              className="w-[65px] h-[65px]  rounded-full flex justify-center items-center m-auto"
                            />
                          </div> */}
                            <div className="w-[60px] h-[60px] con-pro-color rounded-full flex justify-center items-center m-auto">
                              <img
                                src={FileUploadService.getImage(list.image)}
                                className="w-[60px] h-[60px]  rounded-full flex justify-center items-center m-auto"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-[60px] h-[60px] con-pro-color rounded-full flex justify-center items-center m-auto">
                              <p className="font-sp-pro-text-bold uppercase text-[20px] text-green ">
                                {list.name.substring(0, 2)}
                                {/* {console.log(list)} */}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="pt-2 font-sp-pro-text-bold text-base w-full text-center text-text-color capitalize">
                        {list.name}
                      </p>
                      <p className="text-gray-700  lg:text-[12px] text-[12px] opacity-60 w-40  truncate m-auto">
                        {list.email}
                      </p>

                      <div className="m-auto gap-1 flex flex-row justify-center space-x-1 pt-4 2xl:pb-5 pb-3">
                        <div className="w-6 h-6  rounded-full">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="w-6 h-6 rounded-full">
                          <img src={instagram} alt="" />
                        </div>
                        <div className="w-6 h-6 rounded-full">
                          <img src={linkedin} alt="" />
                        </div>
                        <div className="w-6 h-6 rounded-full">
                          <img src={twinter} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 w-48  text-center mx-auto  ">
                      {/* <span className="inline-block w-full bg-gray-200 rounded-md py-2 px-3 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-yellow text-white">
                    More Info
                  </span> */}
                      <label
                        onClick={() => dispatch(setUserDetail(list))}
                        htmlFor="my-modal-5"
                        className="inline-block mb-1 2xl:mb-2 lt-16:w-full lt-14:w-28 cursor-pointer  shadow-[#F8C400] con-Shadow-btn rounded-md py-2 px-4 lt-16:text-sm lt-14:text-xs font-sp-pro-text-regular text-gray-700 mr-2  bg-yellow text-white"
                      >
                        <p className=" text-xs ">More Info</p>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-full col-span-12 h-[calc(100vh-18.5rem)] flex justify-center items-center">
                  <div className="mt-[-6rem]">
                    <img
                      src={no_data_pic}
                      className="w-2/6 xl:w-3/6 m-auto pb-5"
                    />
                    <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                      No User
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* ============== popupDetaile ================ */}
          <input type="checkbox" id="my-modal-5" className="modal-toggle" />
          {/* <UserDetail className="modal" /> */}
          <div className="modal px-6 ">
            <div className="  bg-white p-8   rounded-[15px] max-w-5xl sm:w-[50rem] lg:w-[65rem]  xl:h-[500px] xl:w-[1280px]  ">
              {/* header */}
              <div className="  flex justify-between">
                <div className="flex items-center space-x-4">
                  <UserIcon className="h-12 w-12 p-1 text-primary bg-primary bg-opacity-20 rounded-2xl rounded-se-md" />
                  <h2 className="text-[20px] font-sp-pro-text-bold text-text-color">
                    Profile Details
                  </h2>
                </div>
                <label htmlFor="my-modal-5" className="cursor-pointer">
                  <label
                    htmlFor="my-modal-5"
                    className="btn border-bg-primary-strock bg-white text-red-500 hover:bg-white hover:border-red-400 btn-sm btn-circle "
                  >
                    ✕
                  </label>
                </label>
              </div>

              {/* ============ content =========== */}

              <div className="lg:flex space-x-12 relative ">
                <div className="lg:w-1/3 sm:py-4 md:py-7 xl:py-12 md:w-full">
                  <div className="flex justify-center ">
                    {userDetail.image != null ? (
                      <>
                        <img
                          src={FileUploadService.getImage(userDetail.image)}
                          className=" w-[130px] h-[130px] rounded-full flex justify-center items-center m-auto"
                        />
                      </>
                    ) : (
                      <>
                        <div className=" w-[130px] h-[130px] con-pro-color rounded-full flex justify-center items-center m-auto">
                          <p className="font-sp-pro-text-bold uppercase text-[40px] text-green ">
                            {userDetail.name.substring(0, 2)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="flex justify-center font-sp-pro-text-bold text-2xl text-text-color">
                      {userDetail.name}
                    </h3>
                    <p className="flex justify-center text-md font- font-sp-pro-text-regular  text-primary">
                      UX/UI Design
                    </p>
                  </div>
                  <div className="m-auto gap-1 flex flex-row justify-center space-x-2 pt-3 2xl:pb-5 ">
                    <div className="w-8 h-8  rounded-full">
                      <svg
                        viewBox="0 0 40 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2269_129716)">
                          <path
                            d="M19.8519 0C9.16298 0 0.5 8.66298 0.5 19.3519C0.5 30.0407 9.16298 38.7037 19.8519 38.7037C30.5407 38.7037 39.2037 30.0407 39.2037 19.3519C39.2037 8.66298 30.5407 0 19.8519 0ZM31.9316 31.4241C30.3593 32.9964 28.5375 34.2286 26.5041 35.0828C24.4026 35.9748 22.165 36.4208 19.8519 36.4208C17.5463 36.4208 15.3087 35.9672 13.1997 35.0828C11.1662 34.221 9.33684 32.9889 7.77206 31.4241C6.19973 29.8517 4.96756 28.03 4.11335 25.9965C3.22135 23.895 2.7678 21.6574 2.7678 19.3519C2.7678 17.0463 3.22135 14.8087 4.10579 12.6997C4.96756 10.6662 6.19973 8.83684 7.7645 7.27206C9.3444 5.69973 11.1662 4.46756 13.1997 3.60579C15.3087 2.72135 17.5463 2.2678 19.8519 2.2678C22.1574 2.2678 24.395 2.72135 26.5041 3.60579C28.5375 4.46756 30.3669 5.69973 31.9316 7.26451C33.504 8.83684 34.7362 10.6586 35.5904 12.6921C36.4824 14.7936 36.9284 17.0311 36.9284 19.3443C36.9284 21.6499 36.4748 23.8874 35.5904 25.9965C34.7286 28.03 33.4964 29.8593 31.9316 31.4241Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M22.4064 12.7522C23.185 12.7522 24.0165 12.9941 24.0165 12.9941L24.5154 10.0308C24.5154 10.0308 23.4571 9.66797 20.9323 9.66797C19.3827 9.66797 18.4831 10.2576 17.8254 11.1269C17.2056 11.9509 17.1829 13.2738 17.1829 14.128V16.0707H15.1797V18.9659H17.1829V29.0198H20.9323V18.9659H23.9031L24.1224 16.0707H20.9323V13.8105C20.9323 13.0319 21.6278 12.7522 22.4064 12.7522Z"
                            fill="#9197B3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2269_129716">
                            <rect
                              width="38.7037"
                              height="38.7037"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="w-8 h-8  rounded-full">
                      <svg
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2269_129726)">
                          <path
                            d="M19.3816 0C8.69276 0 0.0297852 8.66298 0.0297852 19.3519C0.0297852 30.0407 8.69276 38.7037 19.3816 38.7037C30.0705 38.7037 38.7335 30.0407 38.7335 19.3519C38.7335 8.66298 30.0705 0 19.3816 0ZM31.4614 31.4241C29.8891 32.9964 28.0673 34.2286 26.0338 35.0828C23.9323 35.9748 21.6948 36.4208 19.3816 36.4208C17.076 36.4208 14.8385 35.9672 12.7294 35.0828C10.696 34.221 8.86663 32.9889 7.30185 31.4241C5.72951 29.8517 4.49734 28.03 3.64314 25.9965C2.75114 23.895 2.29758 21.6574 2.29758 19.3519C2.29758 17.0463 2.75114 14.8087 3.63558 12.6997C4.49734 10.6662 5.72951 8.83684 7.29429 7.27206C8.87419 5.69973 10.696 4.46756 12.7294 3.60579C14.8385 2.72135 17.076 2.2678 19.3816 2.2678C21.6872 2.2678 23.9248 2.72135 26.0338 3.60579C28.0673 4.46756 29.8967 5.69973 31.4614 7.26451C33.0338 8.83684 34.2659 10.6586 35.1201 12.6921C36.0121 14.7936 36.4581 17.0311 36.4581 19.3443C36.4581 21.6499 36.0046 23.8874 35.1201 25.9965C34.2584 28.03 33.0262 29.8593 31.4614 31.4241Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M25.3248 9.67578H13.4567C11.393 9.67578 9.71484 11.3539 9.71484 13.4176V17.3712V25.2933C9.71484 27.357 11.393 29.0352 13.4567 29.0352H25.3248C27.3885 29.0352 29.0667 27.357 29.0667 25.2933V17.3636V13.4101C29.0591 11.3539 27.381 9.67578 25.3248 9.67578ZM26.3983 11.9058H26.8291V12.3291V15.1865L23.556 15.1941L23.5484 11.9133L26.3983 11.9058ZM16.6241 17.3636C17.2439 16.5094 18.2493 15.9425 19.3832 15.9425C20.5171 15.9425 21.5225 16.5018 22.1424 17.3636C22.5506 17.923 22.7849 18.6109 22.7849 19.3517C22.7849 21.2264 21.2579 22.761 19.3757 22.761C17.4934 22.761 15.9815 21.2264 15.9815 19.3517C15.9815 18.6109 16.2234 17.923 16.6241 17.3636ZM27.1769 25.2858C27.1769 26.3063 26.3453 27.1378 25.3248 27.1378H13.4567C12.4362 27.1378 11.6047 26.3063 11.6047 25.2858V17.3636H14.4923C14.2429 17.9759 14.0992 18.6487 14.0992 19.3517C14.0992 22.2696 16.4729 24.6432 19.3908 24.6432C22.3087 24.6432 24.6823 22.2696 24.6823 19.3517C24.6823 18.6487 24.5387 17.9759 24.2892 17.3636H27.1769V25.2858Z"
                            fill="#9197B3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2269_129726">
                            <rect
                              width="38.7037"
                              height="38.7037"
                              fill="white"
                              transform="translate(0.0307617)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-full">
                      <svg
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2269_129720)">
                          <path
                            d="M19.616 0C8.92714 0 0.26416 8.66298 0.26416 19.3519C0.26416 30.0407 8.92714 38.7037 19.616 38.7037C30.3049 38.7037 38.9679 30.0407 38.9679 19.3519C38.9679 8.66298 30.3049 0 19.616 0ZM31.6958 31.4241C30.1235 32.9964 28.3017 34.2286 26.2682 35.0828C24.1667 35.9748 21.9292 36.4208 19.616 36.4208C17.3104 36.4208 15.0729 35.9672 12.9638 35.0828C10.9304 34.221 9.101 32.9889 7.53622 31.4241C5.96389 29.8517 4.73172 28.03 3.87751 25.9965C2.98551 23.895 2.53196 21.6574 2.53196 19.3519C2.53196 17.0463 2.98551 14.8087 3.86995 12.6997C4.73172 10.6662 5.96389 8.83684 7.52866 7.27206C9.10856 5.69973 10.9304 4.46756 12.9638 3.60579C15.0729 2.72135 17.3104 2.2678 19.616 2.2678C21.9216 2.2678 24.1592 2.72135 26.2682 3.60579C28.3017 4.46756 30.131 5.69973 31.6958 7.26451C33.2681 8.83684 34.5003 10.6586 35.3545 12.6921C36.2465 14.7936 36.6925 17.0311 36.6925 19.3443C36.6925 21.6499 36.239 23.8874 35.3545 25.9965C34.4928 28.03 33.2606 29.8593 31.6958 31.4241Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M14.2042 15.375H10.4321V27.4472H14.2042V15.375Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M12.2363 9.67578C10.8453 9.67578 9.93066 10.5753 9.93066 11.7697C9.93066 12.9414 10.8151 13.8636 12.1833 13.8636H12.2136C13.6347 13.8636 14.5192 12.9338 14.5116 11.7697C14.4814 10.5753 13.6272 9.67578 12.2363 9.67578Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M24.5053 15.2617C22.3434 15.2617 20.9902 16.441 20.7408 17.2725V15.3751H16.5C16.5529 16.3805 16.5 27.4473 16.5 27.4473H20.7408V20.9236C20.7408 20.5532 20.7257 20.1904 20.8315 19.9334C21.1187 19.2077 21.7462 18.4518 22.8725 18.4518C24.3466 18.4518 25.0118 19.5705 25.0118 21.2033V27.4473H29.2904V20.7347C29.2904 17.0004 27.1889 15.2617 24.5053 15.2617Z"
                            fill="#9197B3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2269_129720">
                            <rect
                              width="38.7037"
                              height="38.7037"
                              fill="white"
                              transform="translate(0.265625)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="w-8 h-8  rounded-full">
                      <svg
                        viewBox="0 0 40 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2269_129730)">
                          <path
                            d="M20.1497 0C9.46083 0 0.797852 8.66298 0.797852 19.3519C0.797852 30.0407 9.46083 38.7037 20.1497 38.7037C30.8386 38.7037 39.5016 30.0407 39.5016 19.3519C39.5016 8.66298 30.8386 0 20.1497 0ZM32.2295 31.4241C30.6572 32.9964 28.8354 34.2286 26.8019 35.0828C24.7004 35.9748 22.4629 36.4208 20.1497 36.4208C17.8441 36.4208 15.6066 35.9672 13.4975 35.0828C11.464 34.221 9.63469 32.9889 8.06992 31.4241C6.49758 29.8517 5.26541 28.03 4.41121 25.9965C3.51921 23.895 3.06565 21.6574 3.06565 19.3519C3.06565 17.0463 3.51921 14.8087 4.40365 12.6997C5.26541 10.6662 6.49758 8.83684 8.06236 7.27206C9.64225 5.69973 11.464 4.46756 13.4975 3.60579C15.6066 2.72135 17.8441 2.2678 20.1497 2.2678C22.4553 2.2678 24.6929 2.72135 26.8019 3.60579C28.8354 4.46756 30.6647 5.69973 32.2295 7.26451C33.8018 8.83684 35.034 10.6586 35.8882 12.6921C36.7802 14.7936 37.2262 17.0311 37.2262 19.3443C37.2262 21.6499 36.7726 23.8874 35.8882 25.9965C35.0264 28.03 33.7943 29.8593 32.2295 31.4241Z"
                            fill="#9197B3"
                          />
                          <path
                            d="M29.3229 12.7091C28.5519 13.1627 27.7052 13.4953 26.7981 13.6767C26.0724 12.9057 25.0368 12.4219 23.8953 12.4219C21.7031 12.4219 19.9191 14.2059 19.9191 16.3981C19.9191 16.708 19.9494 17.0104 20.025 17.3052C16.7215 17.1389 13.7885 15.559 11.8307 13.1476C11.4905 13.7372 11.2939 14.4175 11.2939 15.1508C11.2939 16.5266 11.997 17.7436 13.0628 18.4618C12.4127 18.4391 11.8004 18.2577 11.2637 17.9629V18.0082C11.2637 19.9358 12.6319 21.546 14.4537 21.9088C14.1211 21.9995 13.7658 22.0524 13.403 22.0524C13.146 22.0524 12.8965 22.0298 12.6546 21.9844C13.1611 23.5643 14.6276 24.7133 16.3662 24.7436C15.0056 25.8094 13.2896 26.4444 11.43 26.4444C11.1125 26.4444 10.795 26.4293 10.4775 26.3915C12.2389 27.5178 14.3252 28.1755 16.5703 28.1755C23.8878 28.1755 27.8866 22.1129 27.8866 16.8592C27.8866 16.6853 27.8866 16.5115 27.8791 16.3452C28.6577 15.7782 29.3305 15.0828 29.8596 14.2815C29.1491 14.599 28.378 14.8106 27.5767 14.9089C28.4007 14.4175 29.0281 13.6389 29.3229 12.7091Z"
                            fill="#9197B3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2269_129730">
                            <rect
                              width="38.7037"
                              height="38.7037"
                              fill="white"
                              transform="translate(0.796387)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className=" md:flex w-2/3 md:w-full ">
                  <div className="w-1/2 py-7 xl:py-8  sm:w-full ">
                    <div className="grid sm:grid-cols-1 sm:px-7 sm:gap-y-5  md:gap-y-12 md:grid-cols-2 gap-12 gap-x-16 ">
                      <div>
                        <div className="flex items-center ">
                          <span className="flex-grow-0">
                            <svg
                              width="43"
                              height="42"
                              viewBox="0 0 43 41"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_2367_165989)">
                                <rect
                                  width="43"
                                  height="40.42"
                                  rx="10.32"
                                  fill="#F8C400"
                                  fillOpacity="0.8"
                                />
                                <g clipPath="url(#clip1_2367_165989)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M29.5 15.0905L21.5 21.7662L13.5 15.081V14.8141H29.5V15.0905ZM13.5 25.2641V17.6118L21.5 24.295L29.5 17.6194V25.2641H13.5ZM11.5 27.1641H31.5V12.9141H11.5V27.1641Z"
                                    fill="white"
                                  />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_2367_165989">
                                  <rect
                                    width="43"
                                    height="40.42"
                                    rx="10.32"
                                    fill="white"
                                  />
                                </clipPath>
                                <clipPath id="clip1_2367_165989">
                                  <rect
                                    width="20"
                                    height="19"
                                    fill="white"
                                    transform="translate(11.5 10.5391)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>

                          {/* <EnvelopeIcon className="h-10 w-10 bg-primary p-2 text-white rounded-md" /> */}
                          <div className="flex flex-col px-3">
                            <h3 className="block text-[18px] font-sp-pro-text-semibold  item-center">
                              Email
                            </h3>
                            <p className="w-full font-sp-pro-text-regular text-[16px] text-gray">
                              {userDetail.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center ">
                          {/* =============== Icon Date ============= */}
                          <span className="flex flex-grow-0">
                            <svg
                              width="43"
                              height="42"
                              viewBox="0 0 43 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.59375"
                                width="43"
                                height="40.42"
                                rx="10.32"
                                fill="#F8C400"
                                fillOpacity="0.8"
                              />
                              <path
                                d="M29.8332 18.6328V15.6328C29.8332 14.5282 28.9005 13.6328 27.7498 13.6328H15.2498C14.0992 13.6328 13.1665 14.5282 13.1665 15.6328V18.6328M29.8332 18.6328V27.6328C29.8332 28.7374 28.9005 29.6328 27.7498 29.6328H15.2498C14.0992 29.6328 13.1665 28.7374 13.1665 27.6328V18.6328M29.8332 18.6328H13.1665M17.3332 11.6328V15.6328M25.6665 11.6328V15.6328"
                                stroke="white"
                                strokeWidth="1.91667"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17.8542 20.6328H15.7708C15.4832 20.6328 15.25 20.8567 15.25 21.1328V23.1328C15.25 23.409 15.4832 23.6328 15.7708 23.6328H17.8542C18.1418 23.6328 18.375 23.409 18.375 23.1328V21.1328C18.375 20.8567 18.1418 20.6328 17.8542 20.6328Z"
                                fill="white"
                              />
                              <path
                                d="M22.5417 20.6328H20.4583C20.1707 20.6328 19.9375 20.8567 19.9375 21.1328V23.1328C19.9375 23.409 20.1707 23.6328 20.4583 23.6328H22.5417C22.8293 23.6328 23.0625 23.409 23.0625 23.1328V21.1328C23.0625 20.8567 22.8293 20.6328 22.5417 20.6328Z"
                                fill="white"
                              />
                              <path
                                d="M27.2292 20.6328H25.1458C24.8582 20.6328 24.625 20.8567 24.625 21.1328V23.1328C24.625 23.409 24.8582 23.6328 25.1458 23.6328H27.2292C27.5168 23.6328 27.75 23.409 27.75 23.1328V21.1328C27.75 20.8567 27.5168 20.6328 27.2292 20.6328Z"
                                fill="white"
                              />
                            </svg>
                          </span>

                          {/* ================================================== */}
                          {/* <CalendarDaysIcon className="h-10 w-10 bg-primary p-1 text-white rounded-md" /> */}
                          <div className="flex flex-col px-3">
                            <h3 className="block  text-[20px] font-sp-pro-text-semibold items-center  ">
                              Create date
                            </h3>
                            <p className="font-sp-pro-text-regular text-[16px] text-gray">
                              {" "}
                              {moment(userDetail.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center">
                          {/* =============== Icon Date ============= */}
                          <svg
                            width="43"
                            height="42"
                            viewBox="0 0 43 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="0.59375"
                              width="43"
                              height="40.42"
                              rx="10.32"
                              fill="#F8C400"
                              fillOpacity="0.8"
                            />
                            <g clipPath="url(#clip0_2367_166016)">
                              <path
                                d="M22.008 16.9858C21.4776 16.4535 20.8319 16.0329 20.114 15.7599C19.7751 16.1366 19.5443 16.5951 19.4479 17.0924C19.4217 17.2264 19.406 17.3608 19.3988 17.4946C19.4578 17.5149 19.5155 17.5365 19.5719 17.5611C20.1973 17.8263 20.7342 18.2701 21.1105 18.8293C21.4127 19.2764 21.6133 19.794 21.6809 20.3549C21.6986 20.4948 21.7071 20.6375 21.7071 20.783C21.7071 21.2688 21.6094 21.7264 21.4331 22.144C21.2141 22.659 20.8752 23.1146 20.4497 23.4689C20.3592 23.5453 20.2642 23.6161 20.1658 23.6826C19.6066 24.0603 18.9393 24.2792 18.2109 24.2792C17.7264 24.2792 17.2695 24.1812 16.8512 24.0052C16.2245 23.74 15.6895 23.2958 15.3119 22.7369C14.9356 22.1787 14.7166 21.5097 14.7166 20.783C14.7166 20.2975 14.813 19.8406 14.99 19.422C15.228 18.8602 15.6115 18.3698 16.0933 18.0037C16.0842 17.8768 16.0802 17.75 16.0802 17.6231C16.0802 16.9715 16.1825 16.3356 16.3772 15.7344C15.6318 16.0055 14.9631 16.4365 14.415 16.9859C13.4435 17.9545 12.8403 19.3027 12.8423 20.783C12.8404 22.2637 13.4435 23.6119 14.415 24.5808C15.224 25.3911 16.2965 25.9428 17.4897 26.103V27.7768H15.0018V29.2184H17.4897V31.6361H18.932V29.2183H21.4219V27.7767H18.932V26.103C20.1258 25.9427 21.1997 25.391 22.008 24.5808C22.2781 24.3107 22.5187 24.0124 22.7278 23.6895C23.2687 22.852 23.5827 21.8513 23.5814 20.783C23.5814 20.5323 23.5637 20.2841 23.5309 20.0422C23.3664 18.8555 22.8143 17.7902 22.008 16.9858Z"
                                fill="white"
                              />
                              <path
                                d="M25.4971 9.63281V11.0745H27.6972L25.4236 13.348C24.4664 12.6184 23.3159 12.2496 22.1713 12.2506C20.8004 12.2496 19.4205 12.7757 18.3741 13.824C17.6254 14.5707 17.1443 15.4875 16.9292 16.4502C16.9266 16.462 16.9253 16.4738 16.922 16.4837C16.9135 16.521 16.9063 16.5587 16.8991 16.5945C16.8859 16.664 16.8742 16.7331 16.863 16.8023C16.8558 16.8439 16.8499 16.8875 16.8453 16.9291C16.8368 16.9924 16.8296 17.0573 16.8244 17.1222C16.8211 17.1596 16.8172 17.1973 16.8152 17.2346C16.8139 17.2533 16.8126 17.2723 16.8113 17.2923C16.808 17.33 16.8067 17.3687 16.8054 17.406C16.8028 17.4768 16.8008 17.5489 16.8008 17.6198C16.8008 17.6745 16.8028 17.7292 16.8041 17.7853C16.8067 17.8404 16.81 17.8948 16.8126 17.9512L16.8211 18.0724C16.8211 18.0925 16.8244 18.1127 16.8257 18.1344C16.9411 19.3321 17.4583 20.503 18.3741 21.4172C18.9288 21.9722 19.5778 22.3813 20.2681 22.6425C20.4772 22.4121 20.6477 22.1453 20.7703 21.8581C20.8968 21.5569 20.9689 21.2382 20.9833 20.9095C20.5146 20.741 20.0767 20.4699 19.6991 20.0923C19.3575 19.7491 19.1018 19.3568 18.932 18.9358C18.8108 18.6385 18.7327 18.3272 18.6986 18.0131C18.6764 17.8272 18.6711 17.6397 18.6796 17.4539C18.6823 17.4077 18.6855 17.3631 18.6881 17.3182C18.6914 17.2851 18.694 17.252 18.6999 17.2186C18.6999 17.2058 18.7025 17.193 18.7039 17.1799C18.7071 17.1481 18.7111 17.115 18.717 17.0835C18.7242 17.0402 18.7314 16.9953 18.7399 16.9524C18.7779 16.756 18.8323 16.563 18.9044 16.3755C18.9176 16.3411 18.9307 16.308 18.9464 16.2732C18.9609 16.2372 18.9765 16.2011 18.9936 16.1651C19.008 16.129 19.0251 16.0929 19.0441 16.0582C19.0598 16.0225 19.0788 15.9877 19.0992 15.9533C19.1942 15.777 19.3064 15.6072 19.4349 15.4455C19.4611 15.4125 19.4886 15.3794 19.5155 15.3475C19.5751 15.2797 19.6355 15.2135 19.7004 15.1486C19.781 15.0679 19.8629 14.9929 19.9482 14.9237C20.2275 14.6916 20.5336 14.5097 20.8548 14.3802C21.4848 14.1249 22.1784 14.06 22.8399 14.1884C23.5021 14.3169 24.1288 14.6336 24.6441 15.1485C24.987 15.4917 25.2407 15.8841 25.4105 16.3047C25.6675 16.9347 25.7324 17.6269 25.6039 18.2888C25.4741 18.9502 25.1567 19.5773 24.6441 20.0923C24.5313 20.2047 24.4133 20.3087 24.2908 20.4007C24.2979 20.5276 24.3019 20.6545 24.3019 20.7796C24.3039 21.4257 24.2009 22.0626 24.0036 22.6684C24.7215 22.4088 25.3947 21.9908 25.9684 21.4172C27.0154 20.3719 27.5431 18.9919 27.5418 17.6197C27.5431 16.4747 27.174 15.3262 26.443 14.3674L28.7166 12.0938V14.2949H30.1582V9.63281H25.4971Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2367_166016">
                                <rect
                                  width="22"
                                  height="22"
                                  fill="white"
                                  transform="translate(10.5 9.63281)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          {/* ======================================= */}

                          {/* <BsGenderAmbiguous className="h-10 w-10 bg-primary p-2 text-white rounded-md" /> */}
                          <div className="flex flex-col  px-3">
                            <h3 className="block text-[18px] font-sp-pro-text-semibold item-center">
                              Gender
                            </h3>
                            <p className="font-sp-pro-text-regular text-[16px] text-gray">
                              {userDetail.gender}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* ================= Role User ============== */}
                        <div className="flex items-center">
                          <svg
                            width="44"
                            height="41"
                            viewBox="0 0 44 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              width="43"
                              height="40.42"
                              rx="10.32"
                              fill="#F8C400"
                              fillOpacity="0.8"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.4135 13.8722C17.4135 11.339 19.467 9.28552 22.0002 9.28552C24.5333 9.28552 26.5868 11.339 26.5868 13.8722C26.5868 16.4053 24.5333 18.4589 22.0002 18.4589C19.467 18.4589 17.4135 16.4053 17.4135 13.8722ZM26.3854 19.1738C27.9093 17.9119 28.8802 16.0054 28.8802 13.8722C28.8802 10.0725 25.7999 6.99219 22.0002 6.99219C18.2005 6.99219 15.1202 10.0725 15.1202 13.8722C15.1202 16.0054 16.091 17.9119 17.615 19.1738C13.9554 20.4608 11.6802 23.3292 11.6802 26.4855C11.6802 27.1188 12.1936 27.6322 12.8268 27.6322C13.4601 27.6322 13.9735 27.1188 13.9735 26.4855C13.9735 23.8833 16.6743 20.7522 22.0002 20.7522C27.3261 20.7522 30.0268 23.8833 30.0268 26.4855C30.0268 27.1188 30.5402 27.6322 31.1735 27.6322C31.8068 27.6322 32.3202 27.1188 32.3202 26.4855C32.3202 23.3292 30.045 20.4608 26.3854 19.1738Z"
                              fill="white"
                            />
                          </svg>
                          {/* ============================================ */}
                          {/* <UserCircleIcon className="h-10 w-10 bg-primary p-1 text-white rounded-md" /> */}
                          <div className="flex flex-col px-3">
                            <h3 className="block text-[18px] font-sp-pro-text-semibold item-center">
                              Role
                            </h3>
                            <p className="font-sp-pro-text-regular text-[16px] text-gray">
                              role user
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center">
                          {/* =====================Icon Phone nomber ====================== */}
                          <svg
                            width="43"
                            height="41"
                            viewBox="0 0 43 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2367_166055)">
                              <rect
                                width="43"
                                height="40.42"
                                rx="10.32"
                                fill="#F8C400"
                                fillOpacity="0.8"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31.8683 18.5377C32.4879 18.0885 32.8219 17.5088 32.8331 16.9171C32.8521 15.9174 32.1705 14.1027 27.8138 12.1488C23.5394 10.2317 19.7341 10.2027 15.0334 12.0829C12.6646 13.0305 11.4692 13.9543 10.8575 14.7414C10.2629 15.5063 10.1784 16.194 10.1668 16.8033C10.1556 17.393 10.4653 17.9707 11.0623 18.4228C11.6601 18.8754 12.5202 19.1763 13.5032 19.1818C13.9204 19.1842 14.1718 19.0639 14.3442 18.9036C14.531 18.7297 14.678 18.4587 14.7818 18.0809C14.9624 17.4245 14.9708 16.6323 14.9787 15.8826C14.9802 15.7421 14.9817 15.6031 14.9843 15.4667C14.9864 15.3537 15.0222 15.2439 15.087 15.1508C15.7033 14.2659 16.7878 13.6662 17.9808 13.2879C19.1889 12.9047 20.5895 12.7222 21.9432 12.7299C23.2946 12.7376 24.636 12.935 25.7196 13.3392C26.7801 13.7348 27.7251 14.3811 28.0403 15.3726C28.0591 15.4319 28.0681 15.4939 28.0669 15.556C28.0643 15.6925 28.0605 15.8316 28.0566 15.9722C28.0361 16.7219 28.0145 17.5133 28.1698 18.1707C28.2591 18.549 28.3948 18.8176 28.5708 18.9894C28.7319 19.1468 28.9741 19.2698 29.3915 19.2721C30.3744 19.2777 31.249 18.9867 31.8683 18.5377ZM32.5584 19.467C31.7198 20.075 30.5958 20.4316 29.3849 20.4247C28.7054 20.4209 28.1573 20.2061 27.7509 19.8092C27.3594 19.4271 27.1501 18.9254 27.0338 18.4326C26.8406 17.615 26.8691 16.6425 26.891 15.9017C26.8936 15.8099 26.8963 15.7217 26.8984 15.6377C26.7145 15.1837 26.198 14.7497 25.3076 14.4175C24.3881 14.0746 23.192 13.8896 21.9366 13.8825C20.6837 13.8754 19.4085 14.0456 18.3373 14.3853C17.3344 14.7034 16.5768 15.1484 16.148 15.6721L16.1463 15.856C16.1399 16.5969 16.1315 17.5688 15.9076 18.3831C15.7726 18.8738 15.5455 19.3691 15.1438 19.7427C14.7277 20.1298 14.1761 20.3382 13.4965 20.3344C12.2857 20.3275 11.1723 19.9582 10.3527 19.3376C9.5323 18.7163 8.98082 17.8174 9.00051 16.7817C9.01456 16.0421 9.12707 15.0753 9.93229 14.0393C10.7203 13.0254 12.1275 12.0018 14.5957 11.0146C19.5687 9.02537 23.7078 9.04148 28.2959 11.0992C32.8019 13.1201 34.0316 15.2408 33.9994 16.9388C33.9798 17.9725 33.3965 18.8594 32.5584 19.467ZM16.8881 19.0045C16.8881 17.3724 18.2272 16.0493 19.879 16.0493H23.2295C24.8813 16.0493 26.2204 17.3724 26.2204 19.0045C26.2204 19.7095 26.6769 20.3354 27.3538 20.5583L27.9409 20.7516C29.3019 21.1999 30.2199 22.4584 30.2199 23.8757V27.2459C30.2199 29.0646 28.7276 30.5391 26.8869 30.5391H16.2215C14.3808 30.5391 12.8886 29.0646 12.8886 27.2459V23.8757C12.8886 22.4584 13.8066 21.1999 15.1676 20.7516L15.7547 20.5583C16.4316 20.3354 16.8881 19.7095 16.8881 19.0045ZM19.879 17.3666C18.9635 17.3666 18.2213 18.0999 18.2213 19.0045C18.2213 20.2765 17.3975 21.4057 16.1762 21.808L15.5892 22.0013C14.7726 22.2703 14.2218 23.0253 14.2218 23.8757V27.2459C14.2218 28.3372 15.1171 29.2219 16.2215 29.2219H26.8869C27.9914 29.2219 28.8866 28.3372 28.8866 27.2459V23.8757C28.8866 23.0253 28.3359 22.2703 27.5193 22.0013L26.9323 21.808C25.7109 21.4057 24.8871 20.2765 24.8871 19.0045C24.8871 18.0999 24.145 17.3666 23.2295 17.3666H19.879ZM19.5544 24.6113C19.5544 23.5201 20.4497 22.6355 21.5541 22.6355C22.6586 22.6355 23.5539 23.5201 23.5539 24.6113C23.5539 25.7026 22.6586 26.5872 21.5541 26.5872C20.4497 26.5872 19.5544 25.7026 19.5544 24.6113ZM21.5541 21.3183C19.7134 21.3183 18.2212 22.7926 18.2212 24.6113C18.2212 26.4301 19.7134 27.9045 21.5541 27.9045C23.3949 27.9045 24.887 26.4301 24.887 24.6113C24.887 22.7926 23.3949 21.3183 21.5541 21.3183Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2367_166055">
                                <rect
                                  width="43"
                                  height="40.42"
                                  rx="10.32"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          {/* ================================================================ */}
                          <div className="flex flex-col px-3">
                            <h3 className="block text-[18px] font-sp-pro-text-semibold item-center">
                              Phone Number
                            </h3>
                            <p className="font-sp-pro-text-regular text-[16px] text-gray">
                              {userDetail.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center">
                          {/* ============== icon address ============ */}
                          <svg
                            width="43"
                            height="41"
                            viewBox="0 0 43 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2367_166030)">
                              <rect
                                width="43"
                                height="40.42"
                                rx="10.32"
                                fill="#F8C400"
                                fillOpacity="0.8"
                              />
                              <path
                                d="M21.5 21.4531C23.0188 21.4531 24.25 20.2219 24.25 18.7031C24.25 17.1843 23.0188 15.9531 21.5 15.9531C19.9812 15.9531 18.75 17.1843 18.75 18.7031C18.75 20.2219 19.9812 21.4531 21.5 21.4531Z"
                                stroke="white"
                                strokeWidth="1.83333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M27.9168 18.4766C27.9168 23.6328 21.5002 28.7891 21.5002 28.7891C21.5002 28.7891 15.0835 23.6328 15.0835 18.4766C15.0835 15.0593 17.9563 12.2891 21.5002 12.2891C25.044 12.2891 27.9168 15.0593 27.9168 18.4766Z"
                                stroke="white"
                                strokeWidth="1.83333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2367_166030">
                                <rect
                                  width="43"
                                  height="40.42"
                                  rx="10.32"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          {/* ============== icon address ============ */}
                          {/* <MapPinIcon className="h-10 w-10 bg-primary p-2 text-white rounded-md" /> */}
                          <div className="flex flex-col px-3">
                            <h3 className="block text-[18px] font-sp-pro-text-semibold item-center">
                              Address
                            </h3>
                            <p className="font-sp-pro-text-regular text-[16px] text-gray">
                              {userDetail.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex pt-14 pr-6 justify-end flex-row w-full ">
                    <div className="text-primary border border-primary cursor-pointer  w-36 p-2  rounded-lg flex justify-center">
                      <button className="flex justify-around font-sp-pro-text-regular items-center xl:text-[16px] text-[12px] ">
                        Cancel
                      </button>
                    </div>
                    <div className="bg-primary cursor-pointer  ml-6 w-36 p-2 rounded-lg flex justify-center">
                      <button className="flex  justify-around text-white font-sp-pro-text-regular items-center text-[12px] xl:text-[16px]">
                        Save
                      </button>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ Modol invite user  ===============*/}
          <input type="checkbox" id="invite-user" className="modal-toggle" />
          <div className="modal duration-300">
            <div className="bg-bg-primary overflow-hidden sm:h-[29rem] sm:w-[30rem] lg:h-[35rem] lg:w-[35rem] 2xl:h-[35rem] 2xl:w-[36] lt-16:w-4/12 h-[35rem] rounded-[20px] relative p-4">
              {/* header */}

              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex items-center my-2">
                    <div className="rounded-full p-3 ml-3">
                      <div className="w-[60px] h-[60px] con-pro-color rounded-full flex justify-center items-center">
                        {CurrentOrg.logo ? (
                          <div className="bg-bg-primary">
                            <img
                              src={FileUploadService.getImage(CurrentOrg.logo)}
                            />
                          </div>
                        ) : (
                          <p className="font-sp-pro-text-bold uppercase text-2xl text-green ">
                            {CurrentOrg.name.substring(0, 2)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-text-color font-sp-pro-text-bold text-xl">
                        {CurrentOrg.name}
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

              {/* data */}
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
                        className=" w-full h-9 pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                        type="text"
                        name="search"
                        placeholder="Search team member or type an email"
                      />
                      <button
                        onClick={getAllSearchInvite}
                        className="px-4 py-1 text-white bg-primary rounded-md"
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
                  {isLoading ? (
                    <div className="flex justify-center py-5">
                      <PulseLoader color="#F8C400" size={10} />
                    </div>
                  ) : (
                    <>
                      {getSearchInvite.length != 0 &&
                        getSearchInvite.map((users, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center w-full"
                          >
                            <div className="flex items-center gap-4 p-4 ">
                              {users.image != null ? (
                                <>
                                  <div className="font-bold text-lg w-full cursor-pointer">
                                    <img
                                      src={FileUploadService.getImage(
                                        users.image
                                      )}
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
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* modal invite user */}

          {/* Put this part before </body> tag */}
          <ToastContainer transition={Slide} autoClose={1200} />
        </div>
      </main>
    </>
  );
}
