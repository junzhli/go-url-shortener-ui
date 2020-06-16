import React from 'react';
import MainLayout from '../components/MainLayout';
import MainSignUp from '../components/MainSignUp';
import { GetServerSideProps } from 'next';
import { redirectToDashboard } from '../components/WithAuth';
import { getServerSideProps as getServerSidePropsWithAuth } from '../components/WithAuth';
import { ISignUpPageNextGetServerSideProps } from '../types/SignUpPage';


class SignUp extends React.Component<{}, any> {
  render() {
    return (
        <MainLayout>
            <MainSignUp />
        </MainLayout>
    );
  }
}

export const getServerSideProps: GetServerSideProps<ISignUpPageNextGetServerSideProps> = async (context) => {
  const { authenticated } = (await getServerSidePropsWithAuth(context)).props;
  if (authenticated) {
    redirectToDashboard(context);
  }

  return {
    props: {
      authenticated
    }
  };
};

export default SignUp;
