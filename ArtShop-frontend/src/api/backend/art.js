import {URL_BACK_LISTART } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

export async function listArt() {
    return apiBackEnd.get(URL_BACK_LISTART);
}
