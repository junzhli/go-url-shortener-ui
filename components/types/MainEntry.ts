import { WithRouterProps } from "next/dist/client/with-router";

export namespace IMainEntry {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainEntryProps = WithRouterProps & IMainEntry.IInnerProps & IMainEntry.IStateFromProps & IMainEntry.IPropsFromDispatch;

export interface IMainEntryStates {
    userEmail: string;
    userPassword: string;
    localSignInErrMessage: string;
}
