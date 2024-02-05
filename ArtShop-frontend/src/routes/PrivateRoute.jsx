import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { URL_HOME, URL_LOGIN } from '../constants/urls/urlFrontend';
import { selectHasRole, selectIsLogged } from '../redux-store/authenticationSlice';


export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsLogged);
    const hasRole = useSelector((state) => selectHasRole(state, roles));
    if (!isAuthenticated)
        return <Navigate replace to={URL_LOGIN} state={{ from: location }} />;

    if (roles && !hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};
