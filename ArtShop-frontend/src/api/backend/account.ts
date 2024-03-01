import { URL_BACK_AUTHENTICATE, URL_BACK_REGISTER, URL_BACK_PROFILE, URL_BACK_PROFILE_MODIFY } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function authenticate(values: any): Promise<any> {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function register(values: any): Promise<any> {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function getProfile(values: any): Promise<any>{
    return apiBackEnd.get(URL_BACK_PROFILE+ values);
}

export function setProfile(uuid: string, values: any): Promise<any>{
    return apiBackEnd.post(URL_BACK_PROFILE_MODIFY+ uuid, values);
}