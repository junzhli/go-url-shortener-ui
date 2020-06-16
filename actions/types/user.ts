import { SET_USER_IS_LOGGED_IN } from "../constant";

export interface ISetUserIsLoggedIn {
    type: typeof SET_USER_IS_LOGGED_IN;
    payload: boolean;
}

export type UserActionType = ISetUserIsLoggedIn;
