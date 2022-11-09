import {
    Outlet,
    Navigate
} from "react-router";
import { useSelector, useDispatch } from "react-redux";

const AuthGuard = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    console.log(user.role);
    return isAuthenticated ? user.role === 'user' ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/" />;
}

export default AuthGuard;