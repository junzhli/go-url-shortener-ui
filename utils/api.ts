import { AccessToken, GetUserListOptions, BaseUri, ResponseUserURLList, ResponseShortenURL } from "./types/api";

import axios, { AxiosError } from "axios";

export class BadRequestError extends Error {
    reason: string;
    constructor(err: AxiosError) {
        super("BadRequest");
        this.name = "BadRequestError";
        this.reason = err.response.data;
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = "UnauthorizedError";
    }
}

export class NotFoundError extends Error {
    constructor() {
        super("NotFound");
        this.name = "NotFoundError";
    }
}

export class UnknownStatusError extends Error {
    err: AxiosError;
    constructor(code: any, axiosErr: AxiosError) {
        super("UnknownStatus code: " + code);
        this.name = "UnknownStatusError";
        this.err = axiosErr;
    }
}

const axiosOptions = (token: AccessToken) => {
    return {
        headers: {
            Cookie: `accessToken=${token}`
        },
        withCredentials: true,
    };
};

export const getUserUrlList = async (baseUri: BaseUri, token: AccessToken, options?: GetUserListOptions) => {
    const offset = (options && options.offset) || 0;
    const limit = (options && options.limit) || 100;

    const axiosObject = axios.get.bind(null, `${baseUri}/api/user/url/list?offset=${offset}&limit=${limit}`, axiosOptions(token));
    return await processResponse(axiosObject) as ResponseUserURLList;
};

export const shortenUrl = async (baseUri: BaseUri, token: AccessToken, url: string) => {
    const axiosObject = axios.post.bind(null, `${baseUri}/api/shortener/`, {
        url,
    }, axiosOptions(token));
    return await processResponse(axiosObject) as ResponseShortenURL;
};

export const deleteUserUrl = async (baseUri: BaseUri, token: AccessToken, shortenId: string) => {
    const axiosObject = axios.delete.bind(null, `${baseUri}/api/user/url/r/${shortenId}`, axiosOptions(token));
    await processResponse(axiosObject);
};

export const userAuthenticated = async (baseUri: BaseUri, token: AccessToken) => {
    const axiosObject = axios.get.bind(null, `${baseUri}/api/user/authCheck`, axiosOptions(token));
    try {
        await processResponse(axiosObject);
        return true;
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return false;
        }
        throw error;
    }
};


const processResponse = async (axiosObject) => {
    try {
        return (await axiosObject()).data;
    } catch (error) {
        if (error.response && error.response.status) {
            if (error.response.status === 400) {
                throw new BadRequestError(error);
            } else if (error.response.status === 401) {
                throw new UnauthorizedError();
            } else if (error.response.status === 404) {
                throw new NotFoundError();
            } else {
                throw new UnknownStatusError(error.response.status, error);
            }
        }
        throw error;
    }
};