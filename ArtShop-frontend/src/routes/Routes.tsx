import { Route, Routes as RoutesContainer } from "react-router-dom";
import React from "react";
import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../pages/AccueilView";
import AuthView from "../pages/AuthView";
import ArtDetails from "../pages/ArtDetailsView";
import { CartView } from "../pages/CartView";


const Routes: React.FC = () => {

    return (
        <RoutesContainer>
            <Route path={URL.URL_HOME} element={<HomeView />} />
            <Route path={URL.URL_LOGIN} element={<AuthView page={"Login"} />} />
            <Route path={URL.URL_REGISTER} element={<AuthView page={"Register"} />} />
            <Route path={URL.URL_DETAILS_ART} element={<ArtDetails />} />
            <Route path={URL.URL_CART} element={<CartView />} />
        </RoutesContainer>
    );
};

export default Routes;
