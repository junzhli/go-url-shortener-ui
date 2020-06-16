import { ISetUserIsLoggedIn } from "./types/user";
import { SET_USER_IS_LOGGED_IN } from "./constant";

export const setUserIsLoggedIn = (isLoggedIn: boolean): ISetUserIsLoggedIn => {
    return {
        type: SET_USER_IS_LOGGED_IN,
        payload: isLoggedIn,
    };
};
