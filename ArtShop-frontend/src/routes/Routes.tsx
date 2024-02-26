import { Navigate, Route, Routes as RoutesContainer } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../pages/Accueil";
import AuthView from "../pages/Auth";
import ArtDetails from "../pages/ArtDetails";
import { useDispatch } from "react-redux";
import { getToken, isTokenValid } from "../services/tokenServices";
import { signIn } from "../reducers/authenticationSlice";


const Routes: React.FC = () => {

    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token && isTokenValid(token)) dispatch(signIn(token));
        setIsLogin(false);
    }, []);

    if (isLogin) return <Navigate to="/login" />;

    return (
        <RoutesContainer>
            <Route path={URL.URL_HOME} element={<HomeView />} />
            <Route path={URL.URL_LOGIN} element={<AuthView page={"Login"} />} />
            <Route path={URL.URL_REGISTER} element={<AuthView page={"Register"} />} />
            <Route path={URL.URL_DETAILS_ART} element={<ArtDetails />} />
        </RoutesContainer>
    );
};

export default Routes;
