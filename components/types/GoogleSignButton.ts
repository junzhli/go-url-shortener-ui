export namespace IGoogleSignButton {
    export interface IInnerProps {
        onClick?: (event: any) => void;
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

export type IGoogleSignButtonProps = IGoogleSignButton.IInnerProps; // & IMainBanner.IStateFromProps & IMainBanner.IPropsFromDispatch;

export interface IGoogleSignButtonStates {
    // isLoaded: boolean;
}
