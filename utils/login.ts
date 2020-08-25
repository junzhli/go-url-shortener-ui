import Cookies, { CookieSetOptions } from "universal-cookie";
import COOKIE_KEY from "../components/constants/cookie";

const cookies = new Cookies();
const userLoginCookieOptions: CookieSetOptions = {
    path: "/",
    expires: new Date((new Date()).setTime((new Date()).getTime() + (1000 * 60 * 60 * 24 * 1))),
    domain: process.env["NEXT_PUBLIC_DOMAIN"],
    secure: (process.env["NEXT_PUBLIC_USE_HTTPS"] === "true"),
    sameSite: "lax"
};

export const setLoginCookie = (accessToken: string) => {
    cookies.set(COOKIE_KEY.ACCESS_TOKEN, accessToken, userLoginCookieOptions);
};

export const isUserLogin = () => {
    return !(cookies.get(COOKIE_KEY.ACCESS_TOKEN) === undefined);
};

export const getUserAccessToken = () => {
    const accessToken = cookies.get(COOKIE_KEY.ACCESS_TOKEN);
    if (accessToken === undefined) {
        return null;
    }
    return accessToken;
};

export const removeUserAccessToken = () => {
    cookies.remove(COOKIE_KEY.ACCESS_TOKEN, userLoginCookieOptions);
};