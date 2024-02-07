import { URL_BACK_LISTART } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function listArt(values) {
    return apiBackEnd.post(URL_BACK_LISTART, values);
}