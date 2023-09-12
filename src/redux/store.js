import { configureStore } from "@reduxjs/toolkit";
import  superCategorySlice  from "./slices/SuperCategorySlice";
import  organizationSlice  from "./slices/OrganizationSlice";
import roomSilce from "./slices/RoomSlice";
import userSlice  from "./slices/UserSlice";
import  assetSlice  from "./slices/AssetSlice";
import invoiceSilce from "./slices/InvoiceSlice";
import  normalCategorySlice  from "./slices/NormalCategorySlice";
import itemDetailSlice  from "./slices/ItemDetailSlice";
import { ImportExport } from "@mui/icons-material";
import  dashboardSlice  from "./slices/DashboardSlice";
import notificationSlice from "./slices/NotificationSlice"


export const store = configureStore({
    reducer: {
        notification : notificationSlice, 
        superCategory: superCategorySlice,
        organization: organizationSlice,
        room: roomSilce,
        user: userSlice,
        asset: assetSlice,
        invoice: invoiceSilce,
        normalCategory : normalCategorySlice,
        itemDetail: itemDetailSlice,
        dashboard : dashboardSlice,
    }
});

export default store;
