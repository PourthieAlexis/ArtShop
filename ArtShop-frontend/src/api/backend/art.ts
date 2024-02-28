import * as URL from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function fetchArtDetails(values: any): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_ART_DETAILS + values)
}