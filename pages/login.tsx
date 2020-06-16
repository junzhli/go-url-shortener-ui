import React, { Dispatch } from 'react';
import MainLayout from '../components/MainLayout';
import MainLogin from '../components/MainLogin';
import { StoreState } from '../store/types';
import { IMainLogin, IMainLoginProps, IMainLoginStates } from '../components/types/MainLogin';
import { UserActionType } from '../actions/types/user';
import { setUserIsLoggedIn } from '../actions/user';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';
import { redirectToDashboard } from '../components/WithAuth';
import { getServerSideProps as getServerSidePropsWithAuth } from '../components/WithAuth';
import { ILoginPageNextGetServerSideProps } from '../types/LoginPage';


class Login extends React.Component<IMainLoginProps, IMainLoginStates> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <MainLayout>
            <MainLogin />
        </MainLayout>
    );
  }
}

export const getServerSideProps: GetServerSideProps<ILoginPageNextGetServerSideProps> = async (context) => {
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

const mapStateToProps = (state: StoreState, ownProps: IMainLogin.IInnerProps): IMainLogin.IStateFromProps => {
  return {
      userLoggedIn: state.userMisc.userLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActionType>, ownProps: IMainLogin.IInnerProps): IMainLogin.IPropsFromDispatch => {
  return {
      setUserIsLoggedIn: (userLoggedIn: boolean) => dispatch(setUserIsLoggedIn(userLoggedIn)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));
