import { Route, Routes as RoutesContainer } from "react-router-dom";
import React from "react";
import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../pages/AccueilView";
import AuthView from "../pages/AuthView";
import ArtDetails from "../pages/ArtDetailsView";
import { CartView } from "../pages/CartView";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CreateArtView from "../pages/CreateArtView";
import { PrivateRoute } from "./PrivateRoute";
import ProfilView from "../pages/ProfilView";
import VerifyEmail from "../pages/VerifyEmailView";


const Routes: React.FC = () => {

    return (
        <RoutesContainer>
            <Route path={URL.URL_HOME} element={<><Header /><HomeView /><Footer /></>} />
            <Route path={URL.URL_LOGIN} element={<AuthView page={"login"} />} />
            <Route path={URL.URL_REGISTER} element={<AuthView page={"register"} />} />
            <Route path={URL.URL_DETAILS_ART + ':uuid'} element={<><Header /><ArtDetails /></>} />
            <Route path={URL.URL_CART} element={<PrivateRoute><Header /><CartView /><Footer /></PrivateRoute>} />
            <Route path={URL.URL_CREATE_ART} element={<PrivateRoute><Header /><CreateArtView /><Footer /></PrivateRoute>} />
            <Route path={URL.URL_PROFIL} element={<PrivateRoute><Header /><ProfilView /></PrivateRoute>} />
            <Route path={URL.URL_VERIFY_EMAIL + ':token'} element={<><Header /><VerifyEmail /></>} />
        </RoutesContainer>
    );
};

export default Routes;
