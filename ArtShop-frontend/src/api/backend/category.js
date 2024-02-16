import {URL_BACK_CATEGORY} from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export async function filterArt(){
    return apiBackEnd.get(URL_BACK_CATEGORY);
}