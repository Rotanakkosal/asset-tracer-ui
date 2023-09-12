import React, { Fragment, useEffect, useRef, useState } from "react";
//import combobox
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import ReactPaginate from "react-paginate";
import avatar01 from "../../../assets/images/tracking/chair.png";
import NormalCategoryService from "../../../redux/services/NormalCategoryService";
import RoomService from "../../../redux/services/RoomService";
import AssetService from "../../../redux/services/AssetService";
import chair from "../../../assets/icon/normal_category/chair.svg";
import laptop from "../../../assets/icon/normal_category/laptop.svg";
import paper from "../../../assets/icon/normal_category/paper.svg";
import {
  setAsset,
  setAssets,
  setCountCurrentRow,
  setPageCount,
  setTotalRow,
  setUpdateAsset,
} from "../../../redux/slices/AssetSlice";
import { useDispatch, useSelector } from "react-redux";
import ViewDetailComponent from "./ViewDetailComponent";
import no_data_pic from "../../../assets/images/empty_box.png";
import LoadingBar from "react-top-loading-bar";
import placeholder from "../../../assets/images/placeholder/blue_placeholder.svg";
import FileUploadService from "../../../redux/services/FileUploadService";
import { BiMessageSquareEdit, BiRevision, BiRotateLeft } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import AssetUpdateComponent from "./AssetUpdateComponent";
const status = [
  { id: "", name: "Default" },
  { id: "in_stock", name: "In Stock" },
  { id: "in_used", name: "In Used" },
  { id: "damage", name: "Damaged" },
  { id: "donated", name: "Donated" },
  { id: "lost", name: "Lost" },
  { id: "broken", name: "Broken" },
];

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

export default function TrackingComponent() {
  const dispatch = useDispatch();
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const orgId = organization.id;
  const assets = useSelector((state) => state.asset.assets);
  let updateAsset = useSelector(state => state.asset.updateAsset)
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)

  const handleIsUpdateSuccess = (val) => {
    setIsUpdateSuccess(val)
  }

  const [itemName, setItemName] = useState("");
  const [isClear, setIsClear] = useState(false)

  // combo box room
  const [roomName, setRoomName] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [queryRoom, setQueryRoom] = useState("");
  const [i, setI] = useState(1);
  const ref = useRef(null);

  let pageCount = useSelector((state) => state.asset.pageCount);
  let totalRow = useSelector((state) => state.asset.totalRow);
  let countCurrentRow = useSelector((state) => state.asset.countCurrentRow);

  const handleSelectedRoom = (val) => {
    if (val.name != "Default") {
      setSelectedRoom(val);
      setSelectedRoomName(val.name);
    } else {
      setSelectedRoomName("");
      setSelectedRoom({});
    }
  };

  const filteredRoom =
    queryRoom === ""
      ? roomName
      : roomName.filter((list) =>
        list.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryRoom.toLowerCase().replace(/\s+/g, ""))
      );

  const [normalCategoryName, setNormalCategoryName] = useState([]);
  const [selectedNormalCategory, setSelectedNormalCategory] = useState({});
  const [selectedNormalCategoryName, setSelectedNormalCategoryName] = useState("");
  const [queryNormalCategory, setQueryNormalCategory] = useState("");

  const handleSetSeletedNormalCategory = (val) => {
    if (val.name != "Default") {
      setSelectedNormalCategory(val);
      setSelectedNormalCategoryName(val.name);
    } else {
      setSelectedNormalCategoryName("");
      setSelectedNormalCategory({});
    }
  };

  const [selectedStatus, setSelectedStatus] = useState(status[0].name);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    if (ref.current) {
      ref.current.staticStart();
    }
    NormalCategoryService.getAllNormalCategoryName(orgId).then((res) => {
      if (res.data.success) {
        setNormalCategoryName([
          { id: "", name: "Default" },
          ...res.data.payload,
        ]);
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete();
          }
        }, 500);
      }
    });

    RoomService.getAllRoomByOrgId(orgId).then((res) => {
      if (res.data.success) {
        setRoomName([{ id: "", name: "Default" }, ...res.data.payload]);
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete();
          }
        }, 500);
      }
    });
  }, []);

  useEffect(() => {
    handleGetAllAssets(selectedPage, "", "", "", "");
  }, [selectedPage]);

  const filteredNormalCategory =
    queryNormalCategory === ""
      ? normalCategoryName
      : normalCategoryName.filter((list) =>
        list.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryNormalCategory.toLowerCase().replace(/\s+/g, ""))
      );

  const handlePageClick = (event) => {
    setSelectedPage(event.selected + 1);
    getAllSuperCategory(event.selected + 1);
    setI(event.selected * 10 + 1);
  };

  const handleInputSearch = (e) => {
    setItemName(e.target.value);
  };

  const handleSelectedStatus = (val) => {
    if (val != "Default") {
      setSelectedStatus(val);
    } else {
      setSelectedStatus(null);
    }
  };

  const handleGetAllAssets = (
    page = 1,
    assetName = "",
    status = "",
    room = "",
    normalCategoryName = "",
    sort = ""
  ) => {
    if (ref.current) {
      ref.current.staticStart();
    }

    if (status == "Default") {
      status = "";
    }

    AssetService.getAllAssets(
      orgId,
      page,
      8,
      assetName,
      status,
      room,
      normalCategoryName,
      sort
    ).then(
      (res) => {
        if (res.data.success) {
          console.log(res);
          dispatch(setAssets(res.data.payload));
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
        dispatch(setAssets([]));
        dispatch(setTotalRow(0));
        setTimeout(() => {
          if (ref.current) {
            ref.current.complete();
          }
        }, 500);
      }
    );
  };

  useEffect(() => {
    handleGetAllAssets(1);
  }, []);

  useEffect(() => {

    if (isUpdateSuccess) {
      handleGetAllAssets(selectedPage)
    }

    setIsUpdateSuccess(false)
  }, [isUpdateSuccess])

  useEffect(() => {
    if (
      itemName != null ||
      itemName != "" ||
      selectedRoomName != null ||
      selectedRoomName != "" ||
      selectedNormalCategoryName != null ||
      selectedNormalCategoryName != "" ||
      selectedStatus != null ||
      selectedStatus != ""
    ) {
      handleGetAllAssets(
        1,
        itemName,
        selectedStatus,
        selectedRoomName,
        selectedNormalCategoryName
      );
    } else {
      handleGetAllAssets(1);
    }

    dispatch(setPageCount(Math.ceil(totalRow / 8)));
  }, [itemName, selectedStatus, selectedRoomName, selectedNormalCategoryName]);

  const clearInput = () => {
    setSelectedStatus("Default")
    setSelectedNormalCategoryName("")
    setSelectedRoomName("")
    setItemName("")
    setSelectedNormalCategory({ id: "", name: "" })
    setSelectedRoom({ id: "", name: "" })
  }

  return (
    <>
      <LoadingBar color="#F8C400" ref={ref} height={5} shadow={true} />
      <main className="overflow-y-auto px-10 py-6 bg-white rounded-xl relative lg:px-10 con-Shadow min-h-[calc(100vh-9rem)]">
        <div className="gap-6 overflow-hidden z-10">
          <div className="flex-col justify-between gap-4 p-5 text">
            <div className="md:pb-0 sm:pb-2 min-w-max mb-4">
              <h2 className="text-2xl font-sp-pro-text-semibold">
                All <span className="text-primary">Tracking</span>
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-x-10 gap-y-5">
              <div className="col-span-4 md:col-span-2 xl:col-span-1">
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
                    className="w-full placeholder-black placeholder-opacity-20 pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                    type="text"
                    name="search"
                    value={itemName}
                    onInput={handleInputSearch}
                    placeholder="Search..."
                  />
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 xl:col-span-1 z-50">
                <Combobox
                  value={selectedNormalCategory}
                  onChange={handleSetSeletedNormalCategory}
                >
                  <div className="relative z-20">
                    <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                      <Combobox.Input
                        className={`text-text-color w-full placeholder-black placeholder-opacity-20 border-[#E1E9EE] border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm  outline-none focus:border-primary`}
                        displayValue={(list) => list.name}
                        onChange={(event) =>
                          setQueryNormalCategory(event.target.value)
                        }
                        placeholder="Select Normal Category"
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
                      afterLeave={() => setQueryNormalCategory("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredNormalCategory.length === 0 &&
                          queryNormalCategory !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                            Nothing found.
                          </div>
                        ) : (
                          filteredNormalCategory.map((list, index) => (
                            <Combobox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""
                                }`
                              }
                              value={list}
                            >
                              {list.name == "Default" ? (
                                <span className="text-black text-opacity-20">
                                  {list.name}
                                </span>
                              ) : (
                                list.name
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div className="col-span-4 md:col-span-2 xl:col-span-1 z-30">
                <Combobox
                  value={selectedRoom}
                  onChange={handleSelectedRoom}
                  className="z-20"
                >
                  <div className="relative z-20">
                    <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                      <Combobox.Input
                        className={`text-text-color w-full placeholder-black placeholder-opacity-20 border-[#E1E9EE] border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm  outline-none focus:border-primary`}
                        displayValue={(list) => list.name}
                        onChange={(event) => setQueryRoom(event.target.value)}
                        placeholder="Select Room"
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
                        {filteredNormalCategory.length === 0 &&
                          queryNormalCategory !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                            Nothing found.
                          </div>
                        ) : (
                          filteredRoom.map((list, index) => (
                            <Combobox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""
                                }`
                              }
                              value={list}
                            >
                              {list.name == "Default" ? (
                                <span className="text-black text-opacity-20">
                                  {list.name}
                                </span>
                              ) : (
                                list.name
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div className="col-span-4 md:col-span-2 xl:col-span-1 z-20">
                <Listbox
                  as="div"
                  value={selectedStatus}
                  onChange={handleSelectedStatus}
                >
                  {({ open }) => (
                    <>
                      <div className="relative z-30">
                        <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                          <Listbox.Button className="w-full border-[#E1E9EE] border rounded-lg bg-[#F9FBFF] py-2 pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary">
                            {selectedStatus ? (
                              <span
                                className={`block truncate text-sm w-full md:w-32 lg:w-full xl:w-32 text-left text-text-color ${selectedStatus == "Default"
                                  ? "text-black text-opacity-20"
                                  : ""
                                  }`}
                              >
                                <span className="text-black text-opacity-20">
                                  Status:{" "}
                                </span>
                                {selectedStatus == "Default"
                                  ? ""
                                  : selectedStatus == "in_stock"
                                    ? "In Stock"
                                    : selectedStatus == "in_used"
                                      ? "In Used"
                                      : selectedStatus == "damaged"
                                        ? "Damaged"
                                        : selectedStatus == "donated"
                                          ? "Donated"
                                          : selectedStatus == "lost"
                                            ? "Lost"
                                            : selectedStatus == "broken"
                                              ? "Broken"
                                              : ""}
                              </span>
                            ) : (
                              <span className="block w-full md:w-32 lg:w-full xl:w-32 text-left truncate text-sm text-black text-opacity-20">
                                Status
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
                            {status.length == 0 ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                Nothing found.
                              </div>
                            ) : (
                              status.map((val, index) => (
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
                                        className={`block truncate ${selected
                                          ? "font-medium"
                                          : "font-normal"
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
            {itemName != "" || selectedStatus != "Default" || selectedNormalCategoryName != "" || selectedRoomName != "" ?
              <button onClick={clearInput} className="mt-3 text-reject flex justify-center items-center gap-x-1 bg-reject bg-opacity-20 rounded-full py-0.5 px-3 border border-reject"><FiX /> Clear All</button>
              : null}
          </div>

          {assets.length != 0 ? (
            <div className="flex flex-col min-h-[calc(100vh-19rem)]">
              {/* table */}
              <div className="px-5 z-0 flex-grow overflow-x-scroll">
                <table className="table w-full">
                  <tbody className="">
                    <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none">
                      <td className="pr-10 bg-bg-main py-3">No</td>
                      <td className="w-2/12 bg-bg-main py-3">Asset Name</td>
                      <td className="w-2/12 bg-bg-main py-3">Label Code</td>
                      <td className="w-2/12 bg-bg-main py-3">Category</td>
                      <td className="w-2/12 bg-bg-main py-3 text-center">Status</td>
                      <td className="w-2/12 bg-bg-main py-3">Owner</td>
                      <td className="w-2/12 bg-bg-main py-3">Room</td>
                      <td className="w-1/12 bg-bg-main py-3 text-center">
                        Action
                      </td>
                    </tr>
                    {assets.map((list, index) => (
                      <tr
                        key={index}
                        className="text-sm font-sp-pro-text-regular"
                      >
                        <td className="py-3 ">{index + i}</td>
                        <td className="py-3">
                          <div className="flex items-center justify-start gap-2">
                            <div className="relative w-8 h-8 ">
                              {list.itemDetail?.image ? (
                                <img
                                  src={FileUploadService.getImage(
                                    list.itemDetail?.image
                                  )}
                                  loading="lazy"
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <img
                                  src={placeholder}
                                  alt=""
                                  className="w-7 h-7 "
                                />
                              )}
                            </div>
                            <div>{list.itemDetail?.name}</div>
                          </div>
                        </td>
                        <td className="py-3">{list.labelCode}</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-start gap-1">
                            <div className="relative w-8 h-8 ">
                              {list.itemDetail?.normalCategoryIcon != "" ? (
                                <img
                                  className="h-9 rounded-full w-9"
                                  src={
                                    list.itemDetail.normalCategoryIcon == "paper.svg"
                                      ? paper
                                      : list.itemDetail?.normalCategoryIcon == "laptop.svg"
                                        ? laptop
                                        : list.itemDetail?.normalCategoryIcon == "chair.svg"
                                          ? chair
                                          : FileUploadService.getImage(
                                            list.itemDetail?.normalCategoryIcon
                                          )
                                  }
                                />
                              ) : (

                                <img
                                  src={placeholder}
                                  alt=""
                                  className="w-7 h-7 "
                                />
                              )}
                            </div>
                            <div>{list.itemDetail?.normalCategoryName}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-center">
                            <label
                              htmlFor="modalEdit"
                              className={`flex items-center border bg-opacity-10 justify-center px-5 py-1 cursor-pointer leading-5 rounded-full ${list.status == "in_stock"
                                ? "bg-green border-green text-green"
                                : list.status == "in_used"
                                  ? "bg-blue-500 border-blue-500 text-blue-500"
                                  : list.status == "damage"
                                    ? "bg-[#ffcb03] border-[#ffcb03] text-[#ffcb03]"
                                    : list.status == "broken"
                                      ? "bg-[#ff585f] border-[#ff585f] text-[#ff585f]"
                                      : list.status == "lost"
                                        ? "bg-gray border-gray text-gray"
                                        : ""
                                }`}
                              aria-label="Edit"
                            >
                              {list.status == "in_stock"
                                ? "In Stock"
                                : list.status == "in_used"
                                  ? "In Used"
                                  : list.status == "damage"
                                    ? "Damage"
                                    : list.status == "donated"
                                      ? "Donated"
                                      : list.status == "lost"
                                        ? "Lost"
                                        : list.status == "broken"
                                          ? "Broken"
                                          : ""}
                            </label>
                          </div>
                        </td>
                        <td className="py-3">
                          {list.owner != "" ? list.owner : <span className="pl-3">....</span>}
                        </td>
                        <td className="py-3">{list.roomName ? list.roomName : <span className="pl-3">....</span>}</td>
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
                                      className="border border-bg-primary mt-1  bg-white shadow-md rounded-md absolute right-0 z-50 w-48 p-2"
                                    >
                                      <Listbox.Option className="flex flex-col">

                                        <label
                                          onClick={() => dispatch(setAsset(list))}
                                          htmlFor="view-detail"
                                          className={`cursor-pointer text-primary hover:bg-primary hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <TbListDetails /> View
                                          </span>
                                        </label>
                                        <label
                                          onClick={() => dispatch(setAsset(list))}
                                          htmlFor="update-asset"
                                          className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <BiMessageSquareEdit /> Edit
                                          </span>
                                        </label>
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

          <ViewDetailComponent className="modal" />
          <AssetUpdateComponent className="modal" handleIsUpdateSuccess={handleIsUpdateSuccess} />
        </div>
      </main>
    </>
  );
}
