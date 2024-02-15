import { Route, Routes as RoutesContainer } from "react-router-dom";
import React from "react";

import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../pages/Accueil";
import AuthView from "../pages/Auth";
import ArtDetails from "../pages/ArtDetails";

const Routes: React.FC = () => {
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