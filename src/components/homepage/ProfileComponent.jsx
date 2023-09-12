import React from "react";
import hongmenng from "../../assets/images/Iconteam/hongmenng.png";
import Pen from "../../assets/images/updatePicture/Pen.png";
import Image from "../../assets/images/updatePicture/Image.png";
export default function ProfileComponent() {
  return (
    <>
      <div className="w-[1000px] h-[680px] bg-[#F4F7FA] border border-white rounded-lg mx-auto my-8">
        <div className="w-[99%] h-[200px] bg-white mt-5 rounded-md relative ml-2.5 shadow-sm shadow-gray-light">
          <label
            htmlFor="my-modal-3"
            className="bg-small-gray btn-sm btn-circle absolute right-7 top-3 flex items-center justify-center"
          >
            <img src={Pen} alt="" className="w-[16px] " />
          </label>
          {/* Toggle Form */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="w-[700px] h-[490px] bg-white rounded-lg  relative">
              <label
                htmlFor="my-modal-3"
                className="bg-shadow flex items-center justify-center btn-sm btn-circle absolute right-2 top-2 text-xl font-sp-pro-text-bold"
              >
                x
              </label>
              <div className=" mt-6 w-[85%] mx-auto">
                <div className="mb-3 ">
                  <div className="mb-4 text-text-color font-sp-pro-text-medium ">
                    My Profile
                  </div>
                  <div className="w-[90px] mx-auto rounded-full shadow-lg shadow-gray-light relative ">
                    <img src={hongmenng} alt="" className="w-[90px] " />
                    <div className="absolute w-[90px] h-12 bg-black bottom-0 pt-2 rounded-b-full text-md bg-opacity-30 text-white">
                      Edit
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-1">
                  <div className="mb-3 col-span-6">
                    <div className=" w-[250px] mx-auto ">
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          User Name
                        </label>
                        <input
                          type="name"
                          className="text-sm border-border-strock border-2 rounded-md block  w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                          placeholder="Leng Hongmeng "
                        />
                      </div>
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          Phone
                        </label>
                        <input
                          type="phone"
                          className="text-sm border-border-strock border-2 rounded-md block w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                          placeholder="010 443 789 "
                        />
                      </div>
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          Gender
                        </label>
                        <select className=" select-bordered text-sm border-border-strock border-2 rounded-md block w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white ">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 col-span-6 ">
                    <div className="w-[250px] mx-auto ">
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          Email
                        </label>
                        <input
                          type="email"
                          className="text-sm border-border-strock border-2 rounded-md block w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white "
                          placeholder=" hongmeng@gmail.com"
                        />
                      </div>
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          Role
                        </label>
                        <select className="text-sm border-border-strock border-2 rounded-md block w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white ">
                          <option>Admin</option>
                          <option>User</option>
                        </select>
                      </div>
                      <div className="text-left mb-3">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">
                          Address
                        </label>
                        <input
                          type="address"
                          className="text-sm border-border-strock border-2 rounded-md block w-[250px] py-2 px-2 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                          placeholder="Chroy Changva, Phnom Penh"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body items-center text-center">
                  <div className="card-actions">
                    <button className=" bg-pending hover:bg-hover-yellow px-7 py-1 -mt-2 font-sp-pro-text-semibold rounded-md text-white">
                      <div className="w-40">Submit</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Top */}
          <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-10">
            <div className=" col-span-5">
              <div className="flex justify-center items-center text-text-color font-sp-pro-text-regular text-left space-x-10 mt-5">
                <div>
                  {" "}
                  <img src={hongmenng} alt="" className="w-[90px]" />
                </div>
                <div className=" text-sm space-y-2">
                  <div> Leng Hongmeng</div>
                  <div className="">
                    Role : <span className="text-pending ">Admin</span>{" "}
                  </div>
                  <div>Create Date: 1st Jan 2023</div>
                </div>
              </div>
            </div>

            <div className=" col-span-7 mb-3">
              <div className="flex items-center text-left text-text-color font-sp-pro-text-regular space-x-5 mt-3">
                <div className=" border-dashed border-l-2 border-l-gray h-[135px]"></div>
                <div className="text-sm space-y-2">
                  <div>
                    Phone{" "}
                    <span className="ml-16">
                      : <span className="text-yellow">0103356788</span>
                    </span>
                  </div>
                  <div>
                    Email{" "}
                    <span className="ml-[71px]">
                      : <span className="text-yellow">hongmeng@gmail.com</span>
                    </span>{" "}
                  </div>
                  <div>
                    Gender <span className="ml-[57px]">: Male</span>
                  </div>
                  <div>
                    Address{" "}
                    <span className="ml-[53px]">
                      : Chroy Changva, Chroy Changva, Phnom Penh
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className=" border-gray-light border-[1px] sm:mx-auto" />
          <div className="flex justify-between text-sm text-text-color font-sp-pro-text-medium ">
            <div className="hover:bg-shadow py-[8.5px] px-10 rounded-bl-md hover:border-b-4 hover:border-b-pending">
              <div className=" ">Your Organization</div>
            </div>
            <div className="hover:bg-shadow py-[8.5px] px-10 hover:border-b-4 hover:border-b-pending">
              <div className=" ">Change Password</div>
            </div>
          </div>
        </div>
        {/* Card Button */}
        <div className="w-[99%] h-[418px] bg-white mx-auto mt-5 rounded-md relative ml-2.5 shadow-sm shadow-gray-light">
          <div className="flex justify-evenly pt-6">
            <div className="card w-[220px] h-[370px] rounded-md shadow-gray-light shadow-md bg-white">
              <div className="text-left ml-4 mt-3 text-text-color font-sp-pro-text-regular">
                <div className="flex">
                  <div className="text-[14px] mb-3 font-sp-pro-text-semibold">
                    Office Manegement
                  </div>
                  <label
                    htmlFor="my-modal-1"
                    className="bg-small-gray btn-sm btn-circle rounded-full absolute right-2 top-2  flex items-center justify-center"
                  >
                    X
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-1"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="w-[25%] h-[280px] bg-white rounded-md relative">
                      <label
                        htmlFor="my-modal-1"
                        className="bg-small-gray btn-sm btn-circle rounded-full absolute right-2 top-2  flex items-center justify-center"
                      >
                        ✕
                      </label>
                      <div className="w-[90%] mx-auto">
                        <div className=" w-[70px] h-[70px] bg-red bg-opacity-25 rounded-full mx-auto mt-5 mb-3"></div>
                        <div className="mb-5 text-center text-text-color">
                          <div className="font-sp-pro-text-semibold">
                            You want to delete?
                          </div>
                          <div className="text-sm mt-3">
                            Do you really want to delete these organization?
                            This process cannot be undone.
                          </div>
                        </div>
                        <hr className=" border-gray-light border-[1px] mx-auto " />
                        <div className="mt-6 mx-auto flex justify-evenly w-[85%] ">
                          <button
                            type="button"
                            className=" py-1.5 rounded-sm text-text-color bg-small-gray border hover:bg-gray hover:bg-opacity-25 border-gray font-medium text-sm px-5 text-center "
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="py-1.5 rounded-sm text-red bg-red bg-opacity-20 font-medium border border-red text-sm px-5 text-center hover:bg-red hover:bg-opacity-25 "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="line-clamp-3 w-[95%] text-sm mb-3">
                  In literary theory, a text is any object that can be "read" It
                  is a coherent set of signs that transmits some kind of
                  informative message.
                </div>
                <div className="text-[14px] font-sp-pro-text-medium">
                  Date of create:{" "}
                  <div className="text-sm mb-3">05 Apri 2023</div>
                </div>
                <div className="text-[14px] font-sp-pro-text-medium mb-2">
                  Organization Owner:
                </div>
                <div className="mb-3 ">
                  {" "}
                  <img src={Image} alt="" className="w-[30px]" />
                </div>

                <div className="text-[14px] font-sp-pro-text-medium">
                  Member: 12
                  <div className="flex rounded-full  relative">
                    <div className=" inline-flex rounded-full items-center w-8 h-8 object-cover bg-white z-40 top-[7%] right-[7%]">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-30 top-[6%] left-[10%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-20 top-[6%] left-[20%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-10 top-[7%] left-[30%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-shadow w-7 h-7 object-cover z-0 top-[7%] left-[40%] ">
                      <p className="ml-[5px]">+8</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className=" bg-pending px-7 py-1 -mt-2 font-sp-pro-text-semibold rounded-md text-white">
                    <div className="w-20">Join</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="card w-[220px] h-[370px] rounded-md shadow-gray-light shadow-md bg-white">
              <div className="text-left text-text-color ml-4 mt-3 font-sp-pro-text-regular">
                <div className="text-[16px] mb-3 font-sp-pro-text-semibold">
                  Office Manegement
                </div>
                <div className="line-clamp-3 w-[95%] text-sm mb-3">
                  In literary theory, a text is any object that can be "read" It
                  is a coherent set of signs that transmits some kind of
                  informative message.
                </div>
                <div className="text-[14px] font-sp-pro-text-medium">
                  Date of create:{" "}
                  <div className="text-sm mb-3">05 Apri 2023</div>
                </div>
                <div className="text-[14px] font-sp-pro-text-medium mb-2">
                  Organization Owner:
                </div>
                <div className="mb-3 ">
                  {" "}
                  <img src={Image} alt="" className="w-[30px]" />
                </div>

                <div className="text-[14px] font-sp-pro-text-medium">
                  Member: 12
                  <div className="flex rounded-full  relative">
                    <div className=" inline-flex rounded-full items-center w-8 h-8 object-cover bg-white z-40 top-[7%] right-[7%]">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-30 top-[6%] left-[10%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-20 top-[6%] left-[20%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-10 top-[7%] left-[30%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-shadow w-7 h-7 object-cover z-0 top-[7%] left-[40%] ">
                      <p className="ml-[5px]">+8</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className=" bg-pending px-7 py-1 -mt-2 font-sp-pro-text-semibold rounded-md text-white">
                    <div className="w-20">Join</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="card w-[220px] h-[370px] rounded-md shadow-gray-light shadow-md bg-white">
              <div className="text-left ml-4 text-text-color mt-3 font-sp-pro-text-regular">
                <div className="text-[16px] mb-3 font-sp-pro-text-semibold">
                  Office Manegement
                </div>
                <div className="line-clamp-3 w-[95%] text-sm mb-3">
                  In literary theory, a text is any object that can be "read" It
                  is a coherent set of signs that transmits some kind of
                  informative message.
                </div>
                <div className="text-[14px] font-sp-pro-text-medium">
                  Date of create:{" "}
                  <div className="text-sm mb-3">05 Apri 2023</div>
                </div>
                <div className="text-[14px] font-sp-pro-text-medium mb-2">
                  Organization Owner:
                </div>
                <div className="mb-3 ">
                  {" "}
                  <img src={Image} alt="" className="w-[30px]" />
                </div>

                <div className="text-[14px] font-sp-pro-text-medium">
                  Member: 12
                  <div className="flex rounded-full  relative">
                    <div className=" inline-flex rounded-full items-center w-8 h-8 object-cover bg-white z-40 top-[7%] right-[7%]">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-30 top-[6%] left-[10%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-20 top-[6%] left-[20%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-10 top-[7%] left-[30%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-shadow w-7 h-7 object-cover z-0 top-[7%] left-[40%] ">
                      <p className="ml-[5px]">+8</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className=" bg-pending px-7 py-1 -mt-2 font-sp-pro-text-semibold rounded-md text-white">
                    <div className="w-20">Join</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="card w-[220px] h-[370px] rounded-md shadow-gray-light shadow-md bg-white">
              <div className="text-left ml-4 mt-3 text-text-color font-sp-pro-text-regular">
                <div className="text-[16px] mb-3 font-sp-pro-text-semibold">
                  Office Manegement
                </div>
                <div className="line-clamp-3 w-[95%] text-sm mb-3">
                  In literary theory, a text is any object that can be "read" It
                  is a coherent set of signs that transmits some kind of
                  informative message.
                </div>
                <div className="text-[14px] font-sp-pro-text-medium">
                  Date of create:{" "}
                  <div className="text-sm mb-3">05 Apri 2023</div>
                </div>
                <div className="text-[14px] font-sp-pro-text-medium mb-2">
                  Organization Owner:
                </div>
                <div className="mb-3 ">
                  {" "}
                  <img src={Image} alt="" className="w-[30px]" />
                </div>

                <div className="text-[14px] font-sp-pro-text-medium">
                  Member: 12
                  <div className="flex rounded-full  relative">
                    <div className=" inline-flex rounded-full items-center w-8 h-8 object-cover bg-white z-40 top-[7%] right-[7%]">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-30 top-[6%] left-[10%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-20 top-[6%] left-[20%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-white w-8 h-8 object-cover z-10 top-[7%] left-[30%] ">
                      <img src={Image} alt="" className="w-[40px]" />
                    </div>
                    <div className=" inline-flex absolute rounded-full items-center bg-shadow w-7 h-7 object-cover z-0 top-[7%] left-[40%] ">
                      <p className="ml-[5px]">+8</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className=" bg-pending px-7 py-1 -mt-2 font-sp-pro-text-semibold rounded-md text-white">
                    <div className="w-20">Join</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
