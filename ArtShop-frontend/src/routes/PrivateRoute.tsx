import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from '../constants/urls/urlFrontend';
import { selectHasRole, selectIsLogged } from '../reducers/authenticationSlice';
import { RootState } from '../reducers/store';

interface PrivateRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles = ['ROLE_USER'] }) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => selectIsLogged(state));
    const hasRole = useSelector((state: RootState) => selectHasRole(state, roles));
    if (!isAuthenticated)
        return <Navigate replace to={URL_LOGIN} state={{ from: location }} />;

    if (roles && !hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;

    return <>{children}</>;
};
