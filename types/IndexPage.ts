import { WithRouterProps } from "next/dist/client/with-router";
import { IWithAuthProps } from "../components/types/WithAuth";

export namespace IIndexPage {
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

export type IIndexPageProps = IIndexNextGetServerSideProps & WithRouterProps & IIndexPage.IInnerProps & IIndexPage.IStateFromProps & IIndexPage.IPropsFromDispatch;

export interface IIndexPageStates {
    // isLoaded: boolean;
}

export type IIndexNextGetServerSideProps = IWithAuthProps & IIndexPage.INextGetServerSideInnerProps;
