import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import NormalCategoryService from "../../../../redux/services/NormalCategoryService";
import { setAllCategory } from "../../../../redux/slices/NormalCategorySlice";


const getNormalCategory = [
  { id: 1, name: "Category" },
  { id: 2, name: "SR Class" },
];

export default function CategoryComponent() {
  // organization id
  const organization = sessionStorage.getItem("organization");
  const getOrganizationDetail = JSON.parse(organization);
  const orgId = getOrganizationDetail.id;

  // get normal category
  const getNormalCategory = useSelector((state)=> state.normalCategory.data)
  const dispatch = useDispatch();
  
  const getNormalCategoryName = () => {
     NormalCategoryService.getAllNormalCategory(orgId).then((res) => {
      dispatch(setAllCategory(res.data.payload));
      
     }).catch((err)=>{
      console.log(err);
     })
  }
  useEffect(()=>{
    getNormalCategoryName()
  }, [])

  // fetch data API
  const [selected, setSelected] = useState(getNormalCategory);
  // const [selected, setSelected] = useState(getNormalCategory[0]);
  const [query, setQuery] = useState("");
  const filteredNormalCategory =
    query === ""
      ? getNormalCategory
      : getNormalCategory.filter((normal) =>
          normal.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="mt-1">
      <div className="">
        <Combobox value={selected} onChange={setSelected} className="">
          <div className="relative z-10">
            <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
              <Combobox.Input
                className="w-full border-[#E1E9EE] border rounded-lg py-2.5  pl-3 pr-10 text-xs outline-none focus:border-primary text-text-color text-opacity-50"
                displayValue={(normal) => normal.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronDown
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
                {filteredNormalCategory.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                    Nothing found.
                  </div>
                ) : (
                  filteredNormalCategory.map((normal) => (
                    <Combobox.Option
                      key={normal.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-custom-yellow-showdow-light text-text-color"
                            : "text-text-color"
                        }`
                      }
                      value={normal}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {normal.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-primary" : "text-primary"
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
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
    </div>
  );
}
