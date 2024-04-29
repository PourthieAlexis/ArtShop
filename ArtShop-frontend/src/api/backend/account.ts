import { URL_BACK_AUTHENTICATE, URL_BACK_REGISTER, URL_BACK_USER, URL_BACK_UPDATE_USER_PROFIL, URL_BACK_USER_PROFIL_PICTURE, URL_BACK_VERIFY_EMAIL } from "../../constants/urls/urlBackend";
import { AddHeader } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function authenticate(values: any): Promise<any> {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function register(values: any): Promise<any> {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function getUser(token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.get(URL_BACK_USER, headers);
}

export function editProfil(values: any, token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.patch(URL_BACK_UPDATE_USER_PROFIL, values, headers);
}

export function changeProfilePicture(values: any, token: string | null): Promise<any> {
    const headers = AddHeader(token, 'multipart/form-data');
    return apiBackEnd.post(URL_BACK_USER_PROFIL_PICTURE, values, headers);
}

export function verifyEmail(JWTtoken: string | null, token: string): Promise<any> {
    const headers = AddHeader(JWTtoken);
    return apiBackEnd.post(URL_BACK_VERIFY_EMAIL, { token }, headers);
}
