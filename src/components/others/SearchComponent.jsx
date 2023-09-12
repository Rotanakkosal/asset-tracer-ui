import React from 'react'

export default function SearchComponent() {
    return (
        <div>
            <div className="relative w-full focus-within:text-black border rounded-lg p-2 border-slate-200 bg-bg-main">
                <div className="absolute inset-y-0 flex items-center pl-2">
                    <svg
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    className="w-full pl-10 pr-2 bg-transparent text-gray-700 placeholder-gray-600 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-border-gray-light focus:placeholder-gray-500  focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                />
            </div>
        </div>
    )
}
