import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import verify from '../../../assets/images/forgotPassword/verify.png'

function UpdatePassWordSuccessComponent({setIsOpen, isOpen}) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment} onClose={() => setIsOpen(!isOpen)}>
                <Dialog as="div" className="relative z-10" >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed w-[1423pxl] inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed  inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 transform overflow-hidden  text-left align-middle transition-all">
                                <div className="flex justify-center"> <img src={verify} width={50} alt=""/></div>
                               
                                    <Dialog.Title
                                        as="h2"
                                        className="mb-1 py-5 text-lg font-sp-pro-text-semibold leading-tight text-primary md:text-2xl text-center pt-[25px]"
                                    >
                                        Password Reset
                                    </Dialog.Title>
                                    <div className="mt-[60px]">
                                        <p className="text-sm text-gray-500 text-center">
                                        Your new password has been successfully reset.
                                        <p className="text-center font-sp-pro-text-medium text-sm text-text-color">Click below to log in.</p>
                                        </p>
                                    </div>

                                    <div className="mt-[70px]">
                                        <button
                                            type="submit"
                                            className="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default UpdatePassWordSuccessComponent;