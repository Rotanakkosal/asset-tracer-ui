import React from "react";
import upload from "../../../assets/images/Room/Upload.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import upload_placeholder from "../../../assets/images/placeholder/upload_placeholder.svg";
import { useEffect } from "react";
import InvoiceService from "../../../redux/services/InvoiceService";
import { setInvoiceDetail } from "../../../redux/slices/InvoiceSlice";
import { useState } from "react";
import FileUploadService from "../../../redux/services/FileUploadService";
import { BiCloudDownload } from "react-icons/bi";
import moment from "moment";

export default function ViewInvoiceComponent(props) {
  const invoiceDetail = useSelector((state) => state.invoice.invoiceDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState();

  useEffect(() => {
    InvoiceService.getInvoiceById(id).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        dispatch(setInvoiceDetail(res.data.payload));
        if (res.data.payload.image) {
          setImage(FileUploadService.getImage(res.data.payload.image));
        }
      }
    });
  }, [id]);

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  

  return (
    <>
      <main className="overflow-x-hidden bg-white rounded-xl relative con-Shadow text-text-color on-Shadow min-h-[calc(100vh-9rem)]">
        <div className="flex text-2xl font-sp-pro-text-semibold py-4 px-10 text-text-color">
          <h1 className="flex items-center">
            <FaFileInvoice /> &nbsp;View
            <h1 className="text-2xl font-sp-pro-text-semibold pl-2 text-primary">
              Invoice
            </h1>
           
          </h1>
        </div>
        
        <hr className="border-[#E1E9EE] border-1" />

        <div className="flex flex-wrap xl:flex-nowrap justify-between w-full p-10 pb-5">
          <div className="w-full lg:w-full xl:w-7/12">
            <div className="text-base font-sp-pro-text-semibold w-full ">
              <h1>Invoice Detail</h1>
            </div>
            <hr className="border-[#E1E9EE] border-spacing-y-10 mb-5" />

            <section className="overflow-x-scroll">
              <table className="table w-full">
                <tbody className="">
                  <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none text-white">
                    <td className="w-3/12  bg-primary py-3">Invoice Code</td>
                    <td className="w-3/12 bg-primary py-3">Purchse By</td>
                    <td className="w-3/12 bg-primary py-3">Supplier</td>
                    <td className="w-3/12 bg-primary py-3">Purchase Date</td>
                  </tr>
                  <tr>
                    <td className="w-3/12 py-3 text-blue-700">
                      {invoiceDetail.invoiceCode}
                    </td>
                    <td className="w-3/12 py-3">{invoiceDetail.purchaseBy}</td>
                    <td className="w-3/12 py-3">{invoiceDetail.supplier}</td>
                    <td className="w-3/12 py-3">
                      {moment(invoiceDetail.purchaseDate).format("MMM DD YYYY")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <br />
            <div className="text-base font-sp-pro-text-semibold w-full ">
              <h1>Item</h1>
            </div>
            <hr className="border-[#E1E9EE] border-spacing-y-10 mb-5" />

            <section className="overflow-x-scroll">
              <table className="table w-full">
                <tbody className="">
                  <tr className="text-sm font-sp-pro-text-semibold text-opacity-90 divide-none text-white">
                    <td className="w-3/12  bg-primary py-3">Name</td>
                    <td className="w-3/12 bg-primary py-3">QTY</td>
                    <td className="w-3/12 bg-primary py-3">Unit Price</td>
                    <td className="w-3/12 bg-primary py-3">Discount</td>
                    <td className="w-3/12 bg-primary py-3">Total</td>
                  </tr>
                  {invoiceDetail?.itemDetails.map((list, index) => (
                    <tr key={index}>
                      <td className="w-3/12 py-3 capitalize">{list.name}</td>
                      <td className="w-3/12 py-3">{list.qty}</td>
                      <td className="text-green w-3/12 py-3">
                        {dollarUS.format(list.unitPrice)}
                      </td>
                      <td className="text-primary w-3/12 py-3">
                        % {list.discount}
                      </td>
                      <td className="text-green w-3/12 py-3">
                        {dollarUS.format(list.qty * (list.unitPrice - (list.unitPrice*list.discount)/100))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
          <div className="w-full sm:w-[24rem] xl:w-[28rem] mx-auto">
            <div className="px-5 my-5 flex">
              <div className="w-full flex p-5 relative">
                <img
                  className="block m-auto h-full"
                  src={image != null ? image : ""}
                />
              </div>
            </div>
            {/* {image != null && (
              <div className="w-full px-10">
                <button className="flex justify-center items-center text-base border border-primary text-primary p-1 mx-auto w-full rounded-lg gap-1">
                  <BiCloudDownload className="text-xl" /> Print
                </button>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </>
  );
}
