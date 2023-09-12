import React from 'react'
import AssetService from '../../../../redux/services/AssetService';

export default function AssetDeleteComponent({ itemId, handleDeleteSuccess }) {

    // organization id
    const organization = JSON.parse(sessionStorage.getItem("organization"));
    const orgId = organization.id;

    // Delete
    const handleDeleteItem = () => {
        handleDeleteSuccess(false)
        AssetService.deleteAsset(itemId, orgId).then(res => {
            if (res.data.success) {
                handleDeleteSuccess(true)
                document.getElementById("hideModal").click()
            }
        })
    };

    return (
        <div className="modal">
            <div className="bg-white md:w-1/4  rounded-xl relative">
                <div className="mb-5">
                    <div>
                        <label
                            id="hideModal"
                            htmlFor="modalDelete"
                            className="btn border-none bg-white text-text-color hover:bg-bg-primary btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
                        >
                            ✕
                        </label>
                    </div>
                </div>

                <div className="">
                    <div className="flex-row">
                        <div className="md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#DF0404] bg-opacity-25 rounded-full flex justify-center items-center m-auto">
                            <span>
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.5 5.49935H4.16667M4.16667 5.49935H17.5M4.16667 5.49935V17.166C4.16667 17.608 4.34226 18.032 4.65482 18.3445C4.96738 18.6571 5.39131 18.8327 5.83333 18.8327H14.1667C14.6087 18.8327 15.0326 18.6571 15.3452 18.3445C15.6577 18.032 15.8333 17.608 15.8333 17.166V5.49935H4.16667ZM6.66667 5.49935V3.83268C6.66667 3.39065 6.84226 2.96673 7.15482 2.65417C7.46738 2.34161 7.89131 2.16602 8.33333 2.16602H11.6667C12.1087 2.16602 12.5326 2.34161 12.8452 2.65417C13.1577 2.96673 13.3333 3.39065 13.3333 3.83268V5.49935M8.33333 9.66602V14.666M11.6667 9.66602V14.666"
                                        stroke="#C52222"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>

                        <div className="text-center px-5 my-5">
                            <h1 className="text-text-color font-sp-pro-text-semibold text-lg">
                                You want to delete?
                            </h1>
                            <p className="text-text-color font-sp-pro-text-regular text-sm mt-1">
                                Are your sure, you want to delete this asset?
                            </p>
                        </div>

                        <div className="w-full">
                            <hr className="border-[#E1E9EE]" />
                        </div>

                        <div className="p-5 flex flex-row justify-center space-x-5 cursor-pointer">
                            <label
                                htmlFor="modalDelete"
                                className="border border-[#E1E9EE] bg-bg-main hover:bg-white text-text-color font-sp-pro-text-medium p-1.5 px-5 rounded-md cursor-pointer"
                            >
                                Cancel
                            </label>
                            <button
                                onClick={handleDeleteItem}
                                type="button"
                                className="border bg-[#DF0404] bg-opacity-25 hover:bg-opacity-20 text-reject font-sp-pro-text-medium p-1.5 px-5 rounded-md cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
