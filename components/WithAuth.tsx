import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { IWithAuthProps, IWithAuthGetServerSideProps } from "./types/WithAuth";
import { userAuthenticated } from "../utils/api";

const withAuth = (WrappedComponent: any) => {
    return class extends React.Component<IWithAuthProps> {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export const getServerSideProps: GetServerSideProps<IWithAuthGetServerSideProps> = async (context) => {
    const accessToken = cookies(context).accessToken;
    const authenticated = (accessToken !== undefined) ?
        await userAuthenticated(process.env["NEXT_PUBLIC_BASE_URL"], accessToken) :
        false;

    return {
      props: {
          accessToken: accessToken || null,
          authenticated,
      }
    };
};

export const redirectToLogin = (context: GetServerSidePropsContext) => {
    context.res.setHeader("Location", process.env["NEXT_PUBLIC_BASE_URL"] + "/login");
    context.res.statusCode = 302;
};

export const redirectToDashboard = (context: GetServerSidePropsContext) => {
    context.res.setHeader("Location", process.env["NEXT_PUBLIC_BASE_URL"] + "/dashboard");
    context.res.statusCode = 302;
};

export default withAuth;