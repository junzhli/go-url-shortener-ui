import { WithRouterProps } from "next/dist/client/with-router";

export namespace IMainBanner {
    export interface IInnerProps {
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IMainBannerProps = WithRouterProps & IMainBanner.IInnerProps & IMainBanner.IStateFromProps & IMainBanner.IPropsFromDispatch;

export interface IMainBannerStates {
    url: string;
    isMobile: boolean;
    mobileMenuIsActive: boolean;
}
