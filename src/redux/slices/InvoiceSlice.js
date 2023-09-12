import { createSlice} from '@reduxjs/toolkit';

const initialState ={
    data:[],
    invoiceDetail: {
        id: "",
        invoiceCode: "",
        purchaseBy: "",
        purchaseDate: "",
        supplier: "",
        createdAt: "",
        image: "",
        itemDetails: []
    }
}
export const invoiceSilce = createSlice ({

    name: "Invoices",
    initialState,
    reducers:{
        setAllInvoice: (state, action) => {
            state.data = action.payload;
        },
        setInvoiceDetail: (state, action) => {
            state.invoiceDetail = action.payload
        }
    }
});
export const {setAllInvoice, setInvoiceDetail} = invoiceSilce.actions
export default invoiceSilce.reducer;