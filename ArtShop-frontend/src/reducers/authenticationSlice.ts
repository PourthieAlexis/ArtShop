import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPayloadToken, isTokenValid, setToken } from '../services/tokenServices';

interface User {
    email: string;
    roles: string[];
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.token = token;
            const claims = getPayloadToken(token);
            const user: User = {
                email: claims.email,
                roles: claims.roles,
            };
            state.user = user;
            state.isAuthenticated = isTokenValid(token);
            setToken(action.payload);
        },
        signOut: (state) => {
            localStorage.clear();
            sessionStorage.clear();
            state.isAuthenticated = false;
        },
    },
});

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectHasRole = (state: { auth: AuthState }, roles: string[]) => {
    if (!roles || roles.length === 0) return true;
    const user = state.auth.user;
    if (!user) return false;
    return user.roles.some((role) => roles.includes(role));
};

export default authenticationSlice.reducer;
