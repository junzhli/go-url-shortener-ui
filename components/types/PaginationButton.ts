export namespace IPaginationButton {
    export interface IInnerProps {
        disabled: boolean;
        link: string;
        className: "pagination-previous" | "pagination-next";
        title: string;
    }

    // export interface IStateFromProps {
    //     blockHeight: BlockHeightType;
    //     accountAddress: AddressType | null;
    //     membership: Membership | null;
    //     loadingHintEnabled: boolean;
    // }

    // export interface IPropsFromDispatch {
    //     setBlockHeight: (blockHeight: BlockHeightType) => void;
    //     setAccountAddress: (accountAddress: AddressType) => void;
    //     setMembership: (nextMembership: Membership) => void;
    //     setNotificationStatus: (status: boolean) => void;
    //     setUserWindowsFocus: (focus: boolean) => void;
    // }
}

export type IPaginationButtonProps = IPaginationButton.IInnerProps; // & IMainBanner.IStateFromProps & IMainBanner.IPropsFromDispatch;

export interface IPaginationButtonStates {
    // isLoaded: boolean;
}
