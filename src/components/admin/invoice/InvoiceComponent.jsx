import React, { Fragment, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import gift from "../../../assets/images/gift.png";
import trash from "../../../assets/images/trash.png";
import pc from "../../../assets/images/pc.png";
import cross from "../../../assets/images/cross.png";
import furniture from "../../../assets/images/furniture.png";
import book from "../../../assets/images/book.png";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import "../../../style/shadow.css";
import {
  CheckIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import ReactPaginate from "react-paginate";
import { Link, NavLink } from "react-router-dom";
import ViewInvoiceComponent from "./ViewInvoiceComponent";
import { useDispatch, useSelector } from "react-redux";
import InvoiceService from "../../../redux/services/InvoiceService";
import {
  setAllInvoice,
  setInvoiceDetail,
} from "../../../redux/slices/InvoiceSlice";
import moment from "moment";
import { TbListDetails } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiMessageSquareEdit } from "react-icons/bi";
import no_data_pic from '../../../assets/images/empty_box.png'

const sort = [
  {
    id: "",
    name: "Default",
  },
  {
    id: "invoiceCode",
    name: "Invoice Code",
  },
  {
    id: "supplier",
    name: "Supplier",
  },
  {
    id: "purchaseBy",
    name: "Purchaser",
  },
  {
    id: "purchaseDate",
    name: "Date",
  },
];

export default function AssetComponent() {
  const [i, setI] = useState(1);
  const [selectedSort, setSelectedSort] = useState(sort[0].name);
  const getAllInvoices = useSelector((state) => state.invoice.data);
  const [totalRow, setTotalRow] = useState(0);
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  const orgId = organization.id;
  const [invoiceCode, setInvoiceCode] = useState();
  const [selectedPage, setSelectedPage] = useState(1);

  const handleGetAllInvoices = (selectedPage, invoiceCode, selectedSort) => {
    InvoiceService.getAllInvoices(
      organization.id,
      selectedPage,
      8,
      invoiceCode,
      "",
      "",
      selectedSort
    ).then((res) => {
      if (res.data.success) {
        dispatch(setAllInvoice(res.data.payload));
        setTotalRow(res.data.totalData);
      }
    }, err => {
      dispatch(setAllInvoice([]));
      setTotalRow(0);
    });
  };

  //combobox
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // pagination
  const [pageCount, setPageCount] = useState(4);

  const handlePageClick = (event) => {
    setSelectedPage(event.selected + 1);
    setI(event.selected * 8 + 1);
  };

  useEffect(() => {
    if (invoiceCode != null || selectedSort != null) {
      setSelectedPage(1);
      handleGetAllInvoices(selectedPage, invoiceCode, selectedSort);
    }

    setPageCount(Math.ceil(totalRow / 8));
  }, [invoiceCode, selectedSort, totalRow]);

  useEffect(() => {
    setPageCount(Math.ceil(totalRow / 8));
  }, [totalRow]);

  const handleInputSearch = (e) => {
    setInvoiceCode(e.target.value);
  };

  const handleSelectedSort = (val) => {
    setSelectedSort(val);
  };

  return (
    <main className="overflow-y-auto px-10 py-6 bg-white rounded-xl relative lg:px-10 con-Shadow min-h-[calc(100vh-9rem)]">
      <div className="gap-6 overflow-hidden z-10">
        <div className="lg:flex lg:flex-row md:flex-col sm:flex-col justify-between gap-4 p-5 mb-5 text">
          {/* header */}
          <div className="md:pb-0 sm:pb-2 min-w-max mb-4 xl:mb-0 text-text-colors">
            <h2 className="text-2xl font-sp-pro-text-semibold text-text-color">
              All <span className="text-pending">Invoice</span>
            </h2>
            <p className="font-sp-pro-text-regular text-sm text-green">
              Active Invoice
            </p>
          </div>

          {/* search */}
          <div className="md:flex md:flex-row justify-center gap-10">
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

            {/* add */}
            {organization.roleName == "ADMIN" ? (
              <div>
                <Link to={"/invoice/add"}>
                  <div className="block w-max">
                    <label
                      htmlFor="my-modal-3"
                      className="border ml-auto cursor-pointer border-yellow text-yellow p-1.5 pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase hover:bg-custom-yellow-showdow-light"
                    >
                      <BsPlus className="w-6 h-6" />
                      &nbsp; Add New Invoice
                    </label>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                <div className="block w-max">
                  <label
                    className="border border-opacity-40 w-max mr-auto md:min-w-max cursor-pointer border-yellow text-yellow  text-opacity-50 hover:bg-opacity-10 p-[5px] pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase"
                  >
                    <BsPlus className="w-6 h-6" />
                    &nbsp; Add New Invoice
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {getAllInvoices.length != 0 ? (
          <div className="flex flex-col min-h-[calc(100vh-19rem)] overflow-x-auto flex-grow">
            {/* table */}
            <div className="px-5 z-0 flex-grow ">
              <table className="table w-full">
                <tbody>
                  <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none text-text-color">
                    <td className="w-2/12 bg-bg-main py-3 px-10">No</td>
                    <td className="w-2/12 bg-bg-main py-3">Invoice Code</td>
                    <td className="w-3/12 bg-bg-main py-3">Supplier</td>
                    <td className="w-2/12 bg-bg-main py-3">Purchaser</td>
                    <td className="w-3/12 bg-bg-main py-3 text-center">Date</td>
                    {/* {organization.roleName == "ADMIN" ? ( */}
                    <td className="w-1/12 bg-bg-main py-3 px-10">Action</td>
                    {/* ) : null} */}
                  </tr>
                  {getAllInvoices.map((list, index) => (
                    <tr
                      key={index}
                      className="text-sm font-sp-pro-text-regular"
                    >
                      <td className="py-2.5 px-10">{i + index}</td>
                      <td className="py-2.5">
                        <span className="px-3 py-1 bg-green bg-opacity-20 rounded-md  text-green">
                          {list.invoiceCode != null ? list.invoiceCode : "..."}
                        </span>
                      </td>
                      <td className="py-2.5">{list.supplier ? list.supplier : <span className="ml-3">...</span>}</td>
                      <td className="py-2.5">{list.purchaseBy ? list.purchaseBy : <span className="ml-3">...</span>}</td>
                      <td className="py-2.5 text-center">
                        {moment(list.purchaseDate).format("MMM DD YYYY")}
                      </td>
                      {/* menu dropdown */}
                      {/* {organization.roleName == "ADMIN" ? ( */}
                      <td className="py-2.5 text-center">
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
                                      <NavLink
                                        to={`/invoice/view/${list.id}`}
                                        className={`cursor-pointer text-text-color hover:bg-bg-primary inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                      >
                                        <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                          <TbListDetails /> View
                                        </span>
                                      </NavLink>
                                      {organization?.roleName == "ADMIN" ?
                                        <NavLink
                                          to={`/invoice/update/${list.id}`}
                                          htmlFor="create-organization"
                                          className={`cursor-pointer text-green hover:bg-green hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                        >
                                          <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                            <BiMessageSquareEdit /> Edit
                                          </span>
                                        </NavLink>
                                        : null}
                                      {/* <label
                                        className={`cursor-pointer text-primary hover:bg-primary hover:bg-opacity-10 inline-block select-none relative py-2 p-4 w-full text-gray-900 rounded-md `}
                                      >
                                        <span className="flex justify-start text-[14px] font-sp-pro-text-semibold items-center gap-2">
                                          <AiOutlineCloudDownload /> Download
                                        </span>
                                      </label> */}
                                    </Listbox.Option>
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </td>
                      {/* ) : null} */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="w-full flex justify-between items-center text-sm  font-sp-pro-text-medium text-gray-500 flex-grow-0 px-7 h-10">
              <div className="font-sp-pro-text-regular opacity-90">
                Showing data 1 to 8 of {totalRow} entries
              </div>
              <div id="react-paginate" className="">
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

        {/* Modal Add notification */}
        <input type="checkbox" id="normalCategory" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="normalCategory"
              className="font-semibold text-xl absolute right-8 top-8"
            >
              ✕
            </label>
            <div className="flex justify-start items-center pb-8">
              <img src={gift} width={50} />
              <h3 className="text-lg font-bold text-text-color pl-5">
                Invite user
              </h3>
            </div>
            <div className="border py-5 px-5 flex justify-start items-center">
              <img src={furniture} width={70} />
              <div className="flex pl-5 flex-col justify-start">
                <p className="pb-3">Choose Icon</p>
                <div className="flex space-x-5">
                  <button>
                    <img src={pc} width={50} />
                  </button>
                  <button>
                    <img src={furniture} width={50} />
                  </button>
                  <button>
                    <img src={book} width={50} />
                  </button>
                  <button>
                    <img src={cross} width={50} />
                  </button>
                </div>
              </div>
            </div>
            <select className="select select-bordered w-full ">
              <option disabled defaultValue="">
                Super Category
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
            <div className="mb-6">
              <label className="block mb-2 text-lg mt-4 font-medium text-text-color float-left">
                Name
              </label>
              <input
                type="text"
                id="base-input"
                className="bg-gray-50 border text-sm rounded-lg  block w-full p-2.5"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <div className="modal-action">
                <label
                  htmlFor="normalCategory"
                  className="bg-[#F4F4F4] text-text-color font-light hover:bg-[#F4F4F4] border-2 border-[#D0D5DD] btn"
                >
                  Cancel
                </label>
              </div>
              <div className="modal-action">
                <label className="bg-pending text-[#F4F4F4] font-light border-2 border-pending hover:bg-pending btn">
                  Save
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Popup */}
        <input type="checkbox" id="modalEdit" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="modalEdit"
              className="font-semibold text-xl absolute right-8 top-8"
            >
              ✕
            </label>
            <div className="flex justify-start items-center pb-8">
              <img src={gift} width={50} />
              <h3 className="text-lg font-bold text-text-color pl-5">
                Update Normal Category
              </h3>
            </div>
            <div className="border py-5 px-5 flex justify-start items-center">
              <img src={furniture} width={70} />
              <div className="flex pl-5 flex-col justify-start">
                <p className="pb-3">Choose Icon</p>
                <div className="flex space-x-5">
                  <button>
                    <img src={pc} width={50} />
                  </button>
                  <button>
                    <img src={furniture} width={50} />
                  </button>
                  <button>
                    <img src={book} width={50} />
                  </button>
                  <button>
                    <img src={cross} width={50} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-lg pt-5 font-medium text-text-color">
                Name
              </label>
              <input
                type="text"
                className="border text-lg rounded-lg w-full py-3 px-3"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <div className="modal-action">
                <label
                  htmlFor="modalEdit"
                  className="bg-[#F4F4F4] text-text-color font-light hover:bg-[#F4F4F4] border-2 border-[#D0D5DD] btn"
                >
                  Cancel
                </label>
              </div>
              <div className="modal-action">
                <label className="bg-accept text-[#F4F4F4] font-light border-2 border-accept hover:bg-accept btn">
                  Save Change
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Popup */}
        <input type="checkbox" id="modalDelete" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <div className="flex justify-start">
              <img src={trash} width={50} className="inline-block" />
              <div className="pl-2">
                <h3 className="text-lg font-bold text-text-color">Delete</h3>
                <p className="pt-1 text-text-color">
                  Are you sure want to delete this post?
                </p>
              </div>
            </div>
            <label
              htmlFor="modalDelete"
              className="font-semibold text-xl absolute right-8 top-6"
            >
              ✕
            </label>

            <div className="flex justify-end space-x-4">
              <div className="modal-action">
                <label
                  htmlFor="modalDelete"
                  className="bg-[#F4F4F4] font-light text-text-color hover:bg-[#F4F4F4] border-2 border-[#D0D5DD] btn"
                >
                  Cancel
                </label>
              </div>
              <div className="modal-action">
                <label className="bg-[#FFC5C5] font-light text-reject border-2 border-reject hover:bg-[#FFC5C5] btn">
                  Delete
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
