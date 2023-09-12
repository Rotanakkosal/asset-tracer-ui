import { ChevronDownIcon, CloudArrowUpIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import RoomService from "../../../../redux/services/RoomService";
import FileUploadService from "../../../../redux/services/FileUploadService";
import defaultimg from "../../../../assets/images/Room/default-image.webp"
import { useDispatch, useSelector } from "react-redux";
import { setAllRoom } from "../../../../redux/slices/RoomSlice";

function UpdateComponent(props) {
    // date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const roomUpdate = useSelector((state) => state?.room.updateroom)
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const roomId = roomUpdate.id;
    const [roomUp, setRoomUp] = useState("");
    useEffect(() => {
        setRoomUp(roomUpdate)
    }, [roomUpdate])

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        console.log("Event from update component", event);
        setSelectedFile(event.target.files[0]);
    };
    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    setImageDimensions({
                        width: image.width,
                        height: image.height,
                    });
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);
    let formData = new FormData()
    const organization = sessionStorage.getItem("organization");
    const getOrganizationDetail = JSON.parse(organization)
    const organizationId = getOrganizationDetail.id;
    const orgId = getOrganizationDetail.id;
    const [data, setData] = useState(roomUpdate);
    const dispatch = useDispatch();

    console.log("data", data);

    const getAllRoom = () => {
        // RoomService.getAllRoom(orgId).then((res) => {
        //     if (res?.data?.success) {
        //         dispatch(setAllRoom(res.data.payload));
        //     }
        // });
    };

    const [defultImage, setDefultImage] = useState('');
    const [defaultImg, setDefaultImg] = useState(true);
    useEffect(() => {
        const url = FileUploadService.getImage(roomUpdate.image);
        const queryString = url.substring(url.indexOf("?") + 1);
        if (queryString == "fileName=null") {
            setDefaultImg(false)
        }
        else {
            setDefaultImg(true)
        }
        setDefultImage(FileUploadService.getImage(roomUpdate.image));
    }, [roomUpdate])
    const handleChang = (event) => {
        const { name, value } = event.target;
        setRoomUp(event.target.value);
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            orgId
        }));
    }, [orgId])
    console.log(data);
    const handlesubmit = () => {
        if (selectedFile !== null) {
            formData.append("file", selectedFile)
            FileUploadService.storeFile(formData, localStorage.getItem("token")).then(res => {
                RoomService.updateRoom(roomId, { ...data, image: res.data.payload })
                    .then((res) => {
                        getAllRoom()
                    })
                    .catch((error) => {
                        console.log(err);
                    });


            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            RoomService.updateRoom(roomId, { ...data, image: "" })
                .then((res) => {
                    getAllRoom()

                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }
    return (
        <>
            <div className="modal" >
                {/* <div className="modal-box" > */}
                <div className="modal-box max-w-5xl bg-white rounded-lg p-5 font-sp-pro-text-regular relative" >
                    <div className="flex justify-between px-5">
                                <div className="flex">
                                    <HomeIcon className="h-8 w-8 text-white bg-primary p-2 rounded-lg" />
                                    <p className="px-4 text-text-color text-[16px] text-opacity-90 item-center xl:text-[20px] font-sp-pro-text-bold">Update Room</p>
                                </div>
                                <div className="">
                                    <label htmlFor="update" ><XMarkIcon className="cursor-pointer h-8 w-8 text-text-color hover:bg-bg-primary rounded-full p-1 " /></label>
                                </div>
                            </div>

                            <div className="md:flex mt-5 sm:flex-row">
                                <div className='xl:w-1/3 md:w-1/2'>
                                    <div className="item-center w-full rounded-xl   ">
                                        <div style={{ boxShadow: "0 1px 40px 0 rgb(0 0 0 / 0.06)" }} className='block items-center space-y-5 mx-5 p-5 pb-3 rounded-md mb-1'>
                                            <label htmlFor="updateImage" classfileInputName="browseButton">
                                                <div className=" flex cursor-pointer border border-dashed items-center border-primary h-[365px] justify-center text-center p-3 rounded-lg m-auto">
                                                    <div className="">
                                                        {selectedFile && (
                                                            <img
                                                                src={URL.createObjectURL(selectedFile)}
                                                                alt="Selected File"
                                                                className={`${imageDimensions.width > imageDimensions.height ? 'w-[300px]' : 'h-auto'} ${imageDimensions.width < imageDimensions.height ? 'h-[195px]' : 'w-auto'} block rounded-md object-center justify-center  items-center`}
                                                            />
                                                        )}
                                                        {!selectedFile && (
                                                            <>
                                                                {defaultImg ? (
                                                                    <img src={defultImage} alt="" />
                                                                ) : (
                                                                    <>
                                                                        <CloudArrowUpIcon className="h-20 w-20 text-blue-200 hover:text-blue-300 m-auto" />
                                                                        <p className="fileInfo py-4">Upload Invoice picture, max size 20MB</p>
                                                                        <p className="border w-full p-2 px-4 mt-3 border-black border-opacity-20 rounded-md text-center cursor-pointer hover:bg-bg-primary">Browse</p>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    id="updateImage"
                                                    type="file"
                                                    onChange={handleFileSelect}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="xl:w-2/3 md:w-1/2 ">
                                    <div className="  item-center w-full rounded-xl">
                                        <div style={{ boxShadow: "0 1px 40px 0 rgb(0 0 0 / 0.06)" }} className=" mx-5 p-5 rounded-md mb-1 text-text-color text-opacity-90 text-xs font-sp-pro-text-regular" >
                                            <div className="xl:flex lg:flex-row justify-between">
                                                <div className="w-full xl:p-2 lg:py-2 p-2" >
                                                    <label className="text-xs" htmlFor="">Room Name</label><br />
                                                    <input onChange={handleChang} name="name" value={roomUp.name} className="border-[#E1E9EE] h-8 font-sp-pro-text-regular border rounded-md mt-1 text-text-color w-full p-2  outline-none focus:border-primary placeholder-text-color placeholder-opacity-30 text-xs"
                                                        type="text"
                                                        placeholder="Room Name"
                                                    />
                                                </div>
                                                <div className="w-full xl:p-2 lg:py-2 p-2">
                                                    <label className="" >Created Date</label> <br />
                                                    <div className="border-[#E1E9EE] h-8 font-sp-pro-text-regular border rounded-md mt-1 text-text-color w-full p-2  outline-none focus:border-primary placeholder-text-color placeholder-opacity-30 text-xs">Date: {date}</div>
                                                </div>
                                            </div>
                                            <div className="xl:flex justify-between">

                                                <div className="w-full xl:p-2 lg:py-2 p-2">
                                                    <label htmlFor="roomType" className="" >Room Type</label>
                                                    <input
                                                        onChange={handleChang}
                                                        name="type"
                                                        value={roomUp.type}
                                                        className="border-[#E1E9EE] h-8 font-sp-pro-text-regular border rounded-md mt-1 text-text-color w-full p-2 outline-none focus:border-primary text-xs"
                                                        type="text"
                                                    />
                                                </div>
                                                <div className="w-full xl:p-2 lg:py-2 p-2">
                                                    <label htmlFor="" className="" >Room Floor</label>
                                                    <input onChange={handleChang} name="floor" value={roomUp.floor} className="border-[#E1E9EE] h-8 font-sp-pro-text-regular border rounded-md mt-1 text-text-color w-full p-2  outline-none focus:border-primary  text-xs"
                                                        type="text"
                                                    />

                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="xl:p-3 lg:py-2 p-2">
                                                    <div>
                                                        <label htmlFor="" className="" >Description</label>
                                                        <textarea onChange={handleChang} value={roomUp.description} name="description" className="border-[#E1E9EE] border rounded-md mt-1 text-text-color p-2 w-full  outline-none focus:border-primary" type="text" id="" cols="20" rows="5"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-5 p-5 justify-end flex-row w-full">
                                                <label htmlFor='update' className='border w-1/4 p-2 px-4 border-black border-opacity-20 rounded-md text-center cursor-pointer hover:bg-bg-primary'>Cancel</label>
                                                <label htmlFor='update' onClick={handlesubmit} className='border w-1/4 p-2 px-4 border-black border-opacity-20 rounded-md text-center cursor-pointer text-white  bg-primary  ' >Save</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
        </>
    );
}

export default UpdateComponent;