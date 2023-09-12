import apiV2 from "./apiV2";

const getAllInvoices = async (orgId, page = 1, size = 8, invoiceCode = "", purchaseBy = "", supplier = "", sort = "") => {
   return await apiV2.get(`/invoices/filter/${orgId}?page=${page}&size=${size}&invoiceCode=${invoiceCode}&purchaseBy=${purchaseBy}&supplier=${supplier}&sort=${sort}`)
}

const saveInvoice = async (data) => {
   return await apiV2.post(`/invoices`, data)
}

const getInvoiceById = async (id) => {
   return await apiV2.get(`/invoices/${id}`)
}

const updateInvoice = async (id, data) => {
   return await apiV2.put(`/invoices/update/${id}`, data)
}

const InvoiceService = { getAllInvoices, saveInvoice, getInvoiceById, updateInvoice };
export default InvoiceService;