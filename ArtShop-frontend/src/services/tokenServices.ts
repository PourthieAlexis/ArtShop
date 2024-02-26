import { jwtDecode } from 'jwt-decode';

const TOKEN_NAME = 'token';

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
}

export function getPayloadToken(token: string): any {
    return jwtDecode(token);
}

export function isTokenValid(token: string): boolean {
    try {
        const payload: any = getPayloadToken(token);
        const roles: string[] = payload.roles;
        const expirationDate: number = payload.exp;
        const login: string = payload.email;
        const dateNow: number = new Date().getTime();
        return !!(token && roles.length > 0 && login && expirationDate < dateNow);
    } catch {
        return false;
    }
}
