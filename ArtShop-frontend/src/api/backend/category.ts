import * as URL from "../../constants/urls/urlBackend";
import { AddHeader } from "../apiUtils";
import apiBackEnd from "./apiBackend";


export async function getCategory(token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.get(URL.URL_BACK_CATEGORY, headers);
}
