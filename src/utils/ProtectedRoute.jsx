import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return localStorage.getItem('token') ? <Outlet/> : <Navigate to="/signin" />;
}
export default ProtectedRoute;