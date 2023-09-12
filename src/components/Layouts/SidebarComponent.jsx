import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    RiArrowRightSLine,
    RiMenu3Line,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import SignOutComponent from "./popUp/SignOutComponent";
import '../../style/scrollbar.css'
import user_placeholder from '../../assets/images/profile/profile_2.svg'
import jwt_decode from "jwt-decode";
import FileUploadService from "../../redux/services/FileUploadService";
import { setProfileDetail, setProfileImage } from "../../redux/slices/UserSlice";

export default function SidebarComponent() {
    let path = window.location.pathname;
    const navigator = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const [showOrganization, setShowOrganization] = useState(false);
    const activeStyle = "flex items-center my-2 py-2.5 px-5 rounded-xl transition-colors hover:bg-bg-primary text-white bg-primary";
    const inActiveStyle = "flex items-center my-2 py-2.5 px-5 rounded-xl transition-colors hover:bg-bg-primary";

    const [isShowOrganization, setIsShowOrganization] = useState(false)
    const activeStyleDropDown = "flex items-center justify-between py-2.5 px-5 rounded-xl transition-colors hover:bg-bg-primary text-white bg-primary";
    const inActiveStyleDropDown = "flex items-center justify-between py-2.5 px-5 rounded-xl transition-colors hover:bg-bg-primary";

    const [showCategory, setShowCategory] = useState(false);
    const [isShowCategory, setIsShowCategory] = useState(false);

    const [showInvoice, setShowAsset] = useState(false);
    const [isShowInvoice, setIsShowAsset] = useState(false);

    const location = useLocation();
    const organization = JSON.parse(sessionStorage.getItem("organization"))
    const item = useSelector(state => state?.organization?.item)
    const profileDetail = useSelector(state => state.user.profileDetail)
    const profileImage = useSelector(state => state.user.profileImage)
    var profileImageToken = localStorage.getItem("profileImage")
    const token = localStorage.getItem("token")
    var getToken = jwt_decode(token);
    const [file, setFile] = useState()
    const [search, setSearch] = useState()
    const [sort, setSort] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProfileDetail(getToken))
    }, [token])

    const [key, setKey] = useState("")

    const handleChangeColor = (key) => {
        setKey(key)
    }

    useEffect(() => {
        if (path.includes("organization")) {
            setShowOrganization(true)
            setIsShowOrganization(true)
        } else {
            setShowOrganization(false)
            setIsShowOrganization(false)
            setKey("")
        }

        if (path.includes("category")) {
            setShowCategory(true)
            setIsShowCategory(true)
        } else {
            setShowCategory(false)
            setIsShowCategory(false)
            setKey("")
        }

        if (path.includes("user")) {
            setShowUser(true)
            setIsShowUser(true)
        } else {
            setShowUser(false)
            setIsShowUser(false)
            setKey("")
        }

        if (path.includes("asset")) {
            setShowAsset(true)
            setIsShowAsset(true)
        } else {
            setShowAsset(false)
            setIsShowAsset(false)
            setKey("")
        }
    }, [item, path])

    const [showUser, setShowUser] = useState(false)
    const [isShowUser, setIsShowUser] = useState(false)

    return (
        <>
            <div
                className={`flex-shrink-0 text-custom-menu font-sp-pro-text-medium h-[calc(100vh-4.3rem)] lg:h-auto con-Shadow overflow-y-scroll fixed lg:static w-72 bg-secondary-100 py-5 pt-6 px-10 flex flex-col justify-between bg-white ${showMenu ? "left-0" : "-left-full"
                    } transition-all duration-200 z-100`}
                aria-label="Tabs"
                style={{ zIndex: "99" }}
            >
                <div>
                    <ul>
                        <li>
                            <NavLink
                                onClick={() => setShowOrganization(!showOrganization)}
                                className={`${isShowOrganization ? "bg-primary hover:bg-primary" : ""} ${isShowOrganization ? activeStyleDropDown : inActiveStyleDropDown}`}
                            >
                                <span className="flex items-center justify-start">

                                    <div className="w-5 h-5 relative">
                                        <svg width="100%" height="100%" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0883 1.19602L28.643 7.88748V25.8636L15.0883 32.554L1.53361 25.863V7.88695L15.0883 1.19602ZM15.0883 0L0.39209 7.25467V26.4953L15.0883 33.75L29.7845 26.4953V7.25467L15.0883 0Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                            <path d="M15.7579 11.6562H14.4219V15.9517H15.7579V11.6562Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                            <path d="M8.26428 19.6347H7.07178V14.7256H23.104V19.5491H21.9115V15.858H8.26428V19.6347Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                            <path d="M11.7485 6.75V11.6591H18.4286V6.75H11.7485Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                            <path d="M18.5024 19.3838V24.0819H25.886V19.3838H18.5024Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                            <path d="M4.29492 19.3838V24.0819H11.6785V19.3838H4.29492Z" fill={`${key == "organization" || path.includes("organization") ? "#FFFFFF" : "#737791"}`} />
                                        </svg>
                                    </div>
                                    <p className="ml-3">Organization</p>
                                </span>
                                <RiArrowRightSLine
                                    className={`${showOrganization && "rotate-90"
                                        } transition-all text-2xl`}
                                />
                            </NavLink>
                            <ul
                                className={` ${showOrganization ? "h-[80px] pt-1 mt-1" : "h-0"
                                    } overflow-y-hidden transition-all`}
                            >
                                <li>
                                    <NavLink
                                        to="/organization"
                                        className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                            `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                        onClick={() => { setIsShowOrganization(true), setIsShowAsset(false), setShowAsset(false), setIsShowUser(false), setShowUser(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), setKey("organization") }}
                                    >
                                        Organization List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/organization-create"
                                        className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                            `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                        onClick={() => { setIsShowOrganization(true), setIsShowAsset(false), setShowAsset(false), setIsShowUser(false), setShowUser(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), setKey("organization") }}
                                    >
                                        Create or Join
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        {organization?.roleName == "ADMIN" ?
                            <li>
                                <NavLink
                                    onClick={() => setShowUser(!showUser)}
                                    className={`${isShowUser ? "bg-primary hover:bg-primary" : ""} ${isShowUser ? activeStyleDropDown : inActiveStyleDropDown}`}
                                >
                                    <span className="flex items-center justify-start">

                                        <div className="w-5 h-5 relative">
                                            <svg width="100%" height="100%" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="4.53901" cy="4.53901" r="4.53901" transform="matrix(-1 0 0 1 19.8228 1.16797)" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                <path d="M7.34106 16.9805C7.34106 16.0042 7.9548 15.1333 8.87422 14.8049V14.8049C13.0194 13.3245 17.5492 13.3245 21.6944 14.8049V14.8049C22.6139 15.1333 23.2276 16.0042 23.2276 16.9805V18.4733C23.2276 19.8207 22.0342 20.8558 20.7003 20.6652L20.2555 20.6017C16.9581 20.1306 13.6105 20.1306 10.3131 20.6017L9.86839 20.6652C8.53449 20.8558 7.34106 19.8207 7.34106 18.4733V16.9805Z" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                <path d="M22.0899 10.371C24.0595 10.371 25.6562 8.77429 25.6562 6.80464C25.6562 4.835 24.0595 3.23828 22.0899 3.23828" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <path d="M25.9961 18.5074L26.3455 18.5573C27.3936 18.707 28.3313 17.8938 28.3313 16.8351V15.6622C28.3313 14.8951 27.849 14.2108 27.1266 13.9528C26.406 13.6955 25.6706 13.495 24.927 13.3516" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <path d="M7.91133 10.371C5.94169 10.371 4.34497 8.77429 4.34497 6.80464C4.34497 4.835 5.94169 3.23828 7.91133 3.23828" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <path d="M4.00516 18.5074L3.65572 18.5573C2.60766 18.707 1.66996 17.8938 1.66996 16.8351V15.6622C1.66996 14.8951 2.15218 14.2108 2.87458 13.9528C3.59518 13.6955 4.33058 13.495 5.07422 13.3516" stroke={`${key == "user" || path.includes("user") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className="ml-3">User</p>
                                    </span>
                                    <RiArrowRightSLine
                                        className={`${showUser && "rotate-90"
                                            } transition-all text-2xl`}
                                    />
                                </NavLink>
                                <ul
                                    className={` ${showUser ? "h-[80px] pt-1 mt-1" : "h-0"
                                        } overflow-y-hidden transition-all`}
                                >
                                    <li>
                                        <NavLink
                                            to="/user"
                                            className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors  `}
                                            onClick={() => { setIsShowUser(true), setIsShowAsset(false), setShowAsset(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), setKey("user") }}
                                        >
                                            All Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/user-request"
                                            className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors  `}
                                            onClick={() => { setIsShowUser(true), setIsShowAsset(false), setShowAsset(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), setKey("user") }}
                                        >
                                            User Request
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            : null}
                        {organization != null || item != null ? <>
                            <hr className="mx-3 my-3 text-bg-primary-strock text-opacity-70" />
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => isActive ? `bg-primary hover:bg-primary text-white ${activeStyle}` : inActiveStyle}
                                    onClick={() => { setIsShowCategory(false), setIsShowAsset(false), setShowAsset(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("dashboard") }}
                                >
                                    <span className="flex items-center justify-start">
                                        <div className="w-5 h-5 relative">
                                            <svg width="100%" height="100%" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g mask="url(#mask0_468_81315)">
                                                    <path d="M13.6712 8.34619L14.0424 13.8661L14.2266 16.6405C14.2286 16.9259 14.2733 17.2093 14.3596 17.4817C14.5821 18.0105 15.1176 18.3465 15.7001 18.3231L24.5764 17.7424C24.9608 17.7361 25.332 17.8799 25.6082 18.1421C25.8385 18.3607 25.9872 18.6465 26.0341 18.954L26.0498 19.1407C25.6825 24.2269 21.9469 28.4693 16.8712 29.5644C11.7954 30.6595 6.59045 28.3461 4.08225 23.8803C3.35915 22.5828 2.9075 21.1568 2.75381 19.6857C2.68961 19.2503 2.66134 18.8104 2.66927 18.3704C2.66134 12.9174 6.54459 8.20302 11.9804 7.0665C12.6346 6.96462 13.276 7.31096 13.5384 7.90778C13.6062 8.04599 13.651 8.19402 13.6712 8.34619Z" fill={`${key == "dashboard" || path.includes("dashboard") ? "#FFFFFF" : "#737791"}`} />
                                                    <path opacity="0.4" d="M29.3327 13.5824L29.3234 13.6259L29.2965 13.689L29.3002 13.8625C29.2863 14.0923 29.1975 14.3133 29.0447 14.492C28.8854 14.678 28.6678 14.8047 28.4282 14.8539L28.2821 14.8739L18.041 15.5375C17.7003 15.5711 17.3611 15.4612 17.1079 15.2353C16.8967 15.0469 16.7618 14.7928 16.7237 14.5189L16.0363 4.29276C16.0243 4.25819 16.0243 4.22071 16.0363 4.18612C16.0457 3.90424 16.1698 3.6378 16.3809 3.44632C16.5918 3.25484 16.8723 3.15428 17.1594 3.16711C23.2393 3.32179 28.3491 7.69374 29.3327 13.5824Z" fill="#737791" />
                                                </g>
                                            </svg>
                                        </div>
                                        <p className="ml-3">Dashboard</p>
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/room"
                                    className={({ isActive }) => isActive ? `bg-primary hover:bg-primary text-white ${activeStyle}` : inActiveStyle}
                                    onClick={() => { setIsShowCategory(false), setIsShowAsset(false), setShowAsset(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("room") }}
                                >
                                    <span className="flex items-center justify-start">
                                        <div className="w-5 h-5 relative">
                                            <svg width="100%" height="100%" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M26.4988 25.9725C26.4988 26.2109 26.3053 26.4067 26.0646 26.4067H2.81621C2.57785 26.4067 2.38197 26.2132 2.38197 25.9725V14.1321C2.38197 13.4847 1.68199 13.0568 1.06745 12.8533V12.8533C0.772453 12.7541 0.524653 12.5771 0.342933 12.3459C0.161213 12.1169 0.0455726 11.8361 0.0101726 11.5293C-0.0417475 11.0502 0.102213 10.5074 0.508133 10C0.529373 9.97406 0.552973 9.95046 0.578933 9.92922L13.739 1.00279C14.0276 0.807002 14.3487 0.482801 14.6602 0.63971C14.685 0.652229 14.709 0.667343 14.7319 0.685098L28.3491 9.88674C28.3679 9.9009 28.3845 9.91742 28.401 9.93394C28.9485 10.5239 29.0854 11.1777 28.9532 11.7323C28.8871 12.0037 28.7573 12.2515 28.578 12.4521C28.3986 12.655 28.1697 12.8108 27.9077 12.9052V12.9052C27.275 13.1353 26.5007 13.5872 26.5004 14.2605C26.4988 17.8897 26.4988 22.746 26.4988 25.9725ZM10.6986 11.7334C10.6986 10.3199 11.8445 9.17402 13.258 9.17402H15.7408C17.1543 9.17402 18.3002 10.3199 18.3002 11.7334V11.7334C18.3002 13.147 17.1543 14.2929 15.7408 14.2929H13.258C11.8445 14.2929 10.6986 13.147 10.6986 11.7334V11.7334ZM13.2828 10.5641C13.5023 10.5641 13.6817 10.7434 13.6817 10.9629C13.6817 11.1824 13.5023 11.3617 13.2828 11.3617C13.0633 11.3617 12.884 11.1824 12.884 10.9629C12.884 10.7411 13.061 10.5641 13.2828 10.5641ZM14.7188 11.8949C14.8321 12.0729 15.0915 12.0742 15.2066 11.8973L15.36 11.6615C15.5687 11.3408 16.0524 11.3894 16.193 11.7452L16.3391 12.1147C16.5146 12.5586 16.1875 13.0397 15.7102 13.0397H12.6879C12.6124 13.0397 12.5512 12.9785 12.5512 12.9031V12.9031C12.5512 12.8302 12.6083 12.7702 12.6811 12.7666L12.7506 12.7631C12.832 12.7591 12.9037 12.7083 12.9345 12.6329L13.0272 12.406C13.0989 12.2307 13.3454 12.2261 13.4236 12.3985V12.3985C13.4586 12.4757 13.5355 12.5252 13.6202 12.5252H13.7225C13.8771 12.5252 14.0159 12.4302 14.0718 12.286L14.2037 11.9458C14.2896 11.7242 14.5911 11.6944 14.7188 11.8949V11.8949ZM11.1565 11.7334C11.1565 10.6106 12.0667 9.7003 13.1896 9.7003H15.8139C16.9368 9.7003 17.8471 10.6106 17.8471 11.7334V11.7334C17.8471 12.8563 16.9368 13.7666 15.8139 13.7666H13.1896C12.0667 13.7666 11.1565 12.8563 11.1565 11.7334V11.7334ZM14.3713 18.2523C14.3763 18.2343 14.3977 18.2237 14.4109 18.2105V18.2105C14.9196 17.8125 15.6656 17.9785 16.0088 18.8093C16.0098 18.8118 16.008 18.8146 16.0053 18.8146V18.8146C16.0044 18.8146 16.0035 18.8149 16.0028 18.8155C15.442 19.2922 15.0133 19.8032 14.7844 20.3619C14.7033 20.5599 14.5204 20.7073 14.3064 20.7073V20.7073C13.9981 20.7073 13.7745 20.4137 13.8566 20.1165L14.3713 18.2523ZM17.7833 19.8129C17.8394 20.2935 17.5225 20.7295 17.113 20.8995C16.7739 21.0403 16.3694 21.1684 16.2871 21.5263V21.5263C16.1667 22.0761 16.2021 21.9086 16.2541 22.4419C16.3197 23.1001 16.2597 23.5638 15.8864 23.7935C15.8307 23.8278 15.7915 23.8857 15.7915 23.9511V23.9511C15.7915 24.043 15.717 24.1175 15.625 24.1175H6.70563C6.61693 24.1175 6.54502 24.0456 6.54502 23.9569V23.9569C6.54502 23.8891 6.50128 23.8303 6.44181 23.7976C6.15938 23.6424 6.04082 23.3083 6.08954 22.7936C6.12293 22.4877 6.14101 22.2414 6.14363 22.0361C6.15254 21.3364 5.29282 21.1517 4.82694 20.6295V20.6295C4.38797 20.1409 4.52249 19.4259 5.07001 19.0837C5.18329 19.0129 5.31546 18.9586 5.46886 18.9255C5.49181 18.9207 5.51457 18.9164 5.53713 18.9127C7.36292 18.6095 8.83906 20.8631 10.6892 20.9127V20.9127C10.7114 20.9157 10.7329 20.9194 10.7535 20.9239C10.9655 20.9696 11.2695 20.9663 11.4787 20.9089V20.9089C11.4967 20.9039 11.5201 20.9004 11.5388 20.8997C12.4845 20.8609 13.1647 20.9858 13.8587 20.9858H14.6752C14.8428 20.9858 14.9301 20.9127 14.9584 20.7781C15.1661 20.1457 15.9024 18.876 16.6741 18.8996C17.1485 18.9161 17.6653 19.2418 17.7833 19.8129ZM7.28948 19.5156C6.93799 18.9617 6.60653 18.075 7.25954 18.0121V18.0121C7.63593 17.9759 7.92932 18.3199 8.03491 18.683L8.43107 20.0452C8.50405 20.2961 8.31582 20.5469 8.05449 20.5469V20.5469C7.90483 20.5469 7.76812 20.4617 7.70472 20.3261C7.57248 20.0434 7.44783 19.7652 7.28948 19.5156ZM8.1753 18.1544C8.1701 18.1363 8.18057 18.1171 8.18758 18.0995V18.0995C8.44922 17.4961 9.16997 17.3259 9.75958 17.5841C9.76057 17.5846 9.76225 17.5832 9.76329 17.5828V17.5828C9.76405 17.5826 9.76409 17.5833 9.76413 17.5841L9.89385 20.0984C9.91054 20.4218 9.65281 20.6932 9.32898 20.6932V20.6932C9.0766 20.6932 8.85475 20.526 8.78524 20.2834L8.1753 18.1544ZM10.082 17.519C10.0799 17.519 10.0784 17.517 10.0789 17.515C10.1921 17.0588 10.8413 16.9201 11.4025 16.9893C11.9796 17.0605 12.2334 17.8515 12.1956 18.4318C12.1509 19.1177 12.0908 19.9822 12.0621 20.4283C12.0524 20.5784 11.9276 20.6955 11.7771 20.6955V20.6955C11.3523 20.6955 10.9771 20.6955 10.557 20.6955V20.6955C10.3671 20.6955 10.2109 20.5458 10.2031 20.356L10.0851 17.522C10.0851 17.5203 10.0837 17.519 10.082 17.519V17.519ZM12.4842 17.6714C12.4847 17.6614 12.4928 17.6525 12.5023 17.6494V17.6494C12.5033 17.649 12.5045 17.6485 12.5054 17.648C13.1474 17.3073 14.0346 17.5441 14.154 17.9809C14.1585 17.9975 14.1489 18.0142 14.1329 18.0201V18.0201C14.1222 18.0241 14.1141 18.0329 14.1112 18.0439L13.513 20.2602C13.444 20.5157 13.2123 20.6932 12.9476 20.6932V20.6932C12.6126 20.6932 12.3459 20.4127 12.3628 20.0781L12.4842 17.6714ZM21.5723 18.9798C21.7581 18.9798 21.9086 19.1304 21.9086 19.3161V22.4372C21.9086 22.9195 22.2996 23.3104 22.7818 23.3104V23.3104C22.9163 23.3104 23.0249 23.4685 23.0249 23.6031C23.0249 23.7376 22.9163 23.8957 22.7818 23.8957H20.3628C20.2283 23.8957 20.1197 23.7376 20.1197 23.6031C20.1197 23.4685 20.2283 23.3104 20.3628 23.3104V23.3104C20.8451 23.3104 21.236 22.9195 21.236 22.4372V19.3161C21.236 19.1304 21.3866 18.9798 21.5723 18.9798V18.9798ZM20.0424 16.7937C20.2044 16.1503 20.783 15.6994 21.4464 15.6994H21.6929C22.3555 15.6994 22.9336 16.1492 23.0964 16.7916V16.7916C23.3283 17.7065 22.6368 18.5951 21.6929 18.5951H21.4464C20.5035 18.5951 19.8121 17.7081 20.0424 16.7937V16.7937ZM18.4085 25.3141C22.2745 25.3141 25.4085 22.1801 25.4085 18.3141V12.3057V12.3057C25.4085 12.2554 25.3884 12.2051 25.3465 12.1771L18.3877 7.54142C16.0556 5.98791 13.0218 5.97479 10.6765 7.50808L3.55435 12.1641C3.49834 12.2008 3.47465 12.2695 3.47465 12.3364V12.3364V18.3141C3.47465 22.1801 6.60866 25.3141 10.4747 25.3141C13.1193 25.3141 15.7639 25.3141 18.4085 25.3141Z"
                                                    fill={`${key == "room" || path.includes("room") ? "#FFFFFF" : "#737791"}`} />
                                            </svg>

                                        </div>
                                        <p className="ml-3">Room</p>
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    onClick={() => setShowCategory(!showCategory)}
                                    className={`${isShowCategory ? "bg-primary hover:bg-primary" : ""} ${isShowCategory ? activeStyleDropDown : inActiveStyleDropDown}`}
                                >
                                    <span className="flex items-center justify-start">

                                        <div className="w-5 h-5 relative">
                                            <svg width="85%" height="85%" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1.66724" y="1.83203" width="9.33333" height="9.33333" rx="3.33333" stroke={`${key == "category" || path.includes("category") ? "#FFFFFF" : "#737791"}`} fill="none" strokeWidth="2" />
                                                <rect x="1.66724" y="15.1641" width="9.33333" height="9.33333" rx="3.33333" stroke={`${key == "category" || path.includes("category") ? "#FFFFFF" : "#737791"}`} fill="none" strokeWidth="2" />
                                                <rect x="15.0005" y="1.83203" width="9.33333" height="9.33333" rx="3.33333" stroke={`${key == "category" || path.includes("category") ? "#FFFFFF" : "#737791"}`} fill="none" strokeWidth="2" />
                                                <rect x="15.0005" y="15.1641" width="9.33333" height="9.33333" rx="3.33333" stroke={`${key == "category" || path.includes("category") ? "#FFFFFF" : "#737791"}`} fill="none" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <p className="ml-3">Category</p>
                                    </span>
                                    <RiArrowRightSLine
                                        className={`${showCategory && "rotate-90"
                                            } transition-all text-2xl`}
                                    />
                                </NavLink>
                                <ul
                                    className={` ${showCategory ? "h-[80px] pt-1 mt-1 bg-[#f7fbff] bg-opacity-70 rounded-md" : "h-0"
                                        } overflow-y-hidden transition-all`}
                                >
                                    <li>
                                        <NavLink
                                            to="/super-category"
                                            className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                            onClick={() => { setIsShowCategory(true), setIsShowAsset(false), setShowAsset(false), setIsShowUser(false), setShowUser(false), setIsShowOrganization(false), setShowOrganization(false), setShowMenu(false), handleChangeColor("category") }}
                                        >
                                            Type Super
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/normal-category"
                                            className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                            onClick={() => { setIsShowCategory(true), setIsShowAsset(false), setShowAsset(false), setIsShowUser(false), setShowUser(false), setIsShowOrganization(false), setShowOrganization(false), setShowMenu(false), handleChangeColor("category") }}
                                        >
                                            Type Normal
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <hr className="mx-3 my-3 text-bg-primary-strock text-opacity-70" />

                            <li>
                                <NavLink
                                    onClick={() => setShowAsset(!showInvoice)}
                                    className={`${isShowInvoice ? "bg-primary hover:bg-primary" : ""} ${isShowInvoice ? activeStyleDropDown : inActiveStyleDropDown}`}
                                >
                                    <span className="flex items-center justify-start">
                                        <span className="flex items-center justify-start">
                                            <div className="w-5 h-5 relative">
                                                <svg width="100%" height="100%" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.66675 8.73698C1.66675 7.26422 2.86066 6.07031 4.33341 6.07031H25.6668C27.1395 6.07031 28.3334 7.26422 28.3334 8.73698V10.9433C28.3334 12.121 27.561 13.1591 26.433 13.4975L16.5326 16.4676C15.5329 16.7675 14.4672 16.7675 13.4676 16.4676L3.56716 13.4975C2.4392 13.1591 1.66675 12.121 1.66675 10.9433V8.73698Z"
                                                        stroke={`${key == "asset" || path.includes("asset") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                    <path d="M15 12.9302L15 10.6445" stroke={`${key == "asset" || path.includes("asset") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M2.77808 12.9297L2.77808 20.1677C2.77808 23.1132 5.16589 25.501 8.11141 25.501H21.8892C24.8347 25.501 27.2225 23.1132 27.2225 20.1677V12.9297" stroke={`${key == "asset" || path.includes("asset") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                    <path d="M19.4446 6.0714V4.16667C19.4446 2.69391 18.2506 1.5 16.7779 1.5H13.2223C11.7496 1.5 10.5557 2.69391 10.5557 4.16667L10.5557 6.0714" stroke={`${key == "asset" || path.includes("asset") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                </svg>
                                            </div>
                                            <p className="ml-3">Asset</p>
                                        </span>

                                    </span>
                                    <RiArrowRightSLine
                                        className={`${showInvoice && "rotate-90"
                                            } transition-all text-2xl`}
                                    />
                                </NavLink>
                                <ul
                                    className={`${showInvoice && organization?.roleName == "ADMIN" ? "h-[120px] pt-1 mt-1 bg-[#f7fbff] bg-opacity-70 rounded-md" : showInvoice && organization?.roleName == "USER" ? "h-[40px] pt-1 mt-1 bg-[#f7fbff] bg-opacity-70 rounded-md" : "h-0"} overflow-y-hidden transition-all`}
                                >
                                    <li>
                                        <NavLink
                                            to="/asset"
                                            className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                            onClick={() => { setIsShowAsset(true), setIsShowCategory(false), setShowCategory(false), setIsShowUser(false), setShowUser(false), setIsShowOrganization(false), setShowOrganization(false), setShowMenu(false), handleChangeColor("asset") }}
                                        >
                                            All Assets
                                        </NavLink>
                                    </li>
                                    {organization?.roleName == "ADMIN" ?
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/asset-add"
                                                    className={({ isActive }) => isActive ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                        `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                                    onClick={() => { setIsShowAsset(true), setIsShowCategory(false), setShowCategory(false), setIsShowUser(false), setShowUser(false), setIsShowOrganization(false), setShowOrganization(false), setShowMenu(false), handleChangeColor("asset") }}
                                                >
                                                    Create Asset
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/asset-set"
                                                    className={({ isActive }) => isActive || path.includes("asset-set") ? `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-primary before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors text-primary ` :
                                                        `py-2 px-4 ml-12 block relative before:w-[8px] before:h-[8px] before:absolute before:bg-sidebar before:rounded-full before:-left-[6px] before:top-1/2 before:-translate-y-1/2 transition-colors`}
                                                    onClick={() => { setIsShowAsset(true), setIsShowCategory(false), setShowCategory(false), setIsShowUser(false), setShowUser(false), setIsShowOrganization(false), setShowOrganization(false), setShowMenu(false), handleChangeColor("asset") }}
                                                >
                                                    Import Asset
                                                </NavLink>
                                            </li>
                                        </>
                                        : null}
                                </ul>
                            </li>

                            <li>
                                <NavLink
                                    to="/invoice"
                                    className={({ isActive }) => isActive ? `bg-primary hover:bg-primary text-white ${activeStyle}` : inActiveStyle}
                                    onClick={() => { setIsShowCategory(false), setIsShowAsset(false), setShowAsset(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("invoice") }}
                                >
                                    <span className="flex items-center justify-start">
                                        <div className="w-5 h-5 relative">
                                            <svg width="90%" height="90%" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.33276 6.5013C1.33276 3.55578 3.72058 1.16797 6.6661 1.16797H11.9994H14.7504C15.5418 1.16797 16.2924 1.5195 16.799 2.12748L22.048 8.42628C22.4474 8.90552 22.6661 9.5096 22.6661 10.1334V14.5013V22.5013C22.6661 25.4468 20.2783 27.8346 17.3328 27.8346H6.6661C3.72058 27.8346 1.33276 25.4468 1.33276 22.5013V6.5013Z"
                                                    stroke={`${key == "invoice" || path.includes("invoice") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                <path d="M15.9995 1.83594V6.5026C15.9995 7.97536 17.1934 9.16927 18.6662 9.16927H21.9995" stroke={`${key == "invoice" || path.includes("invoice") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <path d="M6.66602 14.5H17.3327" stroke={`${key == "invoice" || path.includes("invoice") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <path d="M6.66602 21.168H11.9993" stroke={`${key == "invoice" || path.includes("invoice") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className="ml-3">Invoice</p>
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/tracking"
                                    className={({ isActive }) => isActive ? `bg-primary hover:bg-primary text-white ${activeStyle}` : inActiveStyle}
                                    onClick={() => { setIsShowCategory(false), setIsShowAsset(false), setShowAsset(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("tracking") }}
                                >
                                    <span className="flex items-center justify-start">
                                        <div className="w-5 h-5 relative">

                                            <svg width="100%" height="100%" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.3334 10.5013V21.168C28.3334 24.8499 25.3486 27.8346 21.6667 27.8346H8.33341C4.65151 27.8346 1.66675 24.8499 1.66675 21.168V7.83463C1.66675 4.15273 4.65152 1.16797 8.33341 1.16797H20.3334" stroke={`${key == "tracking" || path.includes("tracking") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" />
                                                <circle cx="2.66667" cy="2.66667" r="2.66667" transform="matrix(-1 0 0 1 29.6667 1.16797)" stroke={`${key == "tracking" || path.includes("tracking") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" />
                                                <path d="M8.33341 18.168L13.0001 12.8346L17.0001 16.168L21.6667 10.8346" stroke={`${key == "tracking" || path.includes("tracking") ? "#FFFFFF" : "#737791"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="ml-3">Tracking</p>
                                    </span>
                                </NavLink>
                            </li>

                        </> : null}
                    </ul>
                </div>
                <nav className="font-sp-pro-text-regular rounded-xl mt-3 shadow-sm py-3">
                    {(organization != null || item != null) && organization.roleName == "ADMIN" ?
                        <>
                            <NavLink
                                to="/notification"
                                className={({ isActive }) => isActive ? `bg-primary hover:bg-primary text-white ${activeStyle}` : inActiveStyle}
                                onClick={() => { setIsShowCategory(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("notification") }}
                            >
                                <span className="flex items-center justify-start">
                                    <div className="w-5 h-5 relative">
                                        <svg width="100%" height="100%" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.49205 22.5533L5.63921 21.492H5.63921L5.49205 22.5533ZM18.508 22.5533L18.6551 23.6146L18.508 22.5533ZM2.59616 16.2969L1.67598 15.748L2.59616 16.2969ZM5.2942 9.77777C5.2942 6.07396 8.29673 3.07143 12.0005 3.07143V0.928571C7.11327 0.928571 3.15134 4.89049 3.15134 9.77777H5.2942ZM5.2942 12.4532V9.77777H3.15134V12.4532H5.2942ZM3.07143 18.4666C3.07143 17.8723 3.23395 17.3192 3.51635 16.8457L1.67598 15.748C1.20111 16.5442 0.928571 17.4752 0.928571 18.4666H3.07143ZM5.63921 21.492C4.16486 21.2876 3.07143 20.0051 3.07143 18.4666H0.928571C0.928571 21.0244 2.76176 23.2564 5.34489 23.6146L5.63921 21.492ZM12 22.0422C10.1018 22.0422 7.64517 21.7702 5.63921 21.492L5.34489 23.6146C7.36825 23.8952 9.94644 24.1851 12 24.1851V22.0422ZM18.3608 21.4921C16.3548 21.7702 13.8982 22.0422 12 22.0422V24.1851C14.0536 24.1851 16.6318 23.8952 18.6551 23.6146L18.3608 21.4921ZM20.9286 18.4666C20.9286 20.0051 19.8351 21.2876 18.3608 21.4921L18.6551 23.6146C21.2382 23.2564 23.0714 21.0244 23.0714 18.4666H20.9286ZM20.4838 16.846C20.7661 17.3194 20.9286 17.8724 20.9286 18.4666H23.0714C23.0714 17.4754 22.799 16.5446 22.3243 15.7485L20.4838 16.846ZM18.7069 9.77778V12.4545H20.8498V9.77778H18.7069ZM12.0005 3.07143C15.7044 3.07143 18.7069 6.07396 18.7069 9.77778H20.8498C20.8498 4.89049 16.8878 0.928571 12.0005 0.928571V3.07143ZM22.3243 15.7485C21.9256 15.0799 21.5729 14.559 21.2799 13.9718C21.0009 13.4128 20.8498 12.9251 20.8498 12.4545H18.7069C18.7069 13.3898 19.0087 14.2197 19.3626 14.9287C19.7024 15.6097 20.1626 16.3072 20.4838 16.846L22.3243 15.7485ZM3.15134 12.4532C3.15134 12.9238 3.00014 13.4117 2.72098 13.9709C2.42776 14.5582 2.07486 15.0793 1.67598 15.748L3.51635 16.8457C3.83778 16.3068 4.29818 15.6091 4.63819 14.928C4.99225 14.2188 5.2942 13.3887 5.2942 12.4532H3.15134Z"
                                                fill={`${key == "notification" || path.includes("notification") ? "#FFFFFF" : "#737791"}`} />
                                            <path opacity="0.3" d="M14.7776 26.0645C14.1804 26.9626 13.1592 27.5546 11.9998 27.5546C10.8404 27.5546 9.81922 26.9626 9.22204 26.0645" stroke={`${key == "notification" || path.includes("notification") ? "#FFFFFF" : "#737791"}`} strokeWidth="2.14286" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p className="ml-3">Notification</p>
                                </span>
                            </NavLink>
                        </> : null}

                    <label htmlFor="my-modal"
                        className="flex py-2.5 px-5 items-center hover:bg-bg-primary rounded-xl transition-colors cursor-pointer">
                        <span className="flex items-center justify-start">
                            <div className="w-5 h-5 relative p-[1px]">
                                <svg width="100%" height="100%" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.7746 17.7546L21.337 12.4312C21.5549 12.1827 21.6663 11.8689 21.6665 11.5535C21.6666 11.3377 21.6146 11.1211 21.5089 10.9241C21.462 10.8363 21.4046 10.7529 21.337 10.6758L16.7746 5.35241C16.2954 4.79328 15.4537 4.72849 14.8946 5.20769C14.3354 5.68688 14.2706 6.52861 14.7498 7.08774L17.4344 10.2201L7.10821 10.2201C6.37183 10.2201 5.77487 10.817 5.77487 11.5534C5.77487 12.2898 6.37182 12.8867 7.10821 12.8867L17.4345 12.8867L14.7498 16.0192C14.2706 16.5784 14.3354 17.4201 14.8946 17.8993C15.4537 18.3785 16.2954 18.3137 16.7746 17.7546ZM8.33317 3.55338C9.06955 3.55338 9.6665 4.15034 9.6665 4.88672L9.6665 6.88672C9.6665 7.6231 10.2635 8.22005 10.9998 8.22005C11.7362 8.22005 12.3332 7.6231 12.3332 6.88672L12.3332 4.88672C12.3332 2.67758 10.5423 0.886718 8.33317 0.886718L4.33317 0.886718C2.12403 0.886718 0.33317 2.67758 0.33317 4.88672L0.333169 18.2201C0.333169 20.4292 2.12403 22.2201 4.33317 22.2201L8.33317 22.2201C10.5423 22.2201 12.3332 20.4292 12.3332 18.2201L12.3332 16.2201C12.3332 15.4837 11.7362 14.8867 10.9998 14.8867C10.2635 14.8867 9.6665 15.4837 9.6665 16.2201L9.6665 18.2201C9.6665 18.9564 9.06955 19.5534 8.33317 19.5534L4.33317 19.5534C3.59679 19.5534 2.99984 18.9564 2.99984 18.2201L2.99984 4.88672C2.99984 4.15034 3.59679 3.55338 4.33317 3.55338L8.33317 3.55338Z" fill="#737791" />
                                </svg>
                            </div>
                            <p className="ml-3">Sign Out</p>
                        </span>
                    </label>

                    <NavLink
                        onClick={() => { setIsShowCategory(false), setIsShowOrganization(false), setShowOrganization(false), setIsShowOrganization(false), setIsShowCategory(false), setShowCategory(false), setShowMenu(false), handleChangeColor("") }}
                        to="/profile"
                        className="flex hover:bg-slate-100 mt-2 rounded-xl items-center py-2 ml-[-5px]  transition-colors gap-1 justify-center cursor-pointer">
                        <div className="w-10 h-10 mr-2 overflow-hidden rounded-full">
                            <img
                                src={profileImageToken != null ? profileImageToken : user_placeholder}
                                className="w-full rounded-full"
                            />
                        </div>

                        <span className="leading-3">
                            <p className="text-sm">{profileDetail.name}</p>
                            <small>{profileDetail.email}</small>
                        </span>
                    </NavLink>
                </nav>
            </div>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden fixed top-3 left-4 text-text-color rounded-full bg-bg-primary outline-none p-2.5" style={{ zIndex: "200" }}
            >
                <RiMenu3Line />
            </button>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <SignOutComponent className="modal" />

            {showMenu &&

                <div className=" lg:hidden fixed bg-black w-full bg-opacity-30 h-screen transition-all duration-200 z-90">
                </div>
            }
        </>
    )
}