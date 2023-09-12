import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function TestingComponent() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="fixed top-0 left-0 font-sp-pro-text-semibold right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <div className="bg-white rounded-3xl p-6 w-72 h-[65%]" >
                                            <div className='flex flex-col justify-end'>
                                                <div className="relative w-40 m-auto pb-7">
                                                    <img src={false1} alt="Signup Picture" className='w-full' />
                                                </div>
                                                <p className="text-3xl  text-red-400 mb-2">Ooop...</p>
                                                <p className="text-lg text-text-color mt-6">Your email or password are incorected!</p>
                                                <div className="bg-red-400 text-white mt-14 py-2 px-4 rounded-2xl">
                                                    <button onClick={() => setIsShowErr(false)} >Close </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
