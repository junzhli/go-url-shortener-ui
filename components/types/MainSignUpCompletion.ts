import { WithRouterProps } from "next/dist/client/with-router";

export namespace IMainSignUpCompletion {
    export interface IInnerProps {
        userEmail?: string;
        completionToggle: () => void;
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainSignUpCompletionProps = WithRouterProps & IMainSignUpCompletion.IInnerProps & IMainSignUpCompletion.IStateFromProps & IMainSignUpCompletion.IPropsFromDispatch;

export interface IMainSignUpCompletionStates {
    userCode0: string;
    userCode1: string;
    userCode2: string;
    userCode3: string;
    userCode4: string;
    userCode5: string;
    localSignUpIsSuccessfull: boolean;
    localSignUpErrMessage: string;
}
