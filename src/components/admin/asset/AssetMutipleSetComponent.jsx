import React, { useEffect, useState } from "react";
import upload_placeholder from "../../../assets/images/placeholder/upload_placeholder.svg";
import { RiCloseFill } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import FileUploadService from "../../../redux/services/FileUploadService";
import { HiDocumentText, HiViewGridAdd } from "react-icons/hi";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import placeholder from "../../../assets/images/placeholder/placeholder-image.png"
import ItemDetailService from "../../../redux/services/ItemDetailService";
import RoomService from "../../../redux/services/RoomService";
import AssetService from "../../../redux/services/AssetService";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Slide, ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";

const status = [
  { id: "in_stock", name: "In Stock" },
  { id: "in_used", name: "In Used" },
  { id: "damage", name: "Damage" },
  { id: "donated", name: "Donated" },
  { id: "lost", name: "Lost" },
  { id: "broken", name: "Broken" },
]

export default function AssetMutipleSetComponent() {

  const [items, setItems] = useState([])
  const [rooms, setRooms] = useState([])
  const navigator = useNavigate();
  const organization = JSON.parse(sessionStorage.getItem("organization"))
  const orgId = organization.id
  const [isLoading, setIsLoading] = useState(false)
  const [newData, setNewData] = useState(
    [
      {
        itemDetailId: "",
        labelCode: "",
        serialCode: "",
        owner: "",
        status: "",
        roomId: "",
        description: "",
        organizationId: orgId,
      }
    ]
  )

  const handleAddMoreItem = () => {
    setNewData([...newData, {
      itemDetailId: "",
      labelCode: "",
      serialCode: "",
      owner: "",
      status: "",
      roomId: "",
      description: "",
      organizationId: orgId,
      item: {}
    }])

    formik.setValues({
      ...formik.values,
      newData: [...newData, {
        itemDetailId: "",
        labelCode: "",
        serialCode: "",
        owner: "",
        status: "",
        roomId: "",
        description: "",
        organizationId: orgId,
        item: {}
      }]
    })
  }

  const handleDeleteItem = (index) => {
    const val = [...newData]
    val.splice(index, 1)
    setNewData(val)
    formik.values.newData.splice(index, 1)
  }

  const handleInputChangeItem = (e, index) => {
    const { name, value } = e.target
    const onChangeVal = [...newData]
    onChangeVal[index][name] = value
    setNewData(onChangeVal)
    formik.setValues({
      ...formik.values,
      newData: [...onChangeVal]
    })
  }


  const [duplicateData, setDuplicateData] = useState([])
  const [total, setTotal] = useState(0);
  const [totalAllAsset, setTotalAllAsset] = useState(0)
  const [itemIndex, setItemIndex] = useState();
  const [countSet, setCountSet] = useState(0)
  let newItems = [...items]
  let count = [];

  useEffect(() => {

    count = newData.reduce((accumulator, value) => {
      return { ...accumulator, [value.itemDetailId]: (accumulator[value.itemDetailId] || 0) + 1 };
    }, {})

    setDuplicateData(Object.entries(count))

  }, [newData])

  useEffect(() => {
    duplicateData.filter(res => {
      if (res[1] + countSet === totalAllAsset && itemIndex != null) {
        newItems.splice(itemIndex, 1)
        setItemIndex(null)
      }
    })
    setItems(newItems)
  }, [duplicateData])

  const handleSelectionChangeItem = (e, index) => {
    const { name, value } = { name: "itemDetailId", value: e.id }
    const onChangeVal = [...newData]
    onChangeVal[index][name] = value
    onChangeVal[index]["item"] = e
    setNewData(onChangeVal)
    formik.setValues({
      ...formik.values,
      newData: [...onChangeVal]
    })

    setTotalAllAsset(e.countSet + e.countUnset)
    setItemIndex(items.indexOf(e))
    setCountSet(e.countSet)
  }

  const handleSelectionChangeRoom = (e, index) => {
    const { name, value } = { name: "roomId", value: e.id }
    const onChangeVal = [...newData]
    onChangeVal[index][name] = value
    setNewData(onChangeVal)
    formik.setValues({
      ...formik.values,
      newData: [...onChangeVal]
    })
  }

  const handleSelectionChangeStatus = (e, index) => {
    const { name, value } = { name: "status", value: e }
    const onChangeVal = [...newData]
    onChangeVal[index][name] = value
    setNewData(onChangeVal)
    formik.setValues({
      ...formik.values,
      newData: [...onChangeVal]
    })
  }

  // ------------------------------------------------

  useEffect(() => {
    ItemDetailService.getAllItemByOrg(orgId).then(res => {
      if (res.data.success) {
        setItems(res.data.payload)
      }
    })
    RoomService.getAllRoomByOrgId(orgId).then(res => {
      if (res.data.success) {
        setRooms(res.data.payload)
      }
    })
  }, [])

  Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
    return this.test("unique", message, function (list) {
      return list.length === new Set(list.map(mapper)).size
    })
  })

  const formik = useFormik({
    initialValues: {
      newData: newData
    },
    validationSchema: Yup.object().shape({
      newData: Yup.array().of(
        Yup.object().shape({
          itemDetailId: Yup.string().required("Item is required"),
          status: Yup.string().required("Status is required"),
          labelCode: Yup.string().optional().notOneOf([Yup.ref("serialCode"), null], "Label code must be different from serial code").required("Label code is required")
        })
      ).unique("Label code must be unique", (a) => a.labelCode)
    }),
    onSubmit: (val, { resetForm }) => {
      handleImportMultipleAsset()
    }
  });

  useEffect(() => {

    if (formik.errors.newData == "Label code must be unique") {
      toast.error(formik.errors.newData)
      formik.errors.newData = ""
    }

  }, [formik.errors.newData])

  const handleImportMultipleAsset = () => {
    if (formik.errors?.newData) {
      console.log(formik.errors?.newData)
      toast.error(formik.errors?.newData)
    }
    setIsLoading(true)
    AssetService.importMultipleAssets(newData).then(res => {
      if (res.data.success) {
        setTimeout(() => {
          navigator("/tracking")
          setIsLoading(false)
        }, 500)
      }
    }, err => {
      toast.error(err.response.data.detail)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    })
  }

  const [queryItem, setQueryItem] = useState("");
  const filteredItem =
    queryItem === ""
      ? items
      : items.filter((list) =>
        list.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryItem.toLowerCase().replace(/\s+/g, ""))
      );

  const [queryRoom, setQueryRoom] = useState("");
  const filteredRoom =
    queryRoom === ""
      ? rooms
      : rooms.filter((list) =>
        list.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(queryRoom.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <>
      <main className="overflow-y-auto bg-white rounded-xl relative con-Shadow text-text-color">
        <div className="py-4 px-10">
          <h1 className="flex items-center text-2xl font-sp-pro-text-semibold">
            <HiDocumentText /> &nbsp; Import
            <span className="text-pending primary pl-2 flex items-center text-2xl font-sp-pro-text-semibold">Asset</span>
          </h1>
        </div>
        <hr className="border-[#E1E9EE] border-1" />
        <div className="pt-5 px-10 mb-5 flex gap-3">
          <NavLink to="/asset-set" className="bg-blue-500 p-2 bg-opacity-20 border border-blue-500 hover:bg-opacity-100 rounded-md text-blue-500 hover:text-white flex justify-center items-center gap-x-2"><HiViewGridAdd className="text-xl" /> Import Normal</NavLink>
          <NavLink to="/asset-set-multiple" className="bg-accept p-2 rounded-md bg-opacity-20 border border-accept hover:bg-opacity-100 text-accept hover:text-white flex justify-center items-center gap-x-2"><HiViewGridAdd className="text-xl" />  Import Multiple</NavLink>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {newData.map((list, index) => (
              <section className="px-5" key={index}>
                <div className="relative">
                  {index != 0 &&
                    <div className='absolute -top-3 -right-3'>
                      <label onClick={() => handleDeleteItem(index)}><RiCloseFill className="cursor-pointer bg-white border border-bg-primary-strock h-8 w-8 p-1 hover:bg-bg-primary text-reject text-opacity-70 rounded-full" /></label>
                    </div>
                  }
                </div>
                <div className={`flex flex-wrap xl:flex-nowrap justify-between w-full px-5 xl:px-0 pb-5 shadow-sm border border-opacity-50  rounded-lg ${index % 2 != 0 ? "py-10 border-primary" : "py-5 border-bg-primary-strock"} ${index != 0 ? "mt-10" : ""}`}>
                  <div className="w-full md:w-7/12 lg:w-full xl:w-7/12 mx-auto">
                    <section className="">
                      <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Select Item <span className='text-reject'>*</span></label>
                          <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                            <Combobox
                              onChange={(e) => handleSelectionChangeItem(e, index)}
                              className="z-20"
                            >
                              <div className="relative z-50">
                                <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                                  <Combobox.Input
                                    className="w-full border-[#E1E9EE] placeholder-black placeholder-opacity-20 border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                                    displayValue={(val) => val.name}
                                    onChange={(e) => { setQueryItem(e.target.value), (e) => handleSelectionChangeItem(e, index) }}
                                    placeholder='Select item'
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
                                  afterLeave={() => setQueryItem("")}
                                >
                                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredItem.length == 0 && queryItem !== "" ? (
                                      <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                        Nothing found.
                                      </div>
                                    ) : (
                                      filteredItem.map((val, index) => (
                                        <Combobox.Option
                                          key={index}
                                          className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""}`
                                          }
                                          value={val}
                                        >
                                          {val.name}
                                        </Combobox.Option>
                                      ))
                                    )}
                                  </Combobox.Options>
                                </Transition>
                              </div>
                            </Combobox>
                          </div>
                          {formik.touched?.newData && formik.errors?.newData && formik.errors?.newData[index]?.itemDetailId ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors?.newData[index].itemDetailId}</p> : null}
                        </div>
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Select Status <span className='text-reject'>*</span></label>
                          <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                            <Listbox as="div"
                              onChange={(e) => handleSelectionChangeStatus(e, index)}
                            >
                              {({ open }) => (
                                <>
                                  <div className="relative z-30">
                                    <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                                      <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue relative border border-slate-200 bg-bg-main rounded-md text-gray-800">
                                        {newData[index].status ? <span className="block truncate text-sm text-text-color">
                                          {newData[index].status == "in_stock" ? "In Stock" : newData[index].status == "in_used" ? "In Used" : newData[index].status == "damage" ? "Damage" : newData[index].status == "donated" ? "Donated" : newData[index].status == "broken" ? "Broken" : newData[index].status == "lost" ? "Lost" : ""}
                                        </span> : <span className="block truncate text-sm text-black text-opacity-20">Select status</span>}

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
                                            <Listbox.Option key={index} value={val.id}
                                              className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""}`
                                              }
                                            >
                                              {val.name}
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
                          {formik.touched?.newData && formik.errors?.newData && formik.errors?.newData[index]?.status ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors?.newData[index].status}</p> : null}
                        </div>
                      </div>
                      <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Label Code <span className='text-reject'>*</span></label>
                          <input
                            type='text'
                            onInput={(e) => handleInputChangeItem(e, index)}
                            onChange={formik.handleChange}
                            value={list.labelCode}
                            name="labelCode"
                            className="text-sm border-[#E1E9EE] focus:border-primary placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                            placeholder='Enter label code'
                          />
                          {formik.touched?.newData && formik.errors?.newData && formik.errors?.newData[index]?.labelCode ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors?.newData[index].labelCode}</p> : null}
                        </div>
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Serial Code</label>
                          <input
                            type='text'
                            onInput={(e) => handleInputChangeItem(e, index)}
                            onChange={formik.handleChange}
                            value={list.serialCode}
                            name="serialCode"
                            className="text-sm border-[#E1E9EE] focus:border-primary placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                            placeholder='Enter serial code'
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Owner</label>
                          <input
                            type='text'
                            onInput={(e) => handleInputChangeItem(e, index)}
                            onChange={formik.handleChange}
                            value={list.owner}
                            name="owner"
                            className="text-sm border-[#E1E9EE] focus:border-primary placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                            placeholder='Enter owner'
                          />
                        </div>
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Select Room</label>
                          <div className="z-20 mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                            <Combobox
                              onChange={(e) => handleSelectionChangeRoom(e, index)}
                              className="z-20"
                            >
                              <div className="relative z-20">
                                <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                                  <Combobox.Input
                                    className="w-full border-[#E1E9EE] placeholder-black placeholder-opacity-20 border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                                    displayValue={(val) => val.name}
                                    onChange={(e) => setQueryRoom(e.target.value)}
                                    placeholder='Select room'
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
                                    {filteredRoom.length == 0 && queryRoom !== "" ? (
                                      <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                        Nothing found.
                                      </div>
                                    ) : (
                                      filteredRoom.map((val, index) => (
                                        <Combobox.Option
                                          key={index}
                                          className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 px-5 text-text-color ${active ? "bg-custom-yellow-showdow-light" : ""}`
                                          }
                                          value={val}
                                        >
                                          {val.name}
                                        </Combobox.Option>
                                      ))
                                    )}
                                  </Combobox.Options>
                                </Transition>
                              </div>
                            </Combobox>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                        <div className='text-left w-full'>
                          <label className="block mb-2 ml-1 text-sm">Description</label>
                          <textarea name="description" value={list.description} onInput={(e) => handleInputChangeItem(e, index)} rows="5" className="text-sm border-[#E1E9EE] focus:border-primary placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none" placeholder="Enter description"></textarea>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="w-[24rem] md:w-[22rem] lg:w-[24rem] mx-auto">
                    <div className="md:px-5 my-5 flex">
                      <div className='w-full shadow p-5 rounded-md mb-1 relative mx-auto bg-white'>
                        <div className='py-2 block justify-center text-center rounded-lg'>
                          <div className='w-full min-h-[20rem] flex p-5 relative'>
                            {list?.item && list?.item.image ?
                              <img className="block m-auto h-56" src={FileUploadService.getImage(list.item.image)} />
                              :
                              <div>
                                <img className="block m-auto h-56" src={placeholder} />
                                <h1 className="text-md">No Image</h1>
                              </div>
                            }
                          </div>
                          <div className="w-full bg-opacity-10 rounded-md pb-1">
                            <p className="text-left font-sp-pro-text-bold p-2 px-2 mb-1 bg-opacity-20 rounded-sm "> Item Detail</p>
                            <p className="text-left px-2">
                              Set: {list?.item?.countSet ? list?.item.countSet : "0"}

                              {duplicateData.map(res => (
                                <>
                                  {res[0] != "" && res[0] == list.itemDetailId ?
                                    <span className="text-blue-500"> + {res[1]}</span>
                                    : null}
                                </>
                              ))}

                            </p>
                            <p className="text-left px-2"> Unset: {list?.item?.countUnset ? list?.item.countUnset : "0"}
                              {duplicateData.map(res => (
                                <>
                                  {res[0] != "" && res[0] == list.itemDetailId ?
                                    <span className="text-reject"> - {res[1]}</span>
                                    : null}
                                </>
                              ))}
                            </p>
                            <p className="text-left px-2"> Total: {list?.item?.countUnset ? list?.item.countUnset + list?.item.countSet : "0"}</p>
                            <p className="text-left px-2"> Type: {list?.item?.invoiceCode != null ? "Invoice (" + list?.item.invoiceCode + ")" : "Normal"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            ))}
            <div className="flex flex-wrap xl:flex-nowrap justify-between w-full px-5 xl:mt-[-85px] pb-10">
              <div className="w-full md:w-7/12 lg:w-full xl:w-7/12 mx-auto">
                <label onClick={handleAddMoreItem}>
                  <span className="flex flex-row mt-2 items-center cursor-pointer bg-[#003F7D] hover:bg-opacity-90 text-white p-3 py-1.5 rounded-md border hover:text-opacity-90 float-right">
                    <AiOutlinePlus className="text-xl mr-1" /> Add More Import
                  </span>
                </label>
              </div>

              <div className="w-[24rem] md:w-[22rem] lg:w-[24rem] mx-auto">
              </div>
            </div>

          </div>
          <div className='w-full flex justify-end gap-x-3 px-5 lg:px-10 xl:px-16 mb-10 mt-10'>
            {isLoading ?
              <>
                <label
                  className="rounded-md opacity-50 bg-bg-primary py-2 cursor-pointer px-3 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                >
                  <RiCloseFill className='text-lg' />
                  Cancel
                </label>

                <button
                  type="button"
                  className={`hover:bg-opacity-90 bg-primary  rounded-md cursor-pointer  py-2 px-5 text-sm font-sp-pro-text-medium text-white flex justify-center items-center gap-1`}
                >
                  <ReactLoading
                    type="spin"
                    color="#FFFFFF"
                    width={19}
                    height={19}
                  />{" "}
                  <span className="ml-2">Importing</span>
                </button>
              </>
              :
              <>
                <Link to={"/tracking"}>
                  <label
                    htmlFor='create-organization'
                    className="rounded-md bg-bg-primary py-2 cursor-pointer px-3 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                  >
                    <RiCloseFill className='text-lg' />
                    Cancel
                  </label>
                </Link>

                <button
                  type="submit"
                  className={`hover:bg-opacity-90 bg-primary  rounded-md cursor-pointer  py-2 px-5 text-sm font-sp-pro-text-medium text-white flex justify-center items-center gap-1`}
                >
                  <FiSave className='text-lg' /> Import
                </button>
              </>
            }
          </div>
        </form>
      </main>
      <ToastContainer transition={Slide} autoClose={1400}/>
    </>
  );
}