import React, { useEffect, useState } from "react";
import { BiCheck, BiHome } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineQrcode } from "react-icons/hi";
import { RiBarcodeFill } from "react-icons/ri";
import { TbCalendarStats } from "react-icons/tb";
import chair from "../../../assets/icon/normal_category/chair.svg";
import laptop from "../../../assets/icon/normal_category/laptop.svg";
import paper from "../../../assets/icon/normal_category/paper.svg";
import logo from "../../../assets/images/A_Tracer_logo1.png";
import { useDispatch, useSelector } from "react-redux";
import placeholder_square from "../../../assets/images/placeholder/placeholder_square.jpg";
import moment from "moment";
import FileUploadService from "../../../redux/services/FileUploadService";
import AssetService from "../../../redux/services/AssetService";
import { setAssets } from "../../../redux/slices/AssetSlice";
import placeholder from "../../../assets/images/placeholder/blue_placeholder.svg";
export default function ViewDetailComponent() {
  const organization = JSON.parse(sessionStorage.getItem("organization"));
  {
    console.log(organization);
  }
  let asset = useSelector((state) => state.asset.asset);
  const dispatch = useDispatch();
  useState(() => {
    AssetService.getAllAssets(organization.id).then((res) => {
      // {console.log("LL" , res)}
      if (res.data?.success) {
        dispatch(setAssets(res.data.payload));
      }
    });
  }, []);
  return (
    <div>
      <input type="checkbox" id="view-detail" className="modal-toggle" />
      <div className="modal">
        <div className="bg-bg-primary p-6 modal-box w-8/12 max-w-3xl">
          {/* header */}
          <div className="flex justify-between mb-5 px-5">
            <div className="flex">
              <span>
                <BsGraphUp className="w-8 h-8 bg-primary text-white" />
              </span>
              <span className="pl-3 text-text-color text-xl font-sp-pro-text-semibold">
                Tracking Details
              </span>
            </div>
            <div className="flex">
              <label
                htmlFor="view-detail"
                className="btn border-red-500 bg-white text-red-500 hover:bg-white hover:border-red-400 btn-sm btn-circle absolute right-4 top-4"
              >
                ✕
              </label>
            </div>
          </div>
          {console.log(asset)}
          {/* Content */}
          <div className="lg:flex lg:space-x-6 md:space-x-0 sm:flex-row justify-center">
            <div className="px-4 grid grid-cols-1">
              <div className=" col-span-6 rounded-lg border shadow-sm border-slate-200">
                <div className="relative w-full flex justify-center">
                  {asset?.itemDetail?.image ? (
                    <img
                      className=" object-cover w-80 h-80 rounded-3xl p-4"
                      src={FileUploadService.getImage(asset?.itemDetail?.image)}
                    />
                  ) : (
                    <img
                      className="object-cover w-80 h-80 rounded-3xl p-8"
                      src={placeholder_square}
                    />
                  )}
                </div>
              </div>

              <div className="lg:mt-0">
                <h1 className="mt-6 font-sp-pro-text-semibold text-base mb-2 text-text-color">
                  Asset Information
                </h1>
                <div className="grid lg:grid-cols-2 rounded-lg border shadow-sm border-slate-200">
                  <div className="p-4 lg:border-r-2 md:border-r-none border-gray-light h-[92px] mt-[10px]">
                    <label
                      htmlFor="view-detail"
                      className="font-sp-pro-text-semibold text-text-color"
                    >
                      Organization
                    </label>
                    <div className="mt-3">
                      <p className="flex items-center">
                        {organization.logo != "" ? (
                          <img
                            src={FileUploadService.getImage(organization.logo)}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full flex justify-center bg-green  items-center text-white font-sp-pro-text-semibold text-base ">
                            {organization.name.substring(0, 1)}
                          </div>
                        )}
                        <span className="text-text-color text-sm font-sp-pro-text-regular pl-3">
                          {organization.name}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 lg:mt-0 md:mt-[-90px]">
                    <div className="mt-3">
                      <label
                        htmlFor="view-detail"
                        className="font-sp-pro-text-semibold text-text-color"
                      >
                        Room Name
                      </label>
                      <div className="mt-3">
                        <p className="flex items-center">
                          {asset.roomImage != null ? (
                            <img
                              src={FileUploadService.getImage(asset.roomImage)}
                              alt=""
                              className="w-9 h-9 rounded-full"
                            />
                          ) : (
                            <img
                              src={placeholder}
                              alt=""
                              className="w-9 h-9 rounded-full"
                            />
                          )}
                          <span className="text-text-color text-sm font-sp-pro-text-regular pl-3">
                            {asset.roomName != null ? asset.roomName : "....."}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mt-0">
              {/* Usage */}
              <div className="">
                <h1 className="font-sp-pro-text-semibold text-base mb-2 text-text-color">
                  Usage
                </h1>
                <div className="grid lg:grid-cols-2 rounded-lg border shadow-sm border-slate-200">
                  <div className="p-4 lg:border-r-2 md:border-r-none border-gray-light h-[92px] mt-[10px]">
                    <div className="mt-[-10px]">
                      <label
                        htmlFor="view-detail"
                        className="font-sp-pro-text-semibold text-text-color"
                      >
                        Status
                      </label>
                      <div className="mt-3">
                        <div className=" bg-lightorange w-max border border-yellow text-yellow rounded-lg p-1">
                          <span className="text-yellow flex px-2">
                            {asset?.status?.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div>
                      <label
                        htmlFor="view-detail"
                        className="font-sp-pro-text-semibold text-text-color"
                      >
                        Owner
                      </label>
                      <div className="mt-3">
                        <div className=" bg-lightorange w-max border border-yellow text-yellow rounded-lg p-1">
                          <span className="text-yellow flex px-2">
                            {asset.owner != ""
                              ? asset?.owner?.replace(/_/g, " ").toUpperCase()
                              : "....."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Information */}
              <div className="​​​col-span-6​">
                <div className="mt-5">
                  <h1 className="font-sp-pro-text-semibold text-base mb-2 text-text-color">
                    Admin Information
                  </h1>
                  <div className="pl-2 grid lg:grid-cols-2 rounded-lg border shadow-sm border-slate-200">
                    <div className="p-2 lg:border-r-2 md:border-r-none border-gray-light h-[85px] mt-[10px]">
                      <label
                        htmlFor="view-detail"
                        className="font-sp-pro-text-semibold text-text-color"
                      >
                        Create by
                      </label>
                      <div className="mt-3">
                        <div className=" bg-lightorange w-max border border-green text-yellow rounded-lg p-1">
                          <span className="text-green flex px-2">
                            {organization?.roleName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:border-r-none border-gray-light h-[85px] mt-[4px]">
                      <div>
                        <label
                          htmlFor="view-detail"
                          className="font-sp-pro-text-semibold text-text-color"
                        >
                          Create date
                        </label>
                        <div className="mt-3">
                          <div className=" bg-lightorange w-max border border-green text-green rounded-lg p-1">
                            <span className="text-green flex px-2">
                              {moment(asset.createdAt).format("MMM DD YYYY")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* code */}
              <h1 className="mt-6 font-sp-pro-text-semibold text-base mb-2 text-text-color">
                Identifier
              </h1>
              <div className=" mt-2 flex justify-between rounded-lg border shadow-sm border-slate-200">
                <div className="col-span-6 p-4  md:border-r-none border-gray-light h-[80px] mt-[10px]">
                  <div className="text-[#D3DCE6] border-r-2 mt-[-10px] pr-14">
                    <label
                      htmlFor="view-detail"
                      className="font-sp-pro-text-semibold text-text-color"
                    >
                      Label code
                    </label>
                    <div className="mt-3">
                      <div className=" bg-lightorange w-max border border-yellow text-yellow rounded-lg p-1">
                        <span className="text-yellow flex px-2">
                          {asset?.labelCode?.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-span-6 p-4">
                  <div>
                    <label
                      htmlFor="view-detail"
                      className="font-sp-pro-text-semibold text-text-color"
                    >
                      Serial code
                    </label>
                    <div className="mt-3">
                      <div className=" bg-lightorange w-max border border-yellow text-yellow rounded-lg p-1">
                        <span className="text-yellow flex px-2">
                          {asset?.serialCode?.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-2 mt-3 flex justify-between rounded-lg border shadow-sm border-slate-200">
                <label
                  htmlFor="view-detail"
                  className=" font-sp-pro-text-semibold text-text-color"
                >
                  Category Type
                </label>

                <div className=" bg-lightorange w-max border border-yellow text-yellow rounded-lg p-1">
                  <span className="text-yellow">
                    {asset?.itemDetail?.normalCategoryName
                      ?.replace(/_/g, " ")
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
