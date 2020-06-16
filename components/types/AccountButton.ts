export namespace IAccountButton {
    export interface IInnerProps {
        logoutOnClick?: (event: any) => void;
    }

    export interface IStateFromProps {
        userLoggedIn: boolean;
    }

    export interface IPropsFromDispatch {
        setUserIsLoggedIn: (isLoggedIn: boolean) => void;
    }
}

export type IAccountButtonProps = IAccountButton.IInnerProps & IAccountButton.IStateFromProps & IAccountButton.IPropsFromDispatch;

export interface IAccountButtonStates {
}
