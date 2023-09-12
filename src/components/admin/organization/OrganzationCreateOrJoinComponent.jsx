import React, { useEffect, useRef } from "react";
import { Combobox, Listbox } from "@headlessui/react";
import logo from "../../../../src/assets/images/A_Tracer_logo1.png";
import * as Yup from "yup";
// // combobox import
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronUpDownIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import OrganizationService from "../../../redux/services/OrganizationService";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountCurrentRow,
  setOrganizationInvited,
  setPageCount,
  setTotalRow,
} from "../../../redux/slices/OrganizationSlice";
import { useNavigate } from "react-router-dom";
import CreateOrganizatoinComponent from "./popUp/CreateOrganizatoinComponent";
import organization_pic from "../../../assets/images/organization.png";
import ReactPaginate from "react-paginate";
import "../../../style/shadow.css";
import err_pic from "../../../assets/images/false.png";
import suc_pic from "../../../assets/images/success.png";
import moment from "moment/moment";
import FileUploadService from "../../../redux/services/FileUploadService";
import { Slide, ToastContainer, toast } from "react-toastify";
import no_data_pic from "../../../assets/images/empty_box.png";
import LoadingBar from "react-top-loading-bar";
import ReactLoading from "react-loading";

const sort = [
  {
    id: "",
    name: "Default",
  },
  {
    id: "name",
    name: "Organization Name",
  },
  {
    id: "owner",
    name: "Owner",
  },
  {
    id: "createdAt",
    name: "Invited Date",
  },
];

export default function OrganzationCreateOrJoinComponent() {
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const [message, setMessage] = useState();
  const [newData, setNewData] = useState({ code: "" });
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organization.data);
  const item = useSelector((state) => state.organization?.item);
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const navigator = useNavigate();
  const [isShowJoinPopup, setIsShowJoinPopup] = useState(false);
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [i, setIndex] = useState(1);
  const [itemName, setItemName] = useState("");
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false)

  let totalRow = useSelector(state => state.organization.totalRow);
  let countCurrentRow = useSelector(state => state.organization.countCurrentRow);
  let pageCount = useSelector(state => state.organization.pageCount);

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  const handleJoinOrganization = () => {
    setIsLoading(true)
    OrganizationService.joinOrganization(
      newData,
      localStorage.getItem("token")
    ).then(
      (res) => {
        if (res.data?.success) {
          setTimeout(() => {
            setIsShowJoinPopup(true)
            setIsJoinSuccess(true)
            setIsLoading(false)
          }, 500)
        }
      },
      (err) => {
        setTimeout(() => {
          if (err.response.data.detail == "Organization not found") {
            setMessage("Wrong code");
          }
          setIsShowJoinPopup(true)
          setIsJoinSuccess(false)
          setIsLoading(false)
        }, 500)
      }
    );
  };

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleInputSearch = (e) => {
    setItemName(e.target.value);
  };

  const formik = useFormik({
    initialValues: newData,
    validationSchema: Yup.object().shape({
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (val, { resetForm }) => {
      handleJoinOrganization();
      resetForm((val = { code: "" }));
      setNewData({ code: "" });
    },
  });

  // ======================= Invite User =================
  const getOrgInvited = useSelector((state) => state.organization.orgInvited);

  const getAllOrgInvited = (page = 1, search = "", sort = "") => {

    if (ref.current) {
      ref.current.staticStart()
    }

    if (sort == "Default") {
      sort = ""
    }

    OrganizationService.getOrganizationInvited(page, 8, search, sort).then((res) => {
      if (res.data?.success) {
        dispatch(setOrganizationInvited(res.data.payload));
        dispatch(setTotalRow(res.data.totalData));
        dispatch(setPageCount(Math.ceil(res.data.totalData / 8)));
        dispatch(setCountCurrentRow(res.data.payload.length));

        setTimeout(() => {
          if (ref.current) {
            ref.current.complete()
          }
        }, 500);
      }
    }, err => {
      dispatch(setOrganizationInvited([]));
      setTimeout(() => {
        if (ref.current) {
          ref.current.complete()
        }
      }, 500);
    });
  };


  useEffect(() => {

    const interval = setInterval(() => {
      OrganizationService.getOrganizationInvited().then((res) => {
        if (res.data?.success) {
          dispatch(setOrganizationInvited(res.data.payload));
          dispatch(setTotalRow(res.data.totalData));
          dispatch(setPageCount(Math.ceil(res.data.totalData / 8)));
          dispatch(setCountCurrentRow(res.data.payload.length));
        }
      }, err => {
        dispatch(setOrganizationInvited([]));
      });
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // ================== Accept Organization Invited =================
  const handleAcceptOrg = (orgId) => {
    OrganizationService.acceptionInvite(orgId).then((res) => {
      console.log(res)
      if (res.data?.success) {
        getAllOrgInvited();
        toast.success(" You have accepted !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  // ================== Reject Organization Invited =================
  const handleRejectOrg = (orgId) => {
    OrganizationService.rejectInvitation(orgId).then((res) => {
      if (res.data?.success) {
        getAllOrgInvited();
        toast.error(" You have rejected !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    getAllOrgInvited();
  }, []);

  useEffect(() => {
    if (itemName != null || itemName != "" || selectedSort != null || selectedSort != "") {
      getAllOrgInvited(1, itemName, selectedSort);
    }
    else {
      getAllOrgInvited(1)
    }
  }, [itemName, selectedSort]);

  const handlePageClick = (event) => {
    setSelectedPage(event.selected + 1);
    setI(event.selected * 8 + 1);
    dispatch(setPageCount(Math.ceil(totalRow / 8)));
  };

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />
      <main className="overflow-y-auto pb-4">
        <div className="gap-6 bg-white rounded-xl overflow-hidden mb-5 p-10 px-5 md:px-10 lg:px-20 con-Shadow">
          <div className="grid grid-cols-2 w-full gap-3 md:gap-8 py-4">
            <label
              htmlFor="create-organization"
              onClick={() => handleUpdateSuccess(false)}
              className="min-h-[9rem] col-span-2 md:col-span-1 px-10 mb-4 hover:border-green hover:border-opacity-40 hover:bg-green hover:bg-opacity-10 md:mb-0 border border-bg-primary outline-none text-center rounded-xl flex justify-center cursor-pointer shadow-md items-center"
            >
              <div>
                <PlusCircleIcon className="w-12 h-12 text-green rounded-full m-auto mb-2" />
                <p className="text-lg font-sp-pro-text-bold text-green">
                  Add Organization
                </p>
              </div>
            </label>
            <div className="border col-span-2 md:col-span-1 border-bg-primary outline-none text-green text-center py-6 rounded-md shadow-md px-8">
              <div className="flex gap-6">
                <img src={organization_pic} className="w-16 h-16 mt-2" />

                <form
                  onSubmit={formik.handleSubmit}
                  className="flex-grow justify-start"
                >
                  <div className="text-left">
                    <label className="block text-md ml-1 leading-6 text-secondary font-sp-pro-text-regular">
                      Join organization with a code
                    </label>
                    <input
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      value={newData.code}
                      name="code"
                      type="text"
                      placeholder="Enter code..."
                      className="relative text-secondary focus:border-primary px-3 w-full outline-none mt-2 border rounded-lg p-2 border-slate-200 bg-bg-main "
                    />
                    {formik.touched.code && formik.errors?.code ? (
                      <p className="text-reject font-sp-pro-text-regular text-sm mt-2 pl-1">
                        {formik.errors.code}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full flex justify-start">
                    {isLoading ? <>
                      <button
                        type="submit"
                        className="mt-3 rounded text-center hover:bg-opacity-80 bg-primary px-10 py-1.5 text-sm font-sp-pro-text-medium text-white cursor-pointer"
                      >
                        <ReactLoading
                          type="spin"
                          color="#FFFFFF"
                          width={19}
                          height={19}
                        />
                      </button>

                    </> : <>
                      <button
                        type="submit"
                        className="mt-3 rounded text-center hover:bg-opacity-80 bg-primary px-10 py-1.5 text-sm font-sp-pro-text-medium text-white cursor-pointer"
                      >
                        Join
                      </button>
                    </>}

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <CreateOrganizatoinComponent
          className="modal"
        />
      </main>
      {isShowJoinPopup && (
        <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular bg-none right-0 bottom-0 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 py-10 w-72 z-10 border border-bg-primary shadow-xl">
            <div className="flex flex-col justify-end">
              <div className="relative w-40 m-auto pb-7">
                <img
                  src={isJoinSuccess ? suc_pic : err_pic}
                  alt="Signup Picture"
                  className="w-28 m-auto"
                />
              </div>
              <p
                className={`text-2xl text-center font-sp-pro-text-semibold ${isJoinSuccess ? "text-custom-blue" : "text-custom-red"
                  }`}
              >
                {isJoinSuccess ? "Waiting For Approve" : ""}
              </p>
              <p className="text-sm font-sp-pro-text-regular text-center text-text-color mt-3">
                {isJoinSuccess ? (
                  <>You cannot join organization until admin approve</>
                ) : (
                  <>
                    {message != null
                      ? message
                      : "You already joined this organization code"}
                  </>
                )}
              </p>
              <button
                onClick={() => setIsShowJoinPopup(false)}
                className={`${isJoinSuccess ? "bg-custom-blue" : "bg-custom-red"
                  } text-white  mt-8 py-2 px-4 bg-bl rounded-2xl`}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="px-4 lg:px-10 py-6 bg-white rounded-2xl relative overflow-hidden">
        <div className="gap-6 overflow-hidden z-10">
          <div className="xl:flex xl:flex-row md:flex-col sm:flex-col justify-between gap-4 p-5 mb-5 text">
            {/* header */}
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0">
              <h2 className="text-2xl font-sp-pro-text-semibold">
                All <span className="text-primary">Organization</span> Invited
              </h2>
            </div>

            {/* search */}
            <div className="md:flex md:flex-row justify-start gap-10">
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
                    value={itemName}
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
                                className={`block truncate text-sm w-full md:w-32 lg:w-full xl:w-32 text-left text-text-color ${selectedSort == "Default"
                                  ? "text-black text-opacity-20"
                                  : ""
                                  }`}
                              >
                                <span className="text-black text-opacity-20">
                                  Sort by:{" "}
                                </span>
                                {selectedSort == "Default" ? "" : selectedSort == "name" ? "Organization Name" : selectedSort == "owner" ? "Owner" : selectedSort == "createdAt" ? "Invited Date" : ""}
                              </span>
                            ) : (
                              <span className="block w-full md:w-32 lg:w-full xl:w-32 text-left truncate text-sm text-black text-opacity-20">
                                Sort by{" "}
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
                                    `relative cursor-pointer select-none py-2 px-5 text-text-color ${active
                                      ? "bg-custom-yellow-showdow-light"
                                      : ""
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
                                          className={`${active
                                            ? "text-primary"
                                            : "text-primary"
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

          {getOrgInvited.length != 0 ? (
            <div className="flex flex-col">
              {/* table */}
              <div className="px-5 z-0 flex-grow overflow-x-scroll">
                <table className="table w-full">
                  <tbody className="">
                    <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none">
                      <td className="w-1/12 bg-bg-main py-3 text-start">No</td>
                      <td className="w-3/12 bg-bg-main py-3 text-start pl-10">
                        Organization Name
                      </td>
                      <td className="w-2/12 bg-bg-main py-3 text-start">
                        Owner
                      </td>
                      <td className="w-2/12 bg-bg-main py-3 text-center">
                        Invited Date
                      </td>
                      <td className="w-2/12 bg-bg-main py-3 text-center">
                        Action
                      </td>
                    </tr>
                    {getOrgInvited.map((list, index) => (
                      <tr
                        key={index}
                        className="text-sm font-sp-pro-text-regular text-center"
                      >
                        <td className="py-3 text-start pl-5">{index + i}</td>
                        <td className="py-3 pl-10">
                          <div className="flex items-center">
                            {list.image ?
                              <div className="relative  mr-3 w-8 h-8 ">
                                <img
                                  src={FileUploadService.getImage(list.logo)}
                                  loading="lazy"
                                />
                              </div>
                              :
                              <div className="relative mr-3 w-8 h-8 bg-green rounded-full flex justify-center items-center text-white">
                                {list.organizationName.substring(0, 1)}
                              </div>
                            }
                            <div>{list.organizationName}</div>
                          </div>
                        </td>
                        <td className="py-3 text-start">{list.owner}</td>

                        <td className="py-3">
                          {moment(list.createdAt).format("DD MMM YYYY, hh:mm A")}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2 justify-center">
                            <label
                              onClick={() => handleAcceptOrg(list.id)}
                              htmlFor="modalEdit"
                              className="flex items-center border bg-accept bg-opacity-10 border-accept text-accept w-[90px] justify-center px-5 py-1 hover:bg-green hover:bg-opacity-10 cursor-pointer leading-5 rounded-full"
                              aria-label="Edit"
                            >
                              Accept
                            </label>
                            <label
                              onClick={() => handleRejectOrg(list.id)}
                              htmlFor="modalEdit"
                              className="flex items-center border bg-reject bg-opacity-10 border-reject text-reject w-[90px] justify-center px-5 py-1 hover:bg-reject hover:bg-opacity-10 cursor-pointer leading-5 rounded-full"
                              aria-label="Edit"
                            >
                              Reject
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="w-full flex justify-between items-center text-sm  font-sp-pro-text-medium text-gray-500 flex-grow-0 px-7 mt-3 h-10">
                <div className="font-sp-pro-text-regular opacity-90">
                  Showing data 1 to {countCurrentRow} of {totalRow} entries
                </div>
                <div id="react-paginate">
                  <ReactPaginate
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center w-full col-span-12 h-[calc(100vh-17rem)] flex justify-center items-center">
              <div className="mt-[-6rem]">
                <img src={no_data_pic} className="w-2/6 xl:w-5/12 m-auto pb-5" />
                <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                  No Data
                </h2>
              </div>
            </div>
          )}
          <ToastContainer transition={Slide} autoClose={1200} />
        </div>
      </main>
    </>
  );
}
