import React from "react";
import logo from "../../../assets/images/A_Tracer_logo1.png";

// import icon from react icon
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import DashboardService from "../../../redux/services/DashboardService";
import {
  setBrokenAssets,
  setCategoryName,
  setCurrentUSer,
  setDamageAssets,
  setDonatedAssets,
  setInStockAssets,
  setInUsedAssets,
  setLastInvoice,
  setLostAssets,
  setSuperCategory,
  setTotalInvoices,
  setTotalItems,
  setTotalRooms,
  setTotalUsers,
} from "../../../redux/slices/DashboardSlice";
import UserService from "../../../redux/services/UserService";
import { useEffect } from "react";
import { useState } from "react";
import InvoiceService from "../../../redux/services/InvoiceService";
import moment from "moment/moment";
import FileUploadService from "../../../redux/services/FileUploadService";
import no_data_pic from "../../../assets/images/empty_box.png";
export default function DashboardComponent() {
  const org = JSON.parse(sessionStorage.getItem("organization"));
  const item = useSelector((state) => state.organization.item);

  // const itemsDetail = useSelector((state) => state.items.itemsDetail)
  const totalUsers = useSelector((state) => state.dashboard.totalUser);
  const totalItems = useSelector((state) => state.dashboard.totalItem);
  const totalRooms = useSelector((state) => state.dashboard.totalRoom);
  const totalInvoice = useSelector((state) => state.dashboard.totalInvoice);
  const lastThreeInvoice = useSelector((state) => state.dashboard.lastInvoice);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const dispath = useDispatch();

  // ============ Get Total Users =============
  const getTotalUserInOrg = () => {
    DashboardService.getTotalUserInOrg(org.id).then((res) => {
      setIsShowLoading(true);
      if (res.data?.success) {
        dispath(setTotalUsers(res.data.payload));
        setTimeout(() => {
          setIsShowLoading(false);
        }, 500);
      }
    });
  };

  // ============ Get Total Items =============
  const getTotalItems = () => {
    DashboardService.getTotalAssetInOrg(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setTotalItems(res.data.payload));
        }
      },
      (err) => {
        dispath(setTotalItems(0));
      }
    );
  };

  // ============ Get Total Rooms =============
  const getTotalRooms = () => {
    DashboardService.getTotalRoomInOrg(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setTotalRooms(res.data.payload));
        }
      },
      (err) => {
        dispath(setTotalRooms(0));
      }
    );
  };

  // ============ Get Total Invoices =============
  const getTotalInvoices = () => {
    DashboardService.getTotalInvoiceInOrg(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setTotalInvoices(res.data.payload));
        }
      },
      (err) => {
        dispath(setTotalInvoices(0));
      }
    );
  };

  // ============ Get last 3 Invoices =============
  const getAllInvoices = () => {
    InvoiceService.getAllInvoices(org.id, 1, 3).then(
      (res) => {
        if (res.data?.success) {
          dispath(setLastInvoice(res.data.payload));
        }
      },
      (err) => {
        dispath(setLastInvoice([]));
      }
    );
  };

  const users = useSelector((state) => state.dashboard.users);
  const getUserInOrganizations = () => {
    UserService.getUserAllInOrganizations(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setCurrentUSer(res.data.payload));
        }
      },
      (err) => {
        dispath(setCurrentUSer([]));
      }
    );
  };

  // =====================================
  //               Pie Chart
  //======================================
  const inStockAsset = useSelector((state) => state.dashboard.inStocks);
  const inUsedAsset = useSelector((state) => state.dashboard.inUseds);
  const damageAsset = useSelector((state) => state.dashboard.damages);
  const donatedAsset = useSelector((state) => state.dashboard.donateds);
  const brokenAsset = useSelector((state) => state.dashboard.broken);
  const lostAsset = useSelector((state) => state.dashboard.lost);

  const getTotalAssetInStock = () => {
    DashboardService.getTotalAssetInStock(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setInStockAssets(res.data.payload));
        }
      },
      (err) => {
        dispath(setInStockAssets(0));
      }
    );
  };

  // ----- get total Asset in used ------
  const getTotalAssetInUsed = () => {
    DashboardService.getTotalAssetInUsed(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setInUsedAssets(res.data.payload));
        }
      },
      (err) => {
        dispath(setInUsedAssets(0));
      }
    );
  };

  // ----- get total Asset damages ------
  const getTotalAssetDamage = () => {
    DashboardService.getTotalAssetDamage(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setDamageAssets(res.data.payload));
        }
      },
      (srr) => {
        dispath(setDamageAssets(res.data.payload));
      }
    );
  };

  // ----- get total Asset damages ------
  const getTotalAssetDonated = () => {
    DashboardService.getTotalAssetDonated(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setDonatedAssets(res.data.payload));
        }
      },
      (err) => {
        dispath(setDonatedAssets(0));
      }
    );
  };

  // ----- get total Asset Broken ------
  const getTotalAssetBroken = () => {
    DashboardService.getTotalAssetBroken(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setBrokenAssets(res.data.payload));
        }
      },
      (err) => {
        dispath(setBrokenAssets(0));
      }
    );
  };

  // ----- get total Asset Lost ------
  const getTotalAssetLost = () => {
    DashboardService.getTotalAssetLost(org.id).then(
      (res) => {
        if (res.data?.success) {
          dispath(setLostAssets(res.data.payload));
        }
      },
      (err) => {
        dispath(setLostAssets(0));
      }
    );
  };

  // ===================================
  //           Bar Chart
  //====================================
  let assetPerSuperCategory = useSelector(
    (state) => state.dashboard.superCategory
  );
  const getSuperCategoryName = useSelector(
    (state) => state.dashboard.superCategoryName
  );

  let data = [];
  let getCategory = [];
  let getCategoryName = [];

  const getTotalAssetPerCategory = () => {
    DashboardService.getTotalAssetPerCategory(org.id).then(
      (res) => {
        if (res.data?.success) {
          data = res.data.payload;
          data.map((list) => {
            if (list.countAsset != null) {
              getCategory.push(list.countAsset);
            } else {
              getCategory.push(0);
            }
            getCategoryName.push(list.name);
          });
          dispath(setSuperCategory(getCategory));
          dispath(setCategoryName(getCategoryName));
        }
      },
      (err) => {
        dispath(setSuperCategory([]));
        dispath(setCategoryName([]));
      }
    );
  };
  const getLastThreeInvoice = () => {
    DashboardService.getLastThreeInvoice(org.id).then(
      (res) => {
        if (res.lastInvoice?.success) {
          dispath(setLastInvoice(res.lastInvoice.payload));
        }
      },
      (err) => {
        dispath(setLastInvoice([]));
      }
    );
  };

  useEffect(() => {
    getTotalUserInOrg();
    getTotalItems();
    getTotalRooms();
    getTotalInvoices();
    getTotalAssetInStock();
    getTotalAssetInUsed();
    getTotalAssetDamage();
    getTotalAssetDonated();
    getTotalAssetBroken();
    getTotalAssetLost();
    getAllInvoices();
    getUserInOrganizations();
    getTotalAssetPerCategory();
    getLastThreeInvoice();

    console.log(assetPerSuperCategory);
    if (assetPerSuperCategory.length == 0) {
      assetPerSuperCategory = [];
    }
  }, [item]);

  return (
    <>
      <main
        className="lg:h-full md:h-[205vh] "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.1) 0px 1px 4px 1px",
          height: "calc(100vh - 6rem)",
        }}
      >
        <div className="p-10 bg-white rounded-xl overflow-hidden">
          {/* header */}
          <div className="mb-5">
            <h2 className="text-2xl text-text-color font-sp-pro-text-semibold uppercase">
              Dashboard
            </h2>
          </div>

          {/* Card Box1 */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-5">
            {/* total user */}
            <div className="  rounded-lg con-Shadow-Card relative  overflow-hidden flex transition-all duration-200 ease-in-out bg-gray-50 group ">
              <span className=" absolute  bottom-0 left-0 w-full h-1 transition-all duration-200 ease-in-out bg-[#ffcb03]  group-hover:h-full"></span>
              <div className="relative p-5 w-full transition-colors duration-200 ease-in-out  group-hover:text-white ">
                <div>
                  <div>
                    <h1 className="text-[#ffcb03] group-hover:text-white w-full font-sp-pro-text-bold text-md uppercase">
                      total users
                    </h1>
                  </div>
                  <div className="flex justify-between items-center font-sp-pro-text-regular mt-4">
                    <span className="text-2xl font-sp-pro-text-bold text-text-color group-hover:text-white">
                      {totalUsers}
                    </span>
                  </div>
                </div>
              </div>
              <div className=" group-hover:text-white flex items-center px-7 ">
                <div className="w-14 h-14 bg-[#ffcb03] bg-opacity-25 rounded-lg flex items-center px-3 z-30 group-hover:bg-white ">
                  <svg
                    className=" group-hover:fill-white "
                    width="36px"
                    height="36px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"
                      fill="#ffcb03"
                    />
                    <path
                      d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z"
                      fill="#ffcb03"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"
                      fill="#ffcb03"
                    />
                    <path
                      d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"
                      fill="#ffcb03"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* </div> */}

            {/* total asset */}
            <div className="  rounded-lg con-Shadow-Card relative  overflow-hidden flex  transition-all duration-200 ease-in-out p- bg-gray-50 group ">
              <span className=" absolute  bottom-0 left-0 w-full h-1 transition-all duration-200 ease-in-out bg-[#5ec576]  group-hover:h-full"></span>
              <div className="relative p-5 w-full  transition-colors duration-200 ease-in-out  ">
                <div>
                  <h1 className="text-[#5ec576] group-hover:text-white font-sp-pro-text-bold text-md uppercase">
                    total assets
                  </h1>
                </div>
                <div className="flex justify-between items-center font-sp-pro-text-regular mt-4">
                  <span className="text-2xl font-sp-pro-text-bold text-text-color group-hover:text-white">
                    {totalItems}
                  </span>
                </div>
              </div>
              <div className=" group-hover:text-white flex items-center px-7 ">
                <div className="w-14 h-14 bg-[#5ec576] bg-opacity-25 rounded-lg flex items-center px-3 z-30 group-hover:bg-white ">
                  <svg
                    fill="#5ec576"
                    width="36px"
                    height="36px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    id="package-alt"
                    className="icon glyph"
                  >
                    <path
                      d="M12.54,10.67l-.54.27-.54-.27-8-4s0,0,0,0h0l8-4.5a1,1,0,0,1,1,0l8,4.5h0s0,0,0,0l-4,2a.24.24,0,0,0-.09-.06l-4-2a1,1,0,0,0-.9,1.78l2.77,1.39ZM3,7.56a.06.06,0,0,1,0,0v9a1,1,0,0,0,.51.87l8,4.49v-10l-.5-.25Zm18,0-4,2V14a1,1,0,0,1-2,0V10.56l-2.5,1.25v10l8-4.49A1,1,0,0,0,21,16.5v-9A.06.06,0,0,1,21,7.56Z"
                      fill="fill:#231f20"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* total room */}
            <div className=" rounded-lg con-Shadow-Card relative flex  overflow-hidden   transition-all duration-200 ease-in-out p- bg-gray-50 group">
              <span className=" absolute  bottom-0 left-0 w-full h-1 transition-all duration-200 ease-in-out bg-[#ff585f]  group-hover:h-full"></span>
              <div className="relative p-5 w-full  transition-colors duration-200 ease-in-out  ">
                <div>
                  <h1 className=" text-[#ff585f] group-hover:text-white font-sp-pro-text-bold text-md uppercase">
                    total rooms
                  </h1>
                </div>
                <div className="flex justify-between items-center font-sp-pro-text-regular mt-4">
                  <span className="text-2xl font-sp-pro-text-bold text-text-color  group-hover:text-white ">
                    {totalRooms}
                  </span>
                </div>
              </div>
              <div className=" group-hover:text-white flex items-center px-7 ">
                <div className="w-14 h-14 bg-[#ff585f] bg-opacity-25 rounded-lg flex items-center px-3 z-30 group-hover:bg-white ">
                  <svg
                    fill="#ff585f"
                    width="36px"
                    height="36px"
                    viewBox="-1.5 0 19 19"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cf-icon-svg"
                  >
                    <path d="M14.993 7.61a.554.554 0 0 1-.756.207L7.98 4.255 1.764 7.817a.554.554 0 0 1-.55-.962l1.192-.683v-2.48a.476.476 0 0 1 .475-.474h1.222a.476.476 0 0 1 .475.475v1.234l3.126-1.79a.554.554 0 0 1 .55-.001l6.531 3.718a.554.554 0 0 1 .208.756zm-1.399.937v6.198a.476.476 0 0 1-.475.475H2.881a.476.476 0 0 1-.475-.475v-6.2L7.98 5.353zm-6.782 1.01H4.578v2.262h2.234zm4.61 0H9.188v2.262h2.234z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* total invoice */}
            <div className="  rounded-lg con-Shadow-Card relative flex overflow-hidden   transition-all duration-200   ease-in-out p- bg-gray-50 group">
              <span className=" absolute  bottom-0 left-0 w-full h-1 transition-all duration-200 ease-in-out bg-blue-500  group-hover:h-full"></span>
              <div className="relative p-5 w-full  transition-colors duration-200 ease-in-out  ">
                {/* <div> */}
                <div>
                  <h1 className="text-blue-500 font-sp-pro-text-bold text-md  group-hover:text-white uppercase">
                    total invoices
                  </h1>
                </div>
                <div className="flex justify-between items-center font-sp-pro-text-regular mt-4">
                  <span className="text-2xl font-sp-pro-text-bold text-text-color  group-hover:text-white ">
                    {totalInvoice}
                  </span>
                </div>
              </div>
              <div className=" group-hover:text-white flex items-center px-7 ">
                <div className="w-14 h-14 bg-blue-500  bg-opacity-25 rounded-lg flex items-center px-3 z-30 group-hover:bg-white ">
                  <svg
                    fill="#0082F6"
                    height="36px"
                    width="36px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M460.8,0H127.923c-23.526,0-42.667,19.14-42.667,42.667v349.807l-59.58-0.017C11.52,392.457,0,403.977,0,418.133V460.8
				C0,489.037,22.963,512,51.2,512h324.267c0.06,0,0.111-0.034,0.171-0.034c12.629-0.068,24.892-4.753,34.27-13.278
				c10.65-9.685,16.759-23.492,16.759-37.888V119.543h59.657c14.157,0,25.677-11.52,25.677-25.677V51.2
				C512,22.963,489.037,0,460.8,0z M204.8,51.2h102.4c4.71,0,8.533,3.814,8.533,8.533s-3.823,8.533-8.533,8.533H204.8
				c-4.71,0-8.533-3.814-8.533-8.533S200.09,51.2,204.8,51.2z M145.067,102.4h221.867c4.71,0,8.533,3.814,8.533,8.533
				s-3.823,8.533-8.533,8.533H145.067c-4.71,0-8.533-3.814-8.533-8.533S140.356,102.4,145.067,102.4z M145.067,153.6h221.867
				c4.71,0,8.533,3.814,8.533,8.533s-3.823,8.533-8.533,8.533H145.067c-4.71,0-8.533-3.814-8.533-8.533S140.356,153.6,145.067,153.6
				z M51.2,494.933c-18.825,0-34.133-15.309-34.133-34.133v-42.667c0-4.753,3.866-8.61,8.602-8.61l298.598,0.077v49.365v1.835
				c0,0.614,0.145,1.195,0.171,1.8c0.06,0.956,0.154,1.903,0.264,2.85c1.033,11.247,5.495,21.513,12.638,29.483H51.2z
				 M298.667,375.467c-36.386,0-67.934-20.855-83.507-51.2h-70.093c-4.71,0-8.533-3.814-8.533-8.533s3.823-8.533,8.533-8.533h63.369
				c-2.313-8.149-3.635-16.717-3.635-25.6c0-2.884,0.179-5.717,0.435-8.533h-60.169c-4.71,0-8.533-3.814-8.533-8.533
				s3.823-8.533,8.533-8.533h63.369c3.601-12.655,9.711-24.252,17.877-34.133h-81.246c-4.71,0-8.533-3.814-8.533-8.533
				c0-4.719,3.823-8.533,8.533-8.533h99.797c15.258-10.718,33.783-17.067,53.803-17.067c51.755,0,93.867,42.112,93.867,93.867
				C392.533,333.355,350.421,375.467,298.667,375.467z M494.933,93.867c0,4.753-3.866,8.61-8.61,8.61h-59.657V51.2
				c0-18.825,15.309-34.133,34.133-34.133c18.825,0,34.133,15.309,34.133,34.133V93.867z"
                          />
                          <path
                            d="M298.667,204.797c-42.342,0-76.8,34.449-76.8,76.8c0,42.351,34.458,76.8,76.8,76.8s76.8-34.449,76.8-76.8
				C375.467,239.247,341.009,204.797,298.667,204.797z M348.433,252.2l-51.2,76.8c-1.417,2.125-3.721,3.507-6.255,3.755
				c-0.29,0.026-0.563,0.043-0.845,0.043c-2.253,0-4.429-0.887-6.033-2.5l-34.133-34.133c-3.336-3.328-3.336-8.73,0-12.066
				c3.337-3.328,8.73-3.328,12.066,0l26.778,26.778l45.423-68.139c2.62-3.917,7.91-4.983,11.836-2.372
				C349.986,242.984,351.044,248.275,348.433,252.2z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* Card Box2 */}
          <div className="grid lg:grid-cols-1 xl:grid-cols-12 md:grid-cols-12 sm:grid-cols-2 gap-5 mt-8">
            <div className="lg:col-span-7 md:col-span-12 sm:col-span-12  border-border-gray-light  rounded-lg shadow-sm border p-4 ">
              {/* header */}
              <div className="flex md:justify-between md:flex-row flex-col">
                <div className="float-left flex">
                  <div>
                    <h2 className="text-text-color font-sp-pro-text-medium text-base">
                      Asset / Category
                    </h2>
                  </div>
                </div>
              </div>
               {console.log(assetPerSuperCategory)}
              {/* Bar chart  */}
              {/* {console.log("KKK", assetPerSuperCategory)} */}
              {/* {console.log(totalItems)}
              {totalItems != 0 ? ( */}
                <div className="lg:h-[280px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[450px] 3xl:py-4 2xl:py-3 xl:mt-2">
                  <Chart
                    height="100%"
                    width="100%"
                    type="bar"
                    series={[
                      {
                        data: totalItems != 0 ? assetPerSuperCategory : []   
                      },
                    ]}
                    options={{
                      
                      chart: {
                        animations: {
                          enabled: true,
                          easing: "easeinout",
                          speed: 800,
                          animateGradually: {
                            enabled: true,
                            delay: 150,
                          },
                          dynamicAnimation: {
                            enabled: true,
                            speed: 350,
                          },
                        },
                      },
                      colors: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(255, 159, 64,0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                      ],
                      stroke: {
                        width: 1,
                        colors: [
                          "rgb(255, 99, 132)",
                          "rgb(255, 159, 64)",
                          "rgb(255, 205, 86)",
                          "rgb(75, 192, 192)",
                          "rgb(54, 162, 235)",
                          "rgb(153, 102, 255)",
                          "rgb(201, 203, 207)",
                        ],
                      },
                    
                      plotOptions: {
                        bar: {
                          columnWidth: "50%",
                          distributed: true,
                        },
                      },
                      xaxis: {
                        // tickPlacement: "on",
                        categories: getSuperCategoryName,
                      },
                        
                      yaxis: {
                        show:true,
                        labels: {
                          formatter: (val) => {
                            return `${val}`;
                          },
                        },
                      },
                      
                      dataLabels: {
                        enabled:false,
                        formatter: (val) => {
                          return `${val}`;
                        },
                      },
                      legend: {
                        show: false,
                        position: "right",
                      },
                    }}
                  />
                </div>
              {/* // ) : (
              //   <div className="flex flex-col justify-center items-center h-full pb-12 text-xl text-gray font-sp-pro-text-bold ">
              //     {" "}
              //     <img src={no_data_pic} alt="" className="w-44 h-44" /> No Data
              //   </div>
              // )} */}
            </div>

            {/* ============= Pie Chart ============ */}
            <div className=" lg:col-span-5 md:col-span-12 sm:col-span-12 md:w-full border-border-gray-light rounded-lg shadow-sm border relative lg:p-4   ">
              <div className="flex md:justify-between md:flex-row flex-col">
                <div className="float-left flex">
                  <h2 className="text-text-color font-sp-pro-text-medium text-base">
                    Assets / Status
                  </h2>
                </div>
              </div>
              {inStockAsset != 0 ||
              inUsedAsset != 0 ||
              damageAsset != 0 ||
              donatedAsset != 0 ||
              lostAsset != 0 ||
              brokenAsset != 0 ? (
                <div className="lg:py-4 xl:py-6 2xl:py-3">
                  <Chart
                  type="donut"
                  series={[
                    inUsedAsset ,
                    inStockAsset,
                    damageAsset,
                    donatedAsset,
                    lostAsset,
                    brokenAsset,
                  ]}
                  options={{
                    responsive: [
                      {
                        breakpoint: 640,
                      },
                    ],
                    colors: [
                      "rgba(255, 205, 86, 0.7)",
                      "rgba(255, 99, 132, 0.7)",
                      "rgba(255, 159, 64,0.7)",
                      "rgba(75, 192, 192, 0.7)",
                      "rgba(54, 162, 235, 0.7)",
                      "rgba(153, 102, 255, 0.7)",
                      "rgba(201, 203, 207, 0.7)",
                    ],
                    labels: [
                      "In Used",
                      "In Stock",
                      "Damage",
                      "Donated",
                      "Lost",
                      "Broken",
                    ],
                    dataLabels: {
                      enabled: false,
                      style: {
                        fontSize: "10px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                      },
                    },
                    legend: {
                      fontSize: "11px",
                      fontFamily: "Helvetica, Arial",
                      position: "bottom",
                    },
                  }}
                />
                </div>
                
               ) : (
                <div className="lg:py-4 xl:py-6 2xl:py-3 ">
                 <Chart
                  type="donut"
                  series={[
                    1
                  ]}
                  options={{
                    responsive: [
                      {
                        breakpoint: 640,
                      },
                    ],
                    colors: [
                      "rgba(200, 200, 200, 0.3)",
                    ],
                    stroke:{
                       width:1,
                       colors:["rgba(200, 200, 200, 0.5)"]
                    },
                    labels: [
                      "NO DATA"
                    ],
                    dataLabels: {
                      enabled: false,
                      style: {
                        fontSize: "10px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                      },
                    },
                    legend: {
                      fontSize: "11px",
                      fontFamily: "Helvetica, Arial",
                      position: "bottom",
                    },
                  }}
                />
                </div>
              )} 
            </div>
          </div>
          {/* Card Box2 */}
          {/* ============== Current Users ==============  */}
          <div className="grid xl:grid-cols-12 2xl:grid-cols-12 md:grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            <div className=" lg:col-span-4 md:col-span-12 sm:col-span-12 md:w-full border-border-gray-light rounded-lg shadow-sm border relative lg:p-4  2xl:p-5  ">
              <h1 className="text-text-color font-sp-pro-text-medium text-base">
                Last 3 Users
              </h1>

              <div className="py-3">
                {users.length != 0 && users.length != null ? (
                  users.map((list, index) => (
                    <>
                      {index < 3 ? (
                        <>
                          <div
                            key={index}
                            className="flex justify-between my-3 h-16 2xl:p-6 lg:p-3  con-Shadow-Card rounded-lg items-center"
                          >
                            <div className="flex items-center space-x-1">
                              {/* <div className="font-bold text-xl mx-auto pt-6 lt-14:pt-6 text-center flex flex-col justify-center w-full "> */}
                              {list.image != "" && list.image != null ? (
                                <>
                                  <div className="w-[47px] h-[47px] 2xl:w-[47px] 2xl:h-[47px] lg:w-[37px] lg:h-[37px] con-pro-color rounded-full">
                                    <img
                                      src={FileUploadService.getImage(
                                        list.image
                                      )}
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-[47px] h-[47px] 2xl:w-[47px] 2xl:h-[47px] lg:w-[37px] lg:h-[37px] con-pro-color rounded-full flex justify-center items-center m-auto ">
                                    <p className="font-sp-pro-text-bold uppercase text-[18px] text-green ">
                                      {list.name.substring(0, 2)}
                                    </p>
                                  </div>
                                </>
                              )}
                              {/* </div> */}
                              <div className="pl-2 flex flex-col">
                                <span className="text-blue-500 font-sp-pro-text-medium text-sm ">
                                  {list.name}
                                </span>
                                <span className="text-xs text-gray font-sp-pro-text-regular">
                                  {list.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ))
                ) : (
                  <div className="flex flex-col justify-center items-center h-full   text-lg text-gray font-sp-pro-text-bold ">
                    {" "}
                    <img src={no_data_pic} alt="" className="w-40 h-40" /> No
                    Data
                  </div>
                )}
              </div>
            </div>
            {/* =============== Last 3 invoice ================== */}
            <div className="lg:col-span-8 md:col-span-12 sm:col-span-12  border-border-gray-light  rounded-lg shadow-sm border p-4">
              <h1 className="text-text-color font-sp-pro-text-medium text-base">
                3 lastest <span className="text-primary">invoice</span>
              </h1>
              {/* data table */}
              {totalInvoice != 0 ? (
                <div className="text-text-color mt-3 overflow-auto ">
                  <table className="table w-full ">
                    <thead>
                      <tr className="tracking-wide text-center ">
                        <th className=" text-white bg-secondary-yellow font-sp-pro-text-semibold text-md">
                          Code
                        </th>
                        <th className="text-white bg-secondary-yellow font-sp-pro-text-semibold text-md">
                          Supplier
                        </th>
                        <th className="text-white bg-secondary-yellow font-sp-pro-semibold text-md">
                          Purchase By
                        </th>
                        <th className="text-white bg-secondary-yellow font-sp-pro-semibold text-md">
                          Create Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lastThreeInvoice.length != 0
                        ? lastThreeInvoice.map((invoiceList, index) => (
                            <tr key={index} className="text-center">
                              <td className="text-text-color font-sp-pro-text-medium text-md">
                                <span className="px-3 py-1  bg-blue-500 rounded-md  text-white">
                                  {invoiceList.invoiceCode}
                                </span>
                              </td>
                              <td className="text-text-color  text-md">
                                {invoiceList.supplier == ""
                                  ? "..."
                                  : invoiceList.supplier}
                              </td>
                              <td className="text-text-color  text-md">
                                {invoiceList.purchaseBy}
                              </td>
                              <td className="text-text-color text-md">
                                {moment(invoiceList.createdAt).format(
                                  "DD MMM yyyy"
                                )}
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center pb-12 h-full  text-lg text-gray font-sp-pro-text-bold ">
                  {" "}
                  <img src={no_data_pic} alt="" className="w-40 h-40" /> No Data
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
