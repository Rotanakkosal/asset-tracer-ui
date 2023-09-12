import React from 'react'

const fruits = ["Apple", "Orange", "Grape", "Lemon", "Lime", "Blueberry"];

export default function ListBoxComponent() {

    const [selectedFruit, setSelectedFruit] = useState("Apple");
    const [selected, setSelected] = useState(people[0]);
    const [query, setQuery] = useState("");

    return (
        <div>
            <Listbox as="div" value={selectedFruit} onChange={setSelectedFruit}>
                {({ open }) => (
                    <>
                        <div className="relative">
                            <span className="inline-block w-full ">
                                <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue relative border border-slate-200 bg-bg-main rounded-md text-gray-800">
                                    <span className="block truncate">{selectedFruit}</span>
                                </Listbox.Button>
                            </span>
                            <Transition
                                show={open}
                                leave=""
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    static
                                    className="border border-gray-300 mt-2 border-slate-200 bg-bg-main rounded-md absolute z-50 min-w-full"
                                >
                                    {fruits.map((fruit) => (
                                        <Listbox.Option key={fruit} value={fruit}>
                                            {({ selected, active }) => (
                                                <div
                                                    className={`${active
                                                        ? "text-white bg-indigo-600"
                                                        : "text-gray-900"
                                                        } cursor-default select-none relative py-2 pl-10 pr-4`}
                                                >
                                                    <span
                                                        className={`${selected ? "font-semibold" : "font-normal"
                                                            }`}
                                                    >
                                                        {fruit}
                                                    </span>

                                                    {selected && (
                                                        <span
                                                            className={`${active ? "text-white" : "text-indigo-600"
                                                                } absolute inset-y-0 left-0 flex items-center pl-2`}
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    )
}
