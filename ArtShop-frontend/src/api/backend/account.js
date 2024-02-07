import { URL_BACK_AUTHENTICATE, URL_BACK_REGISTER } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

