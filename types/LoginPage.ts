import { WithRouterProps } from "next/dist/client/with-router";
import { IWithAuthProps } from "../components/types/WithAuth";

export namespace ILoginPage {
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

export type ILoginPageProps = WithRouterProps & ILoginPage.IInnerProps & ILoginPage.IStateFromProps & ILoginPage.IPropsFromDispatch;

export interface ILoginPageStates {
    // isLoaded: boolean;
}

export type ILoginPageNextGetServerSideProps = IWithAuthProps & ILoginPage.INextGetServerSideInnerProps;
