import { URL_BACK_ART_DETAILS, URL_BACK_LISTART } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function fetchArtDetails(values: any): Promise<any> {
    //concat url 
    return apiBackEnd.get(URL_BACK_ART_DETAILS + values)
}

export function listArt(): Promise<any> {
    return apiBackEnd.get(URL_BACK_LISTART)
}