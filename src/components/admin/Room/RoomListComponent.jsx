import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllRoom, setRoomDetail } from "../../../redux/slices/RoomSlice";
import RoomService from "../../../redux/services/RoomService";
import DetailComponent from "./popUpRoom/DetailComponent";
import AddComponent from "./popUpRoom/AddComponent";
import ReactPaginate from "react-paginate";
import UpdateComponent from "./popUpRoom/UpdateComponent";
// import { Fragment, useState } from 'react'
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { BsPlus } from "react-icons/bs";
const people = [
  { id: 1, name: "Room" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];
{
  /* <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" /> */
}

function RoomListComponent(props) {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.room.data);
  const divClassName =
    "flex items-center col-span-12 md:col-span-6 lg:col-span-3 mt-1";
  const startIndex = divClassName.indexOf("Showing ") + 8;
  const endIndex = divClassName.indexOf("-");
  const index = divClassName.substring(startIndex, endIndex).trim();
  const [pageCount, setPageCount] = useState(2);
  const getAllRoom = () => {
    RoomService.getAllRoom().then((res) => {
      if (res?.data?.success) {
        dispatch(setAllRoom(res.data.payload));
      }
    });
  };
  useEffect(() => {
    getAllRoom();
  }, []);

  // pagination
  let [isOpen, setIsOpen] = useState(false);
  function openDetail() {
    setIsOpen(true);
  }
  const handlePageClick = (event) => {
    getAllSuperCategory(event.selected + 1);
    setI(event.selected * 10 + 1);
  };

  return (
    <main
    className="overflow-y-auto px-10 py-6 bg-white rounded-xl relative"
    style={{
      boxShadow: "rgba(149, 157, 165, 0.1) 0px 1px 4px 1px",
    }}
    >
      <div className="gap-6 overflow-hidden z-10">
        <div className="lg:flex lg:flex-row md:flex-col sm:flex-col justify-between gap-4 p-5 text">
        <div className="md:pb-0 sm:pb-2 text-text-colors">
            <h2 className="text-2xl font-sp-pro-text-semibold">
              All <span className="text-pending">Room</span> Management
            </h2>
            <p className="font-sp-pro-text-regular text-sm text-green">
              Active Room
            </p>
          </div>

          {/* search */}
          <div className="flex flex-row justify-center gap-10">
            <div>
              <div className="relative text-sm border-[#E1E9EE]  bg-[#F9FBFF]  border rounded-lg block w-full py-2 px-1 mb-1  focus:border-primary">
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
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* filter */}
            <div className="z-20">
              <Combobox
                value={selected}
                onChange={setSelected}
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
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
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
            </div>

            {/* add */}
            <div className="block ">
              <label
                htmlFor="addroom"
                className="border-2 ml-auto cursor-pointer border-yellow text-yellow p-[5px] pr-3 rounded-lg font-sp-pro-text-medium text-sm flex items-center uppercase"
              >
                <BsPlus className="w-6 h-6" />&nbsp;Add Room
              </label>
            </div>
          </div>
        </div>

        <div
          // className="overflow-x-auto px-5 z-0"
          style={{
            minHeight: "calc(100vh - 15rem)",
          }}
        >
          <table className="table w-full text-sm font-sp-pro-text-semibold text-text-color">
            <thead>
            <tr className="text-sm font-sp-pro-text-semibold text-text-color">
                  <td className="w-1/12 bg-bg-main py-3 text-center">No</td>
                  <td className="w-3/12 bg-bg-main py-3">
                    Room Name
                  </td>
                  <td className="w-2/12 bg-bg-main py-3">
                    Type
                  </td>
                  <td className="w-2/12 bg-bg-main py-3 text-center">
                    Floor
                  </td>
                  <td className="w-3/12 bg-bg-main py-3 text-center">
                    Description
                  </td>
                  <td className="w-1/12 bg-bg-main py-3 text-center">
                    Action
                  </td>
                </tr>
            </thead>
            <tbody className="">
              {getData.map((item, index) => (
                <tr className=" bg-bg-primary text-sidebar border-b border-gray border-opacity-20" key={index}>
                  <td className="w-1/12 px-10">{index + 1}</td>
                  <td className="w-3/12">
                    <span className={`bg-accept bg-opacity-20 p-2 text-accept rounded-full mr-5`}>{item.name.substring(0, 2)}</span>
                    {item.name}
                    </td>
                  <td className="w-2/12">{item.type}</td>
                  <td className="w-2/12">{item.floor}</td>
                  <td className="w-3/12">{item.description}</td>
                  <td className="w-1/12">
                    <div className="dropdown dropdown-left">
                      <EllipsisVerticalIcon tabIndex={0} className="cursor-pointer h-7 w-7 text-gray-500 bg-slate-100 rounded-full" />
                      <ul tabIndex={0} className="z-50 dropdown-content menu shadow bg-base-100 rounded-sm w-52">
                        <li  onClick={() => dispatch(setRoomDetail(item))}>
                          <label htmlFor="detail" className='hover:bg-primary cursor-pointer hover:bg-opacity-10 p-4' >View Room Detail</label>
                        </li>
                        <li className=''>
                          <label htmlFor="update" className="hover:bg-primary hover:bg-opacity-10 p-4 cursor-pointer">Update Room</label>
                          </li>
                      <li className='hover:bg-primary hover:bg-opacity-10 p-4 cursor-pointer'>Delete Room</li>
                    </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input type="checkbox" id="detail" className="modal-toggle" />
          <DetailComponent className="modal" />
          <input type="checkbox" id="addroom" className="modal-toggle" />
          <AddComponent className="modal" />
          <input type="checkbox" id="update" className="modal-toggle" />
          <UpdateComponent className="modal" />
        </div>
        <DetailComponent setIsOpen={setIsOpen} isOpen={isOpen} />

       {/* pagination */}
       <div className="w-full flex justify-between items-center text-sm text-text-color font-sp-pro-text-medium text-gray-500 h-14 flex-grow-0 px-7">
            <div className="">Showing data 1 to 8 of 256K entries</div>
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
    </main >
  );
}

export default RoomListComponent;