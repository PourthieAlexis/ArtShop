import * as URL from "../../constants/urls/urlBackend";
import { AddToken } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function fetchArtDetails(values: any): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_ART_DETAILS + values)
}

export function getUserArtWorks(token: string | null): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_USER_ARTWORKS, AddToken(token))
}


export function getUserArtWorksByUuid(uuid: string): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_USER_ARTWORKS_BY_UUID.replace(':uuid', uuid))
}

export async function getArt({ pageParam, searchTerm = '' }: { pageParam: number; searchTerm?: string }): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_ART, { params: { searchTerm, page: pageParam } });
}


