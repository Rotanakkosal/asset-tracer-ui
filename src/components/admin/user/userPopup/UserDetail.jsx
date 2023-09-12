import React from 'react';
import { CalendarDaysIcon, EnvelopeIcon, MapPinIcon, UserCircleIcon, UserIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { TiSocialLinkedinCircular, TiSocialTwitterCircular } from 'react-icons/ti';
import { TbBrandInstagram } from 'react-icons/tb';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { PhoneIcon } from '@heroicons/react/24/outline';

// import { TiSocialLinkedinCircular } from 'react-icons/Ti';


function UserDetail(props) {

    return (
        <div className="modal">
            <div className="modal-box max-w-5xl">
                {/* header */}
                <div className='flex justify-between'>
                    <div className='flex'>
                        <UserIcon className="h-7 w-7 p-1 text-primary bg-primary bg-opacity-20 rounded-2xl rounded-se-md" />
                        <h2 className='text-[20px] font-sp-pro-text-bold ml-4 text-text-color'>Profile Details</h2>

                    </div>
                    <label htmlFor="my-modal-5" className='cursor-pointer'>
                        <XCircleIcon className="h-7 w-7 text-red-300" />
                    </label>
                </div>
                {/* contant */}
                <div className='lg:flex p-2 '>
                    <div className='lg:w-1/3 p-6 md:w-full'>
                        <div className='flex justify-center '>
                            <img className='w-1/2 items-center justify-center rounded-full' src="https://scontent.fpnh4-1.fna.fbcdn.net/v/t39.30808-6/348919242_2452199144934684_6631963978215147455_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGkYZ-6QLA_ti1wmGGd2pwA9EdtWS_QjHX0R21ZL9CMdeGtIWijE-Ya1z8AEl0-gdw-cAAywrVXYl1xipoKBV0D&_nc_ohc=ouqETNe2WBoAX9ztHzn&_nc_ht=scontent.fpnh4-1.fna&oh=00_AfCBYrOlZEobpVyQFadEQHEH_QaK5kWwAskBm1p6jZfjVw&oe=647B4B90" alt="" />

                        </div>
                        <div className=''>
                            <h3 className='flex m-1 justify-center font-sp-pro-text-bold text-xl text-text-color'>Boeurn Mnor</h3>
                            <p className='flex justify-center font-sp-pro-text-regular text-md text-primary'>Web Design</p>
                        </div>
                        <div className='flex justify-center mt-1 '>
                            <RiFacebookCircleLine className="w-10 h-10 text-text-color text-opacity-50" />
                            <TiSocialLinkedinCircular className="w-10 h-10 text-text-color text-opacity-50" />
                            <TbBrandInstagram className="w-10 h-10 text-text-color text-opacity-50" />
                            <TiSocialTwitterCircular className="w-10 h-10 text-text-color text-opacity-50" />
                        </div>
                    </div>
                    <div className=' md:flex w-2/3 md:w-full'>
                        <div className='w-1/2 sm:w-full'>
                            <div className='block h-auto'>
                                <div className='py-5'>
                                    <div className='flex '>
                                        <EnvelopeIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2  item-center'>Role</h3>
                                    </div >
                                    <p className='ml-10 w-full'>boeurnmnor1111@gmail.com</p>
                                </div>

                                <div className='py-5 '>
                                    <div className="flex">
                                        <CalendarDaysIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2 item-center'>Role</h3>

                                    </div>
                                    <p className='ml-10'>02 april 2023</p>
                                </div>


                                <div className='py-5'>
                                    <div className='flex'>
                                        <BsGenderAmbiguous className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2 item-center'>Gender</h3>
                                    </div>
                                    <p className='ml-10'>Male</p>
                                </div>

                            </div>
                        </div>
                        <div className='w-1/2 sm:w-full'>
                            <div className='block'>
                                <div className='py-5'>
                                    <div className='flex '>
                                        <UserCircleIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2  item-center'>Role</h3>
                                    </div >
                                    <p className='ml-10'>ROLE_User</p>
                                </div>

                                <div className='py-5 '>
                                    <div className="flex">
                                        <PhoneIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2 item-center'>Phone Number</h3>

                                    </div>
                                    <p className='ml-10'>+855 93 200 138</p>
                                </div>


                                <div className='py-5'>
                                    <div className='flex'>
                                        <MapPinIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                                        <h3 className='block text-[18px] font-sp-pro-text-regular ml-2 item-center'>Address</h3>
                                    </div>
                                    <p className='ml-10 w-full'>Steung meanchey, Dongkao,
                                        Phnom Penh</p>
                                </div>

                            </div>
                            <div className="flex mt-5 justify-end flex-row w-full">
                                <div className="text-primary border border-primary cursor-pointer  w-4/12 p-2  rounded-lg flex justify-center">
                                    <button className="flex justify-around font-sp-pro-text-regular items-center xl:text-[16px] text-[12px] ">Cancel</button>
                                </div>
                                <div className="bg-primary cursor-pointer  ml-6 w-4/12 p-2 rounded-lg flex justify-center">
                                    <button className="flex  justify-around text-white font-sp-pro-text-regular items-center text-[12px] xl:text-[16px]">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDetail;