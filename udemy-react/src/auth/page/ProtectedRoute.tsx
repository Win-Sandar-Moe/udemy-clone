import {useAuthStore} from "../store/useAuthStore.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";


interface ProtectedRouteProps{
    allowedRoles?:string[];
}
export default function ProtectedRoute({allowedRoles}:ProtectedRouteProps){
    const {isAuthenticated,user} = useAuthStore();
    const location=useLocation();
    //login
    if(!isAuthenticated){
        return <Navigate to="/login" state={location} replace/>
    }
    //role
    if(allowedRoles && allowedRoles.length > 0){
        const hasRequiredRole = user?.roles?.some(role =>
            allowedRoles.includes(role));
        if(!hasRequiredRole){
            return <Navigate to="/unauthorized"  replace/>
        }
    }
    return <Outlet />
}