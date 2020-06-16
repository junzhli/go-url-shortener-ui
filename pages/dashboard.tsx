import React from 'react';
import { GetServerSideProps } from 'next';
import MainLayout from '../components/MainLayout';
import { IDashboardPageProps, IDashboardNextGetServerSideProps, URLMapping, IDashboardPageStates } from '../types/DashboardPage';
import withAuth, { getServerSideProps as getServerSidePropsWithAuth, redirectToLogin } from '../components/WithAuth';
import { getUserUrlList, UnauthorizedError, NotFoundError } from '../utils/api';
import MainDashboard from '../components/MainDashboard';
import { initializeStore } from '../store';
import { setUserIsLoggedIn } from '../actions/user';


class DashBoard extends React.Component<IDashboardPageProps, IDashboardPageStates> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <MainLayout>
          <MainDashboard urlsMapping={this.props.urlsMapping} page={this.props.page} totalPage={this.props.totalPage} />
        </MainLayout>
    );
  }
}

export const getServerSideProps: GetServerSideProps<IDashboardNextGetServerSideProps> = async (context) => {
  const page = getPage(context.query.page) || 1;
  let totalPage = 0;
  const limit = 10;
  const { accessToken, authenticated } = (await getServerSidePropsWithAuth(context)).props;
  if (accessToken === null || !authenticated) {
    redirectToLogin(context);
    return {
      props: {
        authenticated,
        page, // default
        totalPage, // default
        limit, // default
        urlsMapping: [], // default
      }
    };
  }

  const offset = (page - 1) * 10;
  try {
    const { total, urls } = await getUserUrlList(process.env["NEXT_PUBLIC_BASE_URL"], accessToken, {
      offset,
      limit,
    });
    totalPage = Math.ceil(total / limit);
    const urlsMapping: URLMapping[] = urls.map(({origin_url, shorten_url}) => {
      return {
        oriUrl: origin_url,
        shortenUrl: shorten_url,
      };
    });

    const store = initializeStore();
    const { dispatch } = store;
    dispatch(setUserIsLoggedIn(true));

    return {
      props: {
        authenticated,
        page,
        totalPage,
        limit,
        urlsMapping,
        initialReduxState: store.getState()
      }
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      redirectToLogin(context);

      return {
        props: {
          authenticated: false,
          page, // default
          totalPage, // default
          limit, // default
          urlsMapping: [], // default
        }
      };
    } else if (error instanceof NotFoundError) {
      const store = initializeStore();
      const { dispatch } = store;
      dispatch(setUserIsLoggedIn(true));

      return {
        props: {
          authenticated,
          page,
          totalPage, // default
          limit,
          urlsMapping: [],
          initialReduxState: store.getState(),
        }
      };
    }
    throw error;
  }
};

const getPage = (page: string | string[]) => {
  const parseNum = Number(page);
  if (Number.isNaN(parseNum)) {
    return undefined;
  }

  if (parseNum < 1) {
    return undefined;
  }

  return parseNum;
};

export default withAuth(DashBoard);
