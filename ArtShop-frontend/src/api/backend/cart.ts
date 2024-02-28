import * as URL from "../../constants/urls/urlBackend";
import { AddToken } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function showCart(token: string | null): Promise<any> {
    return apiBackEnd.get(URL.URL_BACK_SHOW_CART, AddToken(token))
}

export function addToCart(values: any, token: string | null): Promise<any> {
    return apiBackEnd.post(URL.URL_BACK_ADD_TO_CART, values, AddToken(token))
}