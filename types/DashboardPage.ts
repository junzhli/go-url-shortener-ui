import { WithRouterProps } from "next/dist/client/with-router";
import { IWithAuthProps } from "../components/types/WithAuth";
import { AdditionalAppProps } from "./_app";

export interface URLMapping {
    oriUrl: string;
    shortenUrl: string;
    hits: number;
}

export namespace IDashboardPage {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }

    export interface INextGetServerSideInnerProps {
        page: number;
        totalPage: number;
        limit: number;
        urlsMapping: URLMapping[];
    }
}

export type IDashboardPageProps = IDashboardNextGetServerSideProps & WithRouterProps & IDashboardPage.IInnerProps & IDashboardPage.IStateFromProps & IDashboardPage.IPropsFromDispatch;

export interface IDashboardPageStates {
    // isLoaded: boolean;
}

export type IDashboardNextGetServerSideProps = IWithAuthProps & IDashboardPage.INextGetServerSideInnerProps & AdditionalAppProps;
