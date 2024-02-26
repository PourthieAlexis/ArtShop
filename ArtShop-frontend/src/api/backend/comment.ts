import { URL_BACK_ADD_COMMENT } from "../../constants/urls/urlBackend";
import apiBackEnd from "./apiBackend";

function AddToken(token: string | null) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }
}

export function AddComment(values: any, token: string | null): Promise<any> {
    return apiBackEnd.post(URL_BACK_ADD_COMMENT, values, AddToken(token));
}