import { Route, Routes as RoutesContainer } from "react-router-dom";

import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../components/Accueil/Accueil";
import AuthView from "../components/Auth/Auth";
import ArtDetails from "../components/ArtDetails";


const Routes = () => {
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