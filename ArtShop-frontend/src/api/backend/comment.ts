import { URL_BACK_ADD_COMMENT } from "../../constants/urls/urlBackend";
import { AddToken } from "../apiUtils";
import apiBackEnd from "./apiBackend";

export function AddComment(values: any, token: string | null): Promise<any> {
    return apiBackEnd.post(URL_BACK_ADD_COMMENT, values, AddToken(token));
}