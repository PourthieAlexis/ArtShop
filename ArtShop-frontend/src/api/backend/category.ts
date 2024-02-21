import {URL_BACK_CATEGORY} from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function filterArt(): Promise<any> {
    return apiBackEnd.get(URL_BACK_CATEGORY);
}
