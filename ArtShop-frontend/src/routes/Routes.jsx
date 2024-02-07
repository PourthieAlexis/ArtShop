import { Route, Routes as RoutesContainer } from "react-router-dom";

import * as URL from "../constants/urls/urlFrontend";
import HomeView from "../components/Accueil/Accueil";
import AuthView from "../components/Auth/Auth";


const Routes = () => {
    return (
        <RoutesContainer>

            <Route path={URL.URL_HOME} element={<HomeView />} />

            <Route path={URL.URL_LOGIN} element={<AuthView page={"Login"} />} />

            <Route path={URL.URL_REGISTER} element={<AuthView page={"Register"} />} />

        </RoutesContainer>
    );
};

export default Routes;