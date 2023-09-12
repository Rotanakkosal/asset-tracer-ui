import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import "../../../style/shadow.css";
import { AiOutlinePlus } from "react-icons/ai";
import upload_placeholder from "../../../assets/images/placeholder/upload_placeholder.svg";
import placeholder from "../../../assets/images/placeholder/placeholder-image.png"
import { RiCloseFill } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import InvoiceService from "../../../redux/services/InvoiceService";
import { Combobox, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import NormalCategoryService from "../../../redux/services/NormalCategoryService";
import FileUploadService from "../../../redux/services/FileUploadService";
import moment from "moment/moment";

export default function UpdateInvoiceComponent() {
  const dispatch = useDispatch();
  let organization = JSON.parse(sessionStorage.getItem("organization"));
  const { id } = useParams();

  const [normalCategoryName, setNormalCategoryName] = useState([]);
  const navigator = useNavigate();

  //combobox
  const [query, setQuery] = useState("");
  const [selectedNormalCategory, setSelectedNormalCategory] = useState();

  // Upload file
  let formData = new FormData();
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [normaCategories, setNormalCategories] = useState([]);

  const handleSetNormalCategories = (e, index) => {
    const onChangeVal = [...normaCategories];
    onChangeVal[index]["name"] = e.name;
    setNormalCategories(onChangeVal);
  };

  const [newData, setNewData] = useState({
    invoiceCode: "",
    purchaseBy: "",
    purchaseDate: "",
    image: "",
    organizationId: organization.id,
    supplier: "",
    itemDetailRequests: [],
  });

  const [newItem, setNewItem] = useState([
    {
      name: "",
      image: "",
      qty: "",
      unitPrice: "",
      discount: "0",
      normalCategoryId: "",
      normalCategoryName: "",
      organizationId: organization.id,
    },
  ]);

  const formik = useFormik({
    initialValues: { ...newData, newItem },
    validationSchema: Yup.object().shape({
      invoiceCode: Yup.string().required("Invoice code is required"),
      purchaseDate: Yup.string().required("Purchase date is required"),
      purchaseBy: Yup.string().required("Purchase by is required"),
      newItem: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Item name is required"),
          qty: Yup.string().required("QTY is required"),
          unitPrice: Yup.string().required("Unit price is required"),
          normalCategoryId: Yup.string().required("Category is required"),
        })
      ),
    }),
    onSubmit: (val, { resetForm }) => {
      handleUpdateInvoice();
    },
  });

  useEffect(() => {
    InvoiceService.getInvoiceById(id).then((res) => {
      if (res.data.success) {
        if (res.data.payload.image) {
          setImage(FileUploadService.getImage(res.data.payload.image));
        }
        setNewData({
          ...res.data.payload,
          purchaseDate: moment(res.data.payload.purchaseDate).format(
            "YYYY-MM-DD"
          ),
        });
        setNewItem(res.data.payload.itemDetails);
        formik.setValues(res.data.payload);

        let categories = res.data.payload.itemDetails.map(
          ({ normalCategoryName }) => ({ name: normalCategoryName })
        );
        setNormalCategories(categories);
      }
    });
  }, [id]);
  console.log(normaCategories);
  const handleAddMoreItem = () => {
    setNewItem([
      ...newItem,
      {
        name: "",
        model: "",
        qty: "",
        unitPrice: "",
        discount: "0",
        normalCategoryId: "",
        normalCategoryName: "",
        organizationId: organization.id,
      },
    ]);

    formik.setValues({
      ...formik.values,
      newItem: [
        ...newItem,
        {
          name: "",
          model: "",
          qty: "",
          unitPrice: "",
          discount: "0",
          normalCategoryId: "",
          normalCategoryName: "",
          organizationId: organization.id,
        },
      ],
    });
  };

  const handleDeleteItem = (index) => {
    const val = [...newItem];
    val.splice(index, 1);
    setNewItem(val);
    formik.values.newItem.splice(index, 1);
  };

  const handleInputChangeItem = (e, index) => {
    const { name, value } = e.target;
    const onChangeVal = [...newItem];
    onChangeVal[index][name] = value;
    setNewItem(onChangeVal);
    formik.setValues({
      ...formik.values,
      newItem: [...onChangeVal],
    });
  };

  const handleSelectionChangeItem = (e, index) => {
    const { name, value } = { name: "normalCategoryId", value: e.id };
    const onChangeVal = [...newItem];
    onChangeVal[index][name] = value;
    onChangeVal[index]["normalCategoryName"] = e.name;
    setNewItem(onChangeVal);
  };

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleUpdateInvoice = () => {
    if (selectedFile) {
      formData.append("file", selectedFile);
      FileUploadService.storeFile(formData, localStorage.getItem("token")).then(
        (res) => {
          if (res.data.success) {
            InvoiceService.updateInvoice(id, {
              invoiceCode: newData.invoiceCode,
              purchaseBy: newData.purchaseBy,
              purchaseDate: newData.purchaseDate,
              organizationId: organization.id,
              supplier: newData.supplier,
              image: res.data.payload,
              itemDetailRequests: newItem,
            }).then((res) => {
              if (res.data.success) {
                navigator("/invoice");
              }
            });
          }
        }
      );
    } else {
      InvoiceService.updateInvoice(id, {
        invoiceCode: newData.invoiceCode,
        purchaseBy: newData.purchaseBy,
        purchaseDate: newData.purchaseDate,
        organizationId: organization.id,
        image: newData.image,
        supplier: newData.supplier,
        itemDetailRequests: newItem,
      }).then((res) => {
        if (res.data.success) {
          navigator("/invoice");
        }
      });
    }
  };

  const filteredCategoryName =
    query === ""
      ? normalCategoryName
      : normalCategoryName.filter((list) =>
          list.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    NormalCategoryService.getAllNormalCategory(organization.id).then((res) => {
      if (res.data.success) {
        setNormalCategoryName(res.data.payload);
      }
    });
  }, []);

  return (
    <>
      <main className="overflow-y-auto bg-white rounded-xl relative con-Shadow text-text-color">
        <div className="flex text-2xl font-sp-pro-text-semibold py-4 px-10 text-text-color">
          <h1 className="flex items-center">
            <FaFileInvoice /> &nbsp;Edit 
          </h1>
          <h1 className="text-2xl font-sp-pro-text-semibold pl-2 text-primary">Invoice</h1>
        </div>
        <hr className="border-[#E1E9EE] border-1" />

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-wrap-reverse xl:flex-nowrap justify-between w-full p-5 md:p-10 pb-5">
            <div className="w-full md:w-7/12 lg:w-full xl:w-7/12 mx-auto">
              <div className="text-base font-sp-pro-text-semibold w-full ">
                <h1>Invoice Detail</h1>
              </div>
              <hr className="border-[#E1E9EE] border-spacing-y-10 mb-5" />

              <section className="p-3 ">
                <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                  <div className="text-left w-full">
                    <label className="block mb-2 ml-1 text-sm">
                      Invoice Code <span className="text-reject">*</span>
                    </label>
                    <input
                      type="text"
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      value={newData.invoiceCode}
                      name="invoiceCode"
                      className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                      placeholder="Enter invoice no..."
                    />
                    {formik.touched.invoiceCode &&
                    formik.errors?.invoiceCode ? (
                      <p className="text-reject text-xs mt-2 pl-1">
                        {formik.errors.invoiceCode}
                      </p>
                    ) : null}
                  </div>
                  <div className="text-left w-full">
                    <label className="block mb-2 ml-1 text-sm">
                      Purchase Date <span className="text-reject">*</span>
                    </label>
                    <input
                      type="date"
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      value={newData.purchaseDate}
                      name="purchaseDate"
                      className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                      placeholder="Enter invoice no..."
                    />
                    {formik.touched.purchaseDate &&
                    formik.errors?.purchaseDate ? (
                      <p className="text-reject text-xs mt-2 pl-1">
                        {formik.errors.purchaseDate}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                  <div className="text-left w-full">
                    <label className="block mb-2 ml-1 text-sm">
                      Purchase By
                    </label>
                    <input
                      type="text"
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      value={newData.purchaseBy}
                      name="purchaseBy"
                      className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                      placeholder="Enter purchaser name..."
                    />
                    {formik.touched.purchaseBy && formik.errors?.purchaseBy ? (
                      <p className="text-reject text-xs mt-2 pl-1">
                        {formik.errors.purchaseBy}
                      </p>
                    ) : null}
                  </div>
                  <div className="text-left w-full">
                    <label className="block mb-2 ml-1 text-sm">Supplier</label>
                    <input
                      type="text"
                      onInput={handleInputChange}
                      onChange={formik.handleChange}
                      value={newData.supplier}
                      name="supplier"
                      className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                      placeholder="Enter supplier name..."
                    />
                    {formik.touched.supplier && formik.errors?.supplier ? (
                      <p className="text-reject text-xs mt-2 pl-1">
                        {formik.errors.supplier}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="text-base font-sp-pro-text-semibold w-full mt-5">
                <h1>Item Detail</h1>
              </div>
              <hr className="border-[#E1E9EE] border-spacing-y-10 mb-5" />

              {newItem.map((list, index) => (
                <section
                  className={`relative border rounded-md px-3 shadow-sm mt-5 ${
                    index % 2 != 0
                      ? "bg-bg-color border-bg-primary-strock"
                      : "border-primary"
                  }`}
                  key={index}
                >
                  {index != 0 && (
                    <div className="absolute -top-3 -right-3">
                      <label onClick={() => handleDeleteItem(index)}>
                        <RiCloseFill className="cursor-pointer bg-white border border-bg-primary-strock h-6 w-6 p-1 hover:bg-bg-primary text-secondary text-opacity-70 rounded-full" />
                      </label>
                    </div>
                  )}
                  <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">
                        Item <span className="text-reject">*</span>
                      </label>
                      <input
                        type="text"
                        onInput={(e) => handleInputChangeItem(e, index)}
                        onChange={formik.handleChange}
                        value={list.name}
                        name="name"
                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                        placeholder="Item name"
                      />
                      {formik.touched?.newItem &&
                      formik.errors?.newItem &&
                      formik.errors?.newItem[index]?.name ? (
                        <p className="text-reject text-xs mt-2 pl-1">
                          {formik.errors?.newItem[index]?.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">
                        {" "}
                        QTY <span className="text-reject">*</span>
                      </label>
                      <input
                        type="number"
                        onInput={(e) => handleInputChangeItem(e, index)}
                        onChange={formik.handleChange}
                        disabled={list.usage > 0 ? "disable" : ""}
                        value={list.qty}
                        name="qty"
                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                        placeholder="0"
                      />
                      {formik.touched?.newItem &&
                      formik.errors?.newItem &&
                      formik.errors?.newItem[index]?.qty ? (
                        <p className="text-reject text-xs mt-2 pl-1">
                          {formik.errors?.newItem[index].qty}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">
                        Unit Price <span className="text-reject">*</span>
                      </label>
                      <input
                        type="number"
                        onInput={(e) => handleInputChangeItem(e, index)}
                        onChange={formik.handleChange}
                        value={list.unitPrice}
                        name="unitPrice"
                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                        placeholder="0"
                      />
                      {formik.touched?.newItem &&
                      formik.errors?.newItem &&
                      formik.errors?.newItem[index]?.unitPrice ? (
                        <p className="text-reject text-xs mt-2 pl-1">
                          {formik.errors?.newItem[index].unitPrice}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex w-full gap-x-6 gap-y-3 flex-col lg:flex-row my-3">
                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">
                        Discount
                      </label>
                      <input
                        type="number"
                        onInput={(e) => handleInputChangeItem(e, index)}
                        onChange={formik.handleChange}
                        value={list.discount}
                        name="discount"
                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">Model</label>
                      <input
                        type="text"
                        onInput={(e) => handleInputChangeItem(e, index)}
                        onChange={formik.handleChange}
                        value={list.model}
                        name="model"
                        className="text-sm border-[#E1E9EE] placeholder-black placeholder-opacity-20  w-full border rounded-lg block py-2 px-4 mb-1 outline-none"
                        placeholder="Enter model name..."
                      />
                    </div>

                    <div className="text-left w-full">
                      <label className="block mb-2 ml-1 text-sm">
                        Category <span className="text-reject">*</span>
                      </label>
                      <div className=" mb-4 md:mb-0 lg:mb-0 xl:mb-0">
                        <Combobox
                          value={normaCategories[index]}
                          onChange={(e) => {
                            handleSelectionChangeItem(e, index),
                              handleSetNormalCategories(e, index);
                          }}
                        >
                          <div className="relative z-20">
                            <div className="relative w-full cursor-default overflow-hidden text-left rounded-md">
                              <Combobox.Input
                                as="input"
                                className="w-full border-[#E1E9EE] placeholder-black placeholder-opacity-20  border rounded-lg bg-[#F9FBFF] py-2  pl-3 pr-10 text-sm text-text-color outline-none focus:border-primary"
                                displayValue={(val) => {
                                  return val.name;
                                }}
                                onChange={(e) => {
                                  setQuery(e.target.value),
                                    (e) => handleSelectionChangeItem(e, index);
                                }}
                                placeholder="Select Category"
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-text-color"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              afterLeave={() => setQuery("")}
                            >
                              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredCategoryName.length === 0 &&
                                query !== "" ? (
                                  <div className="relative cursor-default select-none py-2 px-4 text-text-color">
                                    Nothing found.
                                  </div>
                                ) : (
                                  filteredCategoryName.map((val, index) => (
                                    <Combobox.Option
                                      key={index}
                                      value={val}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 px-5 text-text-color ${
                                          active
                                            ? "bg-custom-yellow-showdow-light"
                                            : ""
                                        }`
                                      }
                                    >
                                      {val.name}
                                    </Combobox.Option>
                                  ))
                                )}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                      </div>
                      {formik.touched?.newItem &&
                      formik.errors?.newItem &&
                      formik.errors?.newItem[index]?.normalCategoryId ? (
                        <p className="text-reject text-xs mt-2 pl-1">
                          {formik.errors?.newItem[index].normalCategoryId}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}

              <label onClick={handleAddMoreItem}>
                <span className="flex flex-row mt-2 items-center cursor-pointer bg-[#003F7D] hover:bg-opacity-90 text-white p-3 py-1.5 rounded-md border   hover:text-opacity-90 float-right">
                  <AiOutlinePlus className="text-xl mr-1" /> Add item
                </span>
              </label>
            </div>

            <div className="w-[24rem] md:w-[22rem] lg:w-[24rem] mx-auto">
              <div className="md:px-5 my-5 flex">
                <div className="w-full shadow p-5 rounded-md mb-1 relative mx-auto">
                  <div className="border border-dashed py-2 border-primary block justify-center text-center rounded-lg">
                    <div className="w-full h-80 flex p-5 relative">
                      {selectedFile ? (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          className="h-full m-auto"
                        />
                      ) : image ? (
                        <img src={image} className="h-full m-auto" />
                      ) : (
                        <img
                          className="block m-auto h-32"
                          src={placeholder}
                        />
                      )}
                    </div>
                    <p className="mt-5 text-xs">Upload Invoice Picture</p>
                    <br />
                    <label
                      htmlFor="logo"
                      className="cursor-pointer shadow-md rounded-md border border-bg-primary px-5 py-2 my-2 "
                    >
                      Browse
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="logo"
                      onChange={handleFileSelect}
                    />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-x-3 px-5 lg:px-10 xl:px-16 mb-10">
            <Link to={'/invoice'}>
              <label
                htmlFor="create-organization"
                className="rounded-md bg-bg-primary py-2 cursor-pointer px-3 text-sm font-sp-pro-text-medium text-text-color text-opacity-70 flex justify-center items-center gap-1"
              >
                <RiCloseFill className="text-lg" />
                Cancel
              </label>
            </Link>

            <button
              type="submit"
              className={`hover:bg-opacity-90 bg-accept  rounded-md cursor-pointer  py-2 px-5 text-sm font-sp-pro-text-medium text-white flex justify-center items-center gap-1`}
            >
              <FiSave className="text-lg" /> Save changes
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
