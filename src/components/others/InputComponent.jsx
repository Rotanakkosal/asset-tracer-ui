import React from 'react'

export default function InputComponent() {
    return (
        <>
            <div>
                <label for="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label for="currency" className="sr-only">Currency</label>
                        <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* Input */}
            <form action="" className="my-4">
                <div className="text-left mb-4 mt-2">
                    <label for="price" className="block text-md ml-1 font-medium leading-6 text-gray-900">Super Category Name</label>
                    <div className="relative w-full  mt-1 focus-within:text-black border rounded-lg p-2 border-slate-200 bg-bg-main">
                        <input
                            className="w-full px-2 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-border-gray-light focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                            type="text"
                            placeholder="Search..."
                            aria-label="Search"
                        />

                    </div>
                    <p className="text-reject font-sp-pro-text-regular text-sm mt-2 pl-1">Name is required</p>
                </div>
            </form>
        </>
    )
}
