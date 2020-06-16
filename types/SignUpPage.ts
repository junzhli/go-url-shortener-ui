import { WithRouterProps } from "next/dist/client/with-router";
import { IWithAuthProps } from "../components/types/WithAuth";

export namespace ISignUpPage {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }

    export interface INextGetServerSideInnerProps {
    }
}

export type ISignUpPageProps = WithRouterProps & ISignUpPage.IInnerProps & ISignUpPage.IStateFromProps & ISignUpPage.IPropsFromDispatch;

export interface ISignUpPageStates {
    // isLoaded: boolean;
}

export type ISignUpPageNextGetServerSideProps = IWithAuthProps & ISignUpPage.INextGetServerSideInnerProps;
