import * as URL from "../../constants/urls/urlBackend";
import { AddHeader } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function showCart(token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.get(URL.URL_BACK_SHOW_CART, headers)
}

export function addToCart(values: any, token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.post(URL.URL_BACK_ADD_TO_CART, values, headers)
}