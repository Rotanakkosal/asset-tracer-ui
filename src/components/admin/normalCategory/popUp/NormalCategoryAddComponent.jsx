import React, { Fragment, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import gift from "../../../../assets//icon/gift.svg";
import chair from "../../../../assets/icon/normal_category/chair.svg";
import laptop from "../../../../assets//icon/normal_category/laptop.svg";
import paper from "../../../../assets/icon/normal_category/paper.svg";
import addIcon from "../../../../assets//icon/addIcon.svg";
import placeImg from "../../../../assets/icon/placeImg.svg";
import { FiSave } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import FileUploadService from "../../../../redux/services/FileUploadService";
import { AiOutlinePlus } from "react-icons/ai";
import SuperCategoryService from "../../../../redux/services/SuperCategoryService";
import NormalCategoryService from "../../../../redux/services/NormalCategoryService";
import { setIsCreateSuccess } from "../../../../redux/slices/NormalCategorySlice";
import ReactLoading from "react-loading";
import { Slide, ToastContainer, toast } from "react-toastify";

export default function NormalCategoryAddComponent() {

  const dispatch = useDispatch()
  let formData = new FormData()
  let organization = JSON.parse(sessionStorage.getItem("organization"))
  let orgId = organization.id

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState("")
  const [superCategoryName, setSuperCategoryName] = useState([])
  const [selectedSuperCategory, setSelectedSuperCategory] = useState()

  //combobox
  const [querySuperCategory, setQuerySuperCateogry] = useState("")

  const [newData, setNewData] = useState({
    name: "",
    icon: "",
    superCategoryId: "",
    organizationId: organization.id
  })

  const filteredSuperCategoryName =
    querySuperCategory === ""
      ? superCategoryName
      : superCategoryName.filter((list) =>
        list.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(querySuperCategory.toLowerCase().replace(/\s+/g, ""))
      );

  const handleSelectedSuperCategory = (val) => {
    setSelectedSuperCategory(val)
    setNewData({ ...newData, superCategoryId: val.id })
    formik.setValues({ ...newData, superCategoryId: val.id })
  }

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    SuperCategoryService.getAllSuperCategoresName(orgId).then(res => {
      if (res.data.success) {
        setSuperCategoryName(res.data.payload)
      }
    })
  }, [])

  const formik = useFormik({
    initialValues: newData,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Normal category is required"),
      superCategoryId: Yup.string().required("Super category is required"),
    }),
    onSubmit: (val, { resetForm }) => {
      handleSaveNormalCategory()
    },
  });

  // select file
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Add Super Category
  const handleSaveNormalCategory = () => {
    setIsLoading(true)
    if (selectedFile != "chair.svg" && selectedFile != "laptop.svg" && selectedFile != "paper.svg" && selectedFile != "") {
      formData.append("file", selectedFile)
      FileUploadService.storeFile(formData, localStorage.getItem("token"))
        .then((res) => {
          if (res.data.success) {
            NormalCategoryService.addNormalCategory(
              { ...newData, icon: res.data.payload }
            ).then((res) => {
              if (res.data.success) {
                setTimeout(() => {
                  setIsLoading(false)
                  document.getElementById("add-normal-category").click();
                  setSelectedFile("")
                  setSelectedSuperCategory("")
                  dispatch(setIsCreateSuccess(true))

                  setNewData({
                    name: "",
                    icon: "",
                    superCategoryId: "",
                    organizationId: organization.id
                  })

                  formik.setValues({
                    name: "",
                    icon: "",
                    superCategoryId: "",
                    organizationId: organization.id
                  })
                }, 500)
              }
            });
          }
        }, err => {
          toast.warning(err.response.data.detail)
          setTimeout(() => {
            setIsLoading(false)
          }, 500)
        })
    } else {
      NormalCategoryService.addNormalCategory(newData).then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            setIsLoading(false)
            document.getElementById("add-normal-category").click();
            setSelectedFile("")
            setSelectedSuperCategory("")
            dispatch(setIsCreateSuccess(true))
            
            setNewData({
              name: "",
              icon: "",
              superCategoryId: "",
              organizationId: organization.id
            })

            formik.setValues({
              name: "",
              icon: "",
              superCategoryId: "",
              organizationId: organization.id
            })
          }, 500)
        }
      }, err => {
        toast.warning(err.response.data.detail)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      });
    }
  };

  const handleHideModal = () => {
    setNewData({
      name: "",
      icon: "",
      superCategoryId: "",
      organizationId: orgId
    });
    setSelectedSuperCategory("")
    setSelectedFile("")
    formik.setValues({
      name: "",
      icon: "",
      superCategoryId: "",
      organizationId: orgId
    });
  };

  const handleSelectedFile = (val) => {
    setSelectedFile(val)
    setNewData({ ...newData, icon: val })
  }

  return (
    <div>
      <ToastContainer transition={Slide} autoClose={1400} />
      <input type="checkbox" id="add-normal-category" className="modal-toggle" />
      <div className=" modal">
        <div className=" modal-box relative rounded-lg">
          <div className="absolute top-7 right-7">
            <label
              htmlFor="add-normal-category"
              onClick={handleHideModal}
            >
              <RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
            </label>
          </div>
          <div className=" flex justify-between">
            <div className="flex">
              <img src={gift} className="h-12 rounded-lg w-12 " />
              <p className="mt-2 items-center font-sp-pro-text-semibold text-lg pl-3 text-text-color">
                Create Normal Category
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className=" border border-bg-primary rounded-md p-2 my-6">
              <div className="flex items-center gap-3">
                <label>
                  {selectedFile ?
                    <img
                      src={selectedFile == "chair.svg" ? chair : selectedFile == "laptop.svg" ? laptop : selectedFile == "paper.svg" ? paper : URL.createObjectURL(selectedFile)}
                      className="h-14 rounded-full w-14 "
                    />
                    : <img
                      className="h-14 rounded-lg w-14"
                      src={placeImg}
                    />
                  }
                </label>
                <div className="flex flex-col">
                  <p className="px-2">Choose Icon</p>
                  <div className="flex flex-row items-end justify-start">
                    <div className="p-2">
                      <label className="cursor-pointer" onClick={() => handleSelectedFile("chair.svg")}>
                        <img
                          src={chair}
                          className="h-8 rounded-lg w-8 "
                        />
                      </label>
                    </div>
                    <div className="p-2">
                      <label className="cursor-pointer" onClick={() => handleSelectedFile("laptop.svg")}>
                        <img src={laptop} className="h-8 rounded-lg w-8 " />
                      </label>
                    </div>
                    <div className="p-2">
                      <label className="cursor-pointer" onClick={() => handleSelectedFile("paper.svg")}>
                        <img
                          src={paper}
                          className="h-8 rounded-lg w-8 "
                        />
                      </label>
                    </div>

                    <div className="p-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          id="logo"
                          onChange={handleFileSelect}
                        />
                        <div className="h-8 rounded-lg w-8 bg-bg-primary hover:bg-bg-primary-strockF flex justify-center items-center">
                          <AiOutlinePlus className="text-xl" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="text-left">
                <label className="block mb-2 ml-1 text-sm">Super Category Name<span className='text-reject'>*</span></label>
                <Combobox
                  value={selectedSuperCategory}
                  onChange={handleSelectedSuperCategory}
                  className="z-20"
                >
                  <div className="relative z-20">
                    <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                      <Combobox.Input
                        className="w-full border-[#E1E9EE] placeholder-black placeholder-opacity-20 border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                        displayValue={(val) => val.name}
                        onChange={(e) => setQuerySuperCateogry(e.target.value)}
                        placeholder='Select super category name'
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
                      afterLeave={() => setQuerySuperCateogry("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredSuperCategoryName.length == 0 && querySuperCategory !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                            Nothing found.
                          </div>
                        ) : (
                          filteredSuperCategoryName.map((val, index) => (
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
                {formik.touched.superCategoryId && formik.errors?.superCategoryId ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.superCategoryId}</p> : null}
              </div>

              <div className='text-left'>
                <label className="block mb-2 ml-1 text-sm">Normal Category Name <span className='text-reject'>*</span></label>
                <input
                  type='text'
                  value={newData.name}
                  onInput={handleInputChange}
                  onChange={formik.handleChange}
                  name="name"
                  className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20 focus:border-primary  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                  placeholder='Enter normal category name'
                />
                {formik.touched.name && formik.errors?.name ? <p className="text-reject text-xs mt-2 pl-1">{formik.errors.name}</p> : null}
              </div>
            </div>

            <div className="flex justify-end flex-row space-x-4 mt-10">
              {isLoading ? <>
                <div className="">
                  <label
                    className="rounded-md opacity-50 bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                  >
                    <RiCloseFill className='text-lg' />
                    Cancel
                  </label>
                </div>

                <div className="">
                  <button
                    type="button"
                    className={`hover:bg-primary bg-primary hover:bg-opacity-90 rounded-md cursor-pointer py-2 px-5 text-sm font-sp-pro-text-medium text-white hover:opacity-90 w-full flex items-center`}
                  >
                    <ReactLoading
                      type="spin"
                      color="#FFFFFF"
                      width={19}
                      height={19}
                    />{" "}
                    <span className="ml-2">Saving</span>
                  </button>
                </div>
              </> : <>
                <div className="">
                  <label
                    onClick={handleHideModal}
                    htmlFor="add-normal-category"
                    className="rounded-md bg-bg-primary py-2 cursor-pointer px-5 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
                  >
                    <RiCloseFill className='text-lg' />
                    Cancel
                  </label>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className={`hover:bg-primary bg-primary hover:bg-opacity-90 rounded-md cursor-pointer py-2 px-5 text-sm font-sp-pro-text-medium text-white hover:opacity-90 w-full flex items-center`}
                  >
                    <FiSave className="text-lg" /> &nbsp; Create
                  </button>
                </div>
              </>}

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
