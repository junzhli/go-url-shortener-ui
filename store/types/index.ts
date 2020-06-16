
// export interface IEthMisc {
//     blockHeight: BlockHeightType;
//     accountAddress: AddressType | null;
//     membership: Membership | null;
// }

// export interface IPollMisc {
//     active: number | null;
//     amount: number | null;
//     monitoring: {
//         created: string[],
//         voted: string[],
//     };
//     keywords: string | null;
//     searchResultsAmount: number | null;
//     activeDetailAddress: {
//         address: AddressType | null;
//         index: number | null;
//         inProgress: boolean;
//     };
//     voteInProgress: {
//         [key: string]: {
//             txid: string,
//             votedIndex: number,
//         },
//     };
// }

export interface IUserMisc {
    userLoggedIn: boolean;
}

export interface StoreState {
    userMisc: IUserMisc;
}
