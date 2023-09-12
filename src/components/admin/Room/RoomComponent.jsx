import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ItemDetailService from "../../../redux/services/ItemDetailService";
import { setItemDetails } from "../../../redux/slices/ItemDetailSlice";
import placeholder_square from "../../../assets/images/placeholder/yellow_placeholder.svg";
import FileUploadService from "../../../redux/services/FileUploadService";
import RoomAddComponent from "./popUpRoom/RoomAddComponent";
import RoomService from "../../../redux/services/RoomService";
import { TbListDetails } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import DetailComponent from "./popUpRoom/DetailComponent";
import {
  setCountCurrentRow,
  setPageCount,
  setRoom,
  setRoomDetail,
  setRooms,
  setTotalRow,
} from "../../../redux/slices/RoomSlice";
import RoomUpdateComponent from "./popUpRoom/RoomUpdateComponent";
import RoomDeleteComponent from "./popUpRoom/RoomDeleteComponent";
import { RiCloseFill } from "react-icons/ri";
import trash_ico from "../../../assets/images/trash.png";
import no_data_pic from "../../../assets/images/empty_box.png";
import { BiMessageSquareEdit } from "react-icons/bi";
import LoadingBar from "react-top-loading-bar";

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
    id: "type",
    name: "Room Type",
  },
  {
    id: "floor",
    name: "Floor",
  },
];

export default function RoomComponent() {
  const ref = useRef(null);
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const [selectedPage, setSelectedPage] = useState(1);
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const dispatch = useDispatch();
  const getAllRooms = useSelector((state) => state.room.rooms);
  const [i, setI] = useState(1);

  let totalRow = useSelector((state) => state.room.totalRow);
  let countCurrentRow = useSelector((state) => state.room.countCurrentRow);
  let pageCount = useSelector((state) => state.room.pageCount);
  let room = useSelector((state) => state.room.room);

  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const handleIsCreateSuccess = (val) => {
    setIsCreateSuccess(val);
  };

  const handleIsUpdateSuccess = (val) => {
    setIsUpdateSuccess(val);
  };

  //combobox
  const [itemName, setItemName] = useState();

  const handleGetAllRooms = (selectedPage = 1, search = "", sort = "") => {
    if (ref.current) {
      ref.current.staticStart();
    }

    if (sort == "Detault") {
      sort = "";
    }

    RoomService.getAllRooms(
      organization.id,
      selectedPage,
      8,
      search,
      sort
    ).then(
      (res) => {
        if (res.data.success) {
          dispatch(setRooms(res.data.payload));
          dispatch(setTotalRow(res.data.totalData));
          dispatch(setPageCount(Math.ceil(res.data.totalData / 8)));
          dispatch(setCountCurrentRow(res.data.payload.length));
          setTimeout(() => {
            if (ref.current) {
              ref.current.complete();
            }
          }, 500);
        }
      },
      (err) => {
        dispatch(setRooms([]));
        setTotalRow(1);
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete();
          }
        }, 500);
      }
    );
  };

  // pagination
  const handlePageClick = (event) => {
    setSelectedPage(event.selected + 1);
    setI(event.selected * 8 + 1);
    dispatch(setPageCount(Math.ceil(totalRow / 8)));
  };

  useEffect(() => {
    if (itemName != null || selectedSort != null) {
      setSelectedPage(1);
      handleGetAllRooms(1, itemName, selectedSort);

      if (selectedPage != 1) {
        document.getElementsByClassName("page-link")[1].click();
      }
    }
  }, [itemName, selectedSort]);

  useEffect(() => {
    if (isCreateSuccess) {
      handleGetAllRooms(1);
      if (selectedPage != 1) {
        document.getElementsByClassName("page-link")[1].click();
      }
    }

    setIsCreateSuccess(false);
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      handleGetAllRooms(selectedPage);
    }
    setIsUpdateSuccess(false);
  }, [isUpdateSuccess]);

  useEffect(() => {
    handleGetAllRooms(1);
    dispatch(setPageCount(Math.ceil(totalRow / 8)));
    if (selectedPage != 1) {
      document.getElementsByClassName("page-link")[1].click();
    }
  }, []);

  useEffect(() => {
    handleGetAllRooms(selectedPage);
    dispatch(setPageCount(Math.ceil(totalRow / 8)));
  }, [selectedPage]);

  const handleInputSearch = (e) => {
    setItemName(e.target.value);
  };

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  // Get image detail
  const handleShowRoomDetail = (item) => {
    dispatch(setRoomDetail(item));
  };

  const handleShowRoom = (val) => {
    dispatch(setRoom(val));
  };

  const handleDeleteRoom = () => {
    RoomService.deleteRoom(room.id).then((res) => {
      if (res.data.success) {
        handleGetAllRooms(1);
        if (selectedPage != 1) {
          document.getElementsByClassName("page-link")[1].click();
        }
        document.getElementById("delete-room").click();
      }
    });
  };

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />
      <main className="px-10 py-6 bg-white rounded-xl relative lg:px-10 con-Shadow min-h-[calc(100vh-9rem)]">
        <div className="gap-6 overflow-hidden z-10">
          <div className="flex lg:flex-col lt-15:flex-row md:flex-col sm:flex-col justify-between gap-4 p-5 mb-5 text">
            {/* header */}
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0">
              <h2 className="text-2xl font-sp-pro-text-semibold">
                All <span className="text-pending">Rooms</span> Management
              </h2>
              <p className="font-sp-pro-text-regular text-sm text-green">
                Active Rooms
              </p>
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
                    className="placeholder:text-black placeholder:text-opacity-20 w-full pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:text-gray-200 focus:placeholder-gray-500   focus:outline-none"
                    type="text"
                    name="search"
                    placeholder="Search..."
                    onInput={handleInputSearch}
                  />
                </div>
              </div>
              <div className="mb-4 md:mb-0 lg:mb-0 xl:mb-0">
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
                                className={`block truncate text-sm w-full md:w-32 lg:w-full xl:w-32 text-left text-text-color ${
                                  selectedSort == "Default"
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
                                    `relative cursor-pointer select-none py-2 px-5 text-text-color ${
                                      active
                                        ? "bg-custom-yellow-showdow-light"
                                        : ""
                                    }`
                                  }
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        } ${
                                          index == 0
                                            ? "text-black text-opacity-20"
                                            : ""
                                        }`}
                                      >
                                        {val.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${
                                            active
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

              {/* add */}
              {organization.roleName == "ADMIN" ? (
                <div>
                  <div className="block w-max">
                    <label
                      htmlFor="create-room"
                      className="border ml-auto cursor-pointer border-yellow text-yellow p-1.5 pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase hover:bg-custom-yellow-showdow-light"
                    >
                      <BsPlus className="w-6 h-6" />
                      &nbsp; Add New Room
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="block w-max">
                    <label className="border border-opacity-40 w-max mr-auto md:min-w-max cursor-pointer border-yellow text-yellow  text-opacity-50 hover:bg-opacity-10 p-[5px] pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase">
                      <BsPlus className="w-6 h-6" />
                      &nbsp; Add New Room
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {getAllRooms.length != 0 ? (
            <div className="flex flex-col min-h-[calc(100vh-19rem)]">
              {/* table */}
              <div className="px-5 z-0 flex-grow overflow-x-scroll">
                <table className="table w-full ">
                  <tbody>
                    <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none text-text-color">
                      <td className="w-1/12 bg-bg-main py-3">No</td>
                      <td className="w-2/12 bg-bg-main py-3">Room Name</td>
                      <td className="w-2/12 bg-bg-main py-3">Type</td>
                      <td className="w-2/12 bg-bg-main py-3">Floor</td>
                      <td className="w-2/12 bg-bg-main py-3">Description</td>
                      <td className="w-1/12 bg-bg-main py-3 text-center">
                        Action
                      </td>
                    </tr>
                    {getAllRooms.map((list, index) => (
                      <tr key={index}>
                        <td className="py-3">{index + i}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-3 text-text-color font-sp-pro-text-regular text-md">
                            <span className="w-8 h-8 overflow-hidden rounded-lg flex items-center justify-center  text-red-500 ">
                              <img
                                src={
                                  list.image
                                    ? FileUploadService.getImage(list.image)
                                    : placeholder_square
                                }
                                loading="lazy"
                                className="rounded-full h-full w-full"
                              />
                            </span>
                            {list.name}
                          </div>
                        </td>
                        <td className="py-3 ">
                          {list.type != "" && list.type != null ? (
                            list.type
                          ) : (
                            <span className="ml-2">...</span>
                          )}
                        </td>
                        <td className="py-3">
                          {list.floor != "" && list.floor != null ? (
                            list.floor
                          ) : (
                            <span className="ml-2">...</span>
                          )}
                        </td>
                        <td className=" py-3">
                          {" "}
                          <div className="w-40 truncate">
                            {list.description != "" &&
                            list.description != null ? (
                              list.description
                            ) : (
                              <span className="ml-8">...</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 text-center">
                          <Listbox as="div">
                            {({ open }) => (
                              <>
                                <div className="relative">
                                  <span className="">
                                    <Listbox.Button className="h-7 w-7 p-1 text-gray-500 bg-slate-100 rounded-full hover:bg-bg-primary-strock cursor-pointer">
                                      <EllipsisVerticalIcon />
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
                                      className="border border-bg-primary mt-1  bg-white shadow-md rounded-md absolute right-5 z-50 w-48 p-2"
                                    >
                                      <Listbox.Option className="flex flex-col">
                                        <label
                                          htmlFor="detail"
                                          onClick={() =>
                                            handleShowRoomDetail(list)
                                          }
                                          className={`cursor-pointer text-text-color hover:bg-bg-primary hover:bg-opacity-50 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <TbListDetails /> View Room Detail
                                          </span>
                                        </label>
                                        {organization.roleName == "ADMIN" &&
                                        list.usage == 0 ? (
                                          <>
                                            <label
                                              htmlFor="edit-room"
                                              onClick={() =>
                                                handleShowRoom(list)
                                              }
                                              className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                            >
                                              <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                                <BiMessageSquareEdit /> Edit
                                              </span>
                                            </label>
                                            <label
                                              htmlFor="delete-room"
                                              onClick={() =>
                                                handleShowRoom(list)
                                              }
                                              className={`cursor-pointer text-reject hover:bg-reject hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full  text-gray-900 rounded-md `}
                                            >
                                              <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                                <FiTrash2 /> Delete
                                              </span>
                                            </label>
                                          </>
                                        ) : (
                                          <>
                                            <label
                                              htmlFor="edit-room"
                                              onClick={() =>
                                                handleShowRoom(list)
                                              }
                                              className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                            >
                                              <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                                <BiMessageSquareEdit /> Edit
                                              </span>
                                            </label>
                                            <label
                                            //   htmlFor="delete-room"
                                            //   onClick={() =>
                                            //     handleShowRoom(list)
                                            //   }
                                              className={`cursor-pointer text-reject opacity-50 inline-block select-none relative py-2 p-4 w-full  text-gray-900 rounded-md `}
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
        </div>
      </main>

      <input type="checkbox" id="delete-room" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div className="absolute right-4 top-3 hover:bg-bg-primary w-8 h-8 flex justify-center rounded-full items-center cursor-pointer">
            <label htmlFor="delete-room">
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
                Are you sure, you want to delete this room?
              </p>
            </div>
          </div>
          <br />
          <div className="flex justify-end space-x-4">
            <label
              htmlFor="delete-room"
              className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-90 border border-[#D0D5DD] flex justify-center items-center gap-1"
            >
              Cancel
            </label>
            <label
              onClick={handleDeleteRoom}
              className="bg-opacity-10 rounded-md cursor-pointer bg-reject border border-reject py-2 px-5 text-sm font-sp-pro-text-medium text-reject flex justify-center items-center gap-1"
            >
              Delete
            </label>
          </div>
        </div>
      </div>

      <DetailComponent className="modal" />
      <RoomAddComponent
        className="modal"
        handleIsCreateSuccess={handleIsCreateSuccess}
      />
      <RoomUpdateComponent
        className="modal"
        handleIsUpdateSuccess={handleIsUpdateSuccess}
      />
    </>
  );
}
