import { URL_BACK_LISTART } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export async function listArt() {
    let request =  apiBackEnd.get(URL_BACK_LISTART);
    if (
        request=undefined
    ){
        console.log("erreur");
    }
    else{
        return apiBackEnd.get(URL_BACK_LISTART);
    }
}
    