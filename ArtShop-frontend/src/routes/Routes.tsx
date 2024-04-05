import { Route, Routes as RoutesContainer } from "react-router-dom";
import React from "react";
import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../pages/AccueilView";
import AuthView from "../pages/AuthView";
import ArtDetails from "../pages/ArtDetailsView";
import { CartView } from "../pages/CartView";
import Header from "../components/Header";
import Footer from "../components/Footer";


const Routes: React.FC = () => {

    return (
        <RoutesContainer>
            <Route path={URL.URL_HOME} element={<><Header /><HomeView /></>} />
            <Route path={URL.URL_LOGIN} element={<AuthView page={"login"} />} />
            <Route path={URL.URL_REGISTER} element={<AuthView page={"register"} />} />
            <Route path={URL.URL_DETAILS_ART + ':uuid'} element={<><Header /><ArtDetails /></>} />
            <Route path={URL.URL_CART} element={<><Header /><CartView /><Footer /></>} />
        </RoutesContainer>
    );
};

export default Routes;
