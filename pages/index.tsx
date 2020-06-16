import React from 'react';
import MainLayout from '../components/MainLayout';
import MainEntry from '../components/MainEntry';
import { GetServerSideProps } from 'next';
import { IIndexNextGetServerSideProps } from '../types/IndexPage';
import { getServerSideProps as getServerSidePropsWithAuth, redirectToDashboard } from '../components/WithAuth';

class Home extends React.Component<{}, any> {
  render() {
    return (
        <MainLayout>
          <MainEntry />
        </MainLayout>
    );
  }
}

export const getServerSideProps: GetServerSideProps<IIndexNextGetServerSideProps> = async (context) => {
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

export default Home;
