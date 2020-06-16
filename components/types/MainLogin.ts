import { WithRouterProps } from "next/dist/client/with-router";

export namespace IMainLogin {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainLoginProps = WithRouterProps & IMainLogin.IInnerProps & IMainLogin.IStateFromProps & IMainLogin.IPropsFromDispatch;

export interface IMainLoginStates {
    userEmail: string;
    userPassword: string;
    localSignInErrMessage: string;
}
