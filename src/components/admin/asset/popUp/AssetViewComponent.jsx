import React, { Fragment, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { AiOutlineShopping } from "react-icons/ai";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import placeholder_square from "../../../../assets/images/placeholder/placeholder_square.jpg";
import placeholder from "../../../../assets/images/placeholder/placeholder.jpg";
import { useEffect } from "react";
import InvoiceService from "../../../../redux/services/InvoiceService";
import ItemDetailService from "../../../../redux/services/ItemDetailService";
import FileUploadService from "../../../../redux/services/FileUploadService";
import { ProductionQuantityLimits } from "@mui/icons-material";

import electronic from "../../../../assets/icon/electronic.svg";
import furniture from "../../../../assets/icon/furniture.svg";
import office from "../../../../assets/icon/office.svg";
function AssetViewComponent() {
  var itemDetail = useSelector((state) => state.itemDetail.itemDetail);
  console.log("this is itemDetailWithOwner Data:", itemDetail);
  const CurrentOrg = JSON.parse(sessionStorage.getItem("organization"));
  const dispatch = useDispatch();
  const selectedImage =
    "https://cdn.pixabay.com/photo/2016/06/29/04/39/bride-1486004_960_720.jpg";
  const [topImage, setTopImage] = useState(selectedImage);

  const handleImageClick = (newImage) => {
    setTopImage(newImage);
  };
  return (
    <>
      <div className="modal">
        <div className="p-6 modal-box max-w-4xl">
          {/* header */}
          <div className="flex justify-between mb-5">
            <div className="flex flex-row items-end space-x-2">
              <span>
                <BsGraphUp className="w-8 h-8 bg-primary text-white" />
              </span>
              <span className="text-text-color text-xl font-sp-pro-text-semibold">
                Asset Details
              </span>
            </div>

            <div className="flex">
              {/*  */}
              <label htmlFor="view-asset">
                <RiCloseFill className="cursor-pointer h-9 w-9 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
              </label>
            </div>
          </div>

          <div className="lg:flex lg:space-x-8 md:space-x-0 sm:flex-row w-full">
            <div className="w-1/2 md:w-full">
              {/* slide */}
              <div className="">
                <div className="rounded-lg border shadow-sm border-slate-200">
                  <div className="carousel flex top-1/2">
                    <div className="">
                      <img
                        className="w-full h-full rounded-lg"
                        src={
                          itemDetail.image
                            ? `https://api.assettracer.net/api/v1/files/getFile?fileName=${itemDetail.image}`
                            : placeholder_square
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Information */}
              <div className="col-span-6">
                <div className="mt-5">
                  <h1 className="font-sp-pro-text-semibold text-base mb-2 text-text-color">
                    Asset Information
                  </h1>
                  <div className="grid md:grid-cols-2 rounded-lg border shadow-sm border-gray-light border-opacity-50">
                    <div className="p-3 px-5 md:border-r-2 md:border-r-none border-gray-light border-opacity-50">
                      <p className="font-sp-pro-text-medium text-text-color text-md">
                        Organization
                      </p>
                      <div className="flex flex-row items-center space-x-2 mt-3">
                        <span className="rounded-full">
                          {/* <BiHome className="w-6 h-6 text-yellow" /> */}

                          {CurrentOrg.logo != null && CurrentOrg.logo != "" ? (
                            <>
                              <img
                                src={FileUploadService.getImage(
                                  CurrentOrg.logo
                                )}
                                className=" w-8 h-8 rounded-full "
                              />
                            </>
                          ) : (
                            <>
                              <div className=" w-8 h-8 con-pro-color rounded-full flex justify-center items-center m-auto">
                                <p className="font-sp-pro-text-regular uppercase text-[12px] text-green ">
                                  {CurrentOrg.name.substring(0, 2)}
                                </p>
                              </div>
                            </>
                          )}
                        </span>
                        <span className="text-text-color text-md font-sp-pro-text-regular text-opacity-70">
                          {CurrentOrg.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 px-5">
                      <p className="font-sp-pro-text-medium text-text-color text-md">
                        Category Type
                      </p>
                      <div className="flex flex-row items-center space-x-2 mt-3">
                        {/* <span className="rounded-full"> */}
                          {itemDetail.normalCategoryIcon != "" ? (
                            
                            <img
                            className="h-8 rounded-full w-8"
                            src={
                              itemDetail.normalCategoryIcon  == "office.svg"
                                ? office
                                : itemDetail.normalCategoryIcon == "electronic.svg"
                                  ? electronic
                                  : itemDetail.normalCategoryIcon== "furniture.svg"
                                    ? furniture
                                    : FileUploadService.getImage(itemDetail.normalCategoryIcon)
                            }
                          />
                          ) : (
                            <>
                              <img src={placeholder} alt="" className="w-8 h-8 rounded-full "/>
                            </>
                          )}
                        {/* </span> */}
                        <span className="text-text-color text-[14px] font-sp-pro-text-regular text-opacity-70">
                          {itemDetail.normalCategoryName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 rounded-lg border shadow-sm border-gray-light border-opacity-50 mt-5">
                    <div className="p-3 px-5 md:border-r-2 md:border-r-none border-gray-light border-opacity-50">
                      <p className="font-sp-pro-text-medium text-text-color text-md">
                        QTY
                      </p>
                      <div className="flex flex-row items-center space-x-2 mt-3">
                        <span className="rounded-full">
                          <ProductionQuantityLimits className="w-6 h-6 text-yellow" />
                        </span>
                        <span className="text-text-color text-[14px] font-sp-pro-text-regular text-opacity-70">
                          {itemDetail.qty}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 px-5 ">
                      <p className="font-sp-pro-text-medium text-text-color text-md">
                        UnitPrice
                      </p>
                      <div className="flex flex-row items-center space-x-2 mt-3">
                        <span className="rounded-full">
                          <HiOutlineCurrencyDollar className="w-6 h-6 text-yellow" />
                        </span>
                        <span className="text-text-color text-[14px] font-sp-pro-text-medium text-opacity-70">
                          {itemDetail.unitPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Label code */}
            <div className="lg:mt-0 md:mt-5 mt-5 w-full">
              <div className="w-full">
                <Tab.Group>
                  <div
                    className="gap-6 bg-white rounded-lg overflow-hidden"
                    style={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 10px",
                    }}
                  >
                    <Tab.List className="flex space-x-1 text-text-color">
                      {/* <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`px-4 py-3 w-1/2 rounded-sm outline-none border-b-4 border-white ${
                              selected
                                ? "bg-custom-yellow-showdow-light border-b-primary"
                                : ""
                            }`}
                          >
                            Unset Label
                          </button>
                        )}
                      </Tab> */}

                      <Tab as={Fragment}>
                          <div
                            className=" w-full h-12  flex justify-center items-center font-sp-pro-text-semibold text-md rounded-sm border-b-4 border-white "
                          >
                            <span> Already Import</span>
                          </div>
                        
                      </Tab>
                    </Tab.List>
                  </div>
                  <div className="my-5">
                    <Tab.Panels>
                      <Tab.Panel>
                        {/* table */}
                        <div
                          className="bg-white p-4 rounded-lg overflow-y-auto h-[440px]"
                          style={{
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 10px",
                          }}
                        >
                          {itemDetail?.assets?.map((list, index) => (
                            <div
                              key={index}
                              className="w-full grid grid-cols-4 gap-2 mb-5 border-b-2 border-[#6DB33F] p-3 rounded-lg"
                            >
                              <div className="flex flex-col space-y-3">
                                <span className="text-text-color font-sp-pro-text-regular text-xs">
                                  Owner
                                </span>
                                <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                  {list.owner}
                                </span>
                              </div>

                              <div className="flex flex-col space-y-3">
                                <span className="text-text-color font-sp-pro-text-regular text-xs">
                                  Status
                                </span>
                                <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                  {list.status}
                                </span>
                              </div>
                              <div className="flex flex-col space-y-3">
                                <span className="text-text-color font-sp-pro-text-regular text-xs">
                                  Label Code
                                </span>
                                <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                  {list.labelCode}
                                </span>
                              </div>

                              <div className="flex flex-col space-y-3">
                                <span className="text-text-color font-sp-pro-text-regular text-xs">
                                  Serial Code
                                </span>
                                <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                  {list.serialCode}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>

                      <Tab.Panel>
                        {/* Unset lable */}
                        <div
                          className="bg-white p-4 rounded-lg overflow-y-auto h-[440px]"
                          style={{
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 10px",
                          }}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {itemDetail?.assets?.map((list) => (
                              <div className="w-full gap-2 mb-5 border-b-2 border-[#2076FF] p-3 rounded-lg">
                                <div className=" space-x-3 items-end pb-1.5">
                                  <span className="text-text-color font-sp-pro-text-regular text-sm">
                                    Owner :
                                  </span>
                                  <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                    {list.owner}
                                  </span>
                                </div>
                                <div className="  space-x-3 items-end py-1.5">
                                  <span className="text-text-color font-sp-pro-text-regular text-sm">
                                    Status :
                                  </span>
                                  <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                    {list.status}
                                  </span>
                                </div>
                                <div className=" space-x-3 items-end py-1.5">
                                  <span className="text-text-color font-sp-pro-text-regular text-sm">
                                    Label Code :
                                  </span>
                                  <span className="text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                    {list.labelCode}
                                  </span>
                                </div>
                                <div className=" space-x-3 py-1.5  ">
                                  <span className=" text-text-color font-sp-pro-text-regular text-sm">
                                    Serial Code :
                                  </span>
                                  <span className="text-left text-text-color font-sp-pro-text-regular text-xs text-opacity-70 break-words">
                                    {list.serialCode}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssetViewComponent;
