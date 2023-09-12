import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import NotificationService from "../../../redux/services/NotificationService";
import { setAllNotification, setCountCurrentRow, setPageCount, setTotalRow } from "../../../redux/slices/NotificationSlice";
import placeholder_square from "../../../assets/images/placeholder/placeholder_square.jpg";
import moment from "moment";
import UserService from "../../../redux/services/UserService";
import no_data_pic from '../../../assets/images/empty_box.png'
import { Slide, ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sort = [
  {
    id: "",
    name: "Default",
  },
  {
    id: "name",
    name: "Name",
  },
  {
    id: "created_at",
    name: "Created Date",
  },
];

export default function NotificationComponent() {

  const ref = useRef(null);

  const [selectedSort, setSelectedSort] = useState("");
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const orgId = organization.id;
  const [selectedPage, setSelectedPage] = useState(1);
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [itemName, setItemName] = useState("");

  const getAllNotification = useSelector((state) => state.notification.notifications);
  const dispatch = useDispatch();

  let pageCount = useSelector(state => state.notification.pageCount)
  let countCurrentRow = useSelector(state => state.notification.countCurrentRow)
  let totalRow = useSelector(state => state.notification.totalRow)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setSelectedPage(event.selected + 1);
    setI(event.selected * 8 + 1);
    dispatch(setPageCount(Math.ceil(totalRow / 8)));
  };

  const handleGetAllNotification = (page = 1, search = "", sort = "") => {
    if (sort == "Default") {
      sort = ""
    }

    if (ref.current) {
      ref.current.staticStart()
    }

    NotificationService.getAllNotification(orgId, page, 8, search, sort).then((res) => {
      if (res.data.success) {
        dispatch(setAllNotification(res.data.payload))
        dispatch(setTotalRow(res.data.totalData))
        dispatch(setPageCount(Math.ceil(res.data.totalData / 8)))
        dispatch(setCountCurrentRow(res.data.payload.length))
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete()
          }
        }, 500);
      }
    }, err => {
      dispatch(setAllNotification([]))
      dispatch(setTotalRow(0));
      setTimeout(() => {
        if (ref.current) {
          ref.current.complete()
        }
      }, 500);
    });
  };

  const handleApproveUserReq = (val) => {
    setIsApprove(false)
    UserService.approveUserRequests(orgId, val.id).then(res => {
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
    UserService.rejectUserRequest(user.id, organization.id).then(res => {
      if (res.data.success) {
        setIsReject(true)
        toast.error("Rejected !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })
  }

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  const handleInputSearch = (e) => {
    setItemName(e.target.value);
  };

  useEffect(() => {
    handleGetAllNotification(1);
  }, [isApprove, isReject]);

  useEffect(() => {
    if (itemName != null || itemName != "" || selectedSort != null || selectedSort != "") {
      handleGetAllNotification(1, itemName, selectedSort)
    } else {
      handleGetAllNotification(1)
    }
  }, [itemName, selectedSort])

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={3} />

      <main className="overflow-y-auto px-10 py-6 bg-white rounded-xl relative lg:px-10 con-Shadow min-h-[calc(100vh-9rem)]">
        <div className="gap-6 overflow-hidden z-10">
          <div className="lg:flex lg:flex-row md:flex-col sm:flex-col justify-between gap-4 p-5 mb-5 text">
            {/* header */}
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0 text-text-colors">
              <h2 className="text-2xl font-sp-pro-text-semibold text-text-color">
                All <span className="text-pending">List</span> Notification
              </h2>
              <p className="font-sp-pro-text-regular text-sm text-green">
                User Request
              </p>
            </div>

            {/* search */}
            <div className="md:flex md:flex-row justify-center gap-10">
              <div className="mb-4 md:mb-0 xl:mb-0">
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
                                className={`block truncate text-sm w-full md:w-32 lg:w-full xl:w-32 text-left text-text-color ${selectedSort == "Default"
                                  ? "text-black text-opacity-20"
                                  : ""
                                  }`}
                              >
                                <span className="text-black text-opacity-20">
                                  Sort by:{" "}
                                </span>
                                {selectedSort == "Default" ? "" : selectedSort}
                              </span>
                            ) : (
                              <span className="block w-full md:w-32 lg:w-full xl:w-32 text-left truncate text-sm text-black text-opacity-20">
                                Sort by
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

          {getAllNotification.length != 0 ? (
            <div className="flex flex-col min-h-[calc(100vh-19rem)]">
              {/* table */}
              <div className="px-5 z-0 flex-grow overflow-x-scroll">
                <table className="table w-full">
                  <tbody>
                    <tr className="text-sm font-sp-pro-text-semibold text-text-color">
                      <td className="w-2/12  bg-bg-main py-3">No</td>
                      <td className="w-3/12 bg-bg-main py-3">User Name</td>
                      <td className="w-3/12 bg-bg-main py-3 ">Email</td>
                      <td className="w-3/12 bg-bg-main py-3 ">Requested Date</td>
                      <td className="w-2/12 bg-bg-main py-3 text-center">Action</td>
                    </tr>
                    {getAllNotification.map((list, index) => (
                      <tr
                        key={index}
                        className="text-sm font-sp-pro-text-regular text-text-color text-center"
                      >
                        <td className="py-3 text-left pl-5">
                          {index + 1}
                        </td>
                        <td className="text-left py-3">
                          <div className="flex items-center space-x-2">
                            <img
                              className="h-9 rounded-full w-9"
                              src={
                                list.image
                                  ? `https://api.assettracer.net/api/v1/files/getFile?fileName=${list.image}`
                                  : placeholder_square
                              }
                            ></img>
                            <span>{list.name}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex text-blue-600">
                            <span className="w-2.5/12 py-3">{list.email}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="pl-3 text-left">
                            {moment(list.createAt).format("MMM DD YYYY")}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-4 justify-center">
                            <label
                              onClick={() => handleApproveUserReq(list)}
                              className="flex items-center border border-accept cursor-pointer hover:bg-accept hover:bg-opacity-10 text-accept w-[90px] justify-center px-5 py-1 leading-5 rounded-md"
                              aria-label="Edit"
                            >
                              Accept
                            </label>

                            <label
                              onClick={() => handleRejectUserReq(list)}
                              className="flex items-center border border-reject cursor-pointer hover:bg-reject hover:bg-opacity-10 text-reject w-[90px] justify-center px-5 py-1 leading-5 rounded-md"
                              aria-label="Delete"
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
            <div className="text-center w-full col-span-12 h-[calc(100vh-18.5rem)] flex justify-center items-center">
              <div className="mt-[-6rem]">
                <img src={no_data_pic} className="w-2/6 xl:w-3/6 m-auto pb-5" />
                <h2 className="text-2xl text-gray font-sp-pro-text-bold ">
                  No Data
                </h2>
              </div>
            </div>
          )}

          <ToastContainer transition={Slide} autoClose={1200} />
        </div>
      </main >
    </>
  );
}
