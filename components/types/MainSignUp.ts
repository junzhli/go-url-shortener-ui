import { WithRouterProps } from "next/dist/client/with-router";

export namespace IMainSignUp {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainSignUpProps = WithRouterProps & IMainSignUp.IInnerProps & IMainSignUp.IStateFromProps & IMainSignUp.IPropsFromDispatch;

export interface IMainSignUpStates {
    userEmail: string;
    userPassword: string;
    localSignUpIsSuccessfull: boolean;
    localSignUpErrMessage: string;
}
