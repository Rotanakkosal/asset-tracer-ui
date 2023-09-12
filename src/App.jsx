import './App.css'
import { Route, Routes, useLocation, } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import SignUpComponent from './components/Authentication/SignUpComponent'
import SignInComponent from './components/Authentication/SignInComponent'
import ForgotPasswordComponent from './components/Authentication/ForgotPasswordComponent'
import SuccessComponent from './components/Authentication/SuccessComponent'
import MainComponent from './components/Layouts/MainComponent'
import OrganizationListComponent from './components/admin/organization/OrganizationListComponent'
import OrganzationCreateOrJoinComponent from './components/admin/organization/OrganzationCreateOrJoinComponent'
import SuperCategoryComponent from './components/admin/superCategory/SuperCategoryComponent'
import NormalCategoryComponent from './components/admin/normalCategory/NormalCategoryComponent'
import UsersAllComponent from './components/admin/user/UsersAllComponent'
import DashboardComponent from './components/admin/dashboard/DashboardComponent'
import AssetComponent from './components/admin/asset/AssetComponent'
import InvoiceComponent from './components/admin/invoice/InvoiceComponent'
import ProfileComponent from './components/admin/profile/ProfileComponent'
import HomeComponent from './components/homepage/HomeComponent'
import ContactComponent from './components/homepage/ContactComponent'
import AboutPageComponent from './components/homepage/AboutPageComponent'
import EmailSendingComponent from './components/Authentication/EmailSendingComponent'
import ResetPasswordComponent from './components/Authentication/ResetPasswordComponent'
import ViewInvoiceComponent from './components/admin/invoice/ViewInvoiceComponent'
import UpdateInvoiceComponent from './components/admin/invoice/UpdateInvoiceComponent'
import TrackingComponent from './components/admin/tracking/TrackingComponent'
import UserRequestComponent from './components/admin/user/UserRequestComponent'
import AssetAddComponent from './components/admin/asset/AssetAddComponent'
import NotFoundPageComponent from './components/admin/notFoundPage/NotFoundPageComponent'
import NotificationComponent from './components/admin/notification/NotificationComponent'
import { useLayoutEffect } from 'react'
import AddInvoiceComponent from './components/admin/invoice/AddInvoiceComponent'
import AssetSetComponent from './components/admin/asset/AssetSetComponent'
import { useSelector } from 'react-redux'
import AssetUpdateComponent from './components/admin/asset/AssetUpdateComponent'
import RoomComponent from './components/admin/Room/RoomComponent'
import AssetMutipleSetComponent from './components/admin/asset/AssetMutipleSetComponent'

function App() {
  const { pathname } = useLocation();
  const item = useSelector(state => state.organization?.item)

  const organization = localStorage.getItem("organization")
  console.log(organization)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/contact' element={<ContactComponent />} />
        <Route path='/about' element={<AboutPageComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/signin' element={<SignInComponent />} />
        <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
        <Route path='/email-sending' element={<EmailSendingComponent />} />
        <Route path='/reset-password' element={<ResetPasswordComponent />} />
        <Route path='/success' element={<SuccessComponent />} />
        <Route path='*' element={<NotFoundPageComponent />} />
        <Route element={<ProtectedRoute isLogged={localStorage.getItem("token") ? true : false} />}>
          <Route path="/" element={<MainComponent />}>

            <Route path='/dashboard' element={<DashboardComponent />} />

            {/* Organization */}
            <Route path='/organization' element={<OrganizationListComponent />} />
            <Route path='/organization-create' element={<OrganzationCreateOrJoinComponent />} />

            {/* Category */}
            <Route path='/super-category' element={<SuperCategoryComponent />} />
            <Route path='/normal-category' element={<NormalCategoryComponent />} />

            {/* Invoice */}
            <Route path='/invoice' element={<InvoiceComponent />} />
            <Route path='/invoice/view/:id' element={<ViewInvoiceComponent />} />
            <Route path='/invoice/update/:id' element={<UpdateInvoiceComponent />} />
            <Route path='/invoice/add' element={<AddInvoiceComponent />} />

            {/* Asset */}
            <Route path='/asset' element={<AssetComponent />}></Route>
            <Route path='/asset/add' element={<AssetAddComponent />}></Route>
            <Route path='/asset/update/:id' element={<AssetUpdateComponent />} />
            <Route path='/asset-add' element={<AssetAddComponent />}></Route>
            <Route path='/asset-set' element={<AssetSetComponent />} />
            <Route path='/asset-set-multiple' element={<AssetMutipleSetComponent />} />

            {/* Tracking */}
            <Route path='/tracking' element={<TrackingComponent />}></Route>

            {/* User */}
            <Route path='/user' element={<UsersAllComponent />}></Route>
            <Route path='/request' element={<UserRequestComponent />}></Route>
            <Route path='/user-request' element={<UserRequestComponent />}></Route>
            <Route path='/profile' element={<ProfileComponent />} />

            {/* Room */}
            <Route path='/room' element={<RoomComponent />}></Route>

            {/* Notification */}
            <Route path='/notification' element={<NotificationComponent />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
