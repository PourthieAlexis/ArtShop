import { URL_BACK_ADD_COMMENT } from "../../constants/urls/urlBackend";
import { AddHeader } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function AddComment(values: any, token: string | null): Promise<any> {
    const headers = AddHeader(token);
    return apiBackEnd.post(URL_BACK_ADD_COMMENT, values, headers);
}