import { WithRouterProps } from "next/dist/client/with-router";
import { URLMapping } from "../../types/DashboardPage";

export namespace IMainDashboard {
    export interface IInnerProps {
        page: number;
        totalPage: number;
        urlsMapping: URLMapping[];
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainDashboardProps = WithRouterProps & IMainDashboard.IInnerProps & IMainDashboard.IInnerProps & IMainDashboard.IStateFromProps & IMainDashboard.IPropsFromDispatch;

export interface IMainDashboardStates {
}
