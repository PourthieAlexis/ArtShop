import * as URL from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export function fetchArtDetails(values: any): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_ART_DETAILS + values)
}

export async function getArt({ pageParam, searchTerm = '' }: { pageParam: number; searchTerm?: string }): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_GET_ART, { params: { searchTerm, page: pageParam } });
}

