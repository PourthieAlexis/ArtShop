import * as URL from "../../constants/urls/urlBackend";
import { AddHeader } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function fetchArtDetails(values: any): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_ART_DETAILS + values)
}

export function getUserArtWorks(token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.get(URL.URL_BACK_GET_USER_ARTWORKS, headers);
}


export function getUserArtWorksByUuid(uuid: string): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_USER_ARTWORKS_BY_UUID.replace(':uuid', uuid))
}

export async function getArt({ pageParam, searchTerm = '' }: { pageParam: number; searchTerm?: string }): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_ART, { params: { searchTerm, page: pageParam } });
}

export async function createArt(values: any, token: string | null): Promise<any> {
    const headers = AddHeader(token, 'multipart/form-data');
    return apiBackEnd.post(URL.URL_BACK_CREATE_ART, values, headers);
}
