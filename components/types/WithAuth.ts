
export namespace WithAuth {
    export interface NextGetServerSideProps {
        accessToken: string | null;
        authenticated: boolean;
    }
}

export type IWithAuthGetServerSideProps = WithAuth.NextGetServerSideProps;


export interface IWithAuthProps {
    authenticated: boolean;
}