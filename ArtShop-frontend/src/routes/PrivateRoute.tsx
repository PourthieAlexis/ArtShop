import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from '../constants/urls/urlFrontend';
import { selectHasRole, selectIsLogged } from '../redux-store/authenticationSlice';

interface PrivateRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsLogged);
    const hasRole = useSelector((state) => selectHasRole(state, roles));

    if (!isAuthenticated)
        return <Navigate replace to={URL_LOGIN} state={{ from: location }} />;

    if (roles && !hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;

    return <>{children}</>;
};
