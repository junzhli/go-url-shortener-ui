import React from 'react';
import MainLayout from '../components/MainLayout';
import MainSignUp from '../components/MainSignUp';
import { GetServerSideProps } from 'next';
import { redirectToDashboard } from '../components/WithAuth';
import { getServerSideProps as getServerSidePropsWithAuth } from '../components/WithAuth';
import { ISignUpPageNextGetServerSideProps, ISignUpPageProps, ISignUpPageStates } from '../types/SignUpPage';
import MainSignUpCompletion from '../components/MainSignUpCompletion';


class SignUp extends React.Component<ISignUpPageProps, ISignUpPageStates> {
  constructor(props) {
    super(props);
    this.completionToggle = this.completionToggle.bind(this);
    this.state = {
      completion: false,
    };
  }

  completionToggle(userEmail?: string) {
    this.setState({
      userEmail,
      completion: (typeof userEmail === "undefined") ? false : true,
    });
  }

  render() {
    return (
        <MainLayout>
          {!this.state.completion
           ? <MainSignUp completionToggle={this.completionToggle} />
           : <MainSignUpCompletion userEmail={this.state.userEmail} completionToggle={this.completionToggle} />}
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
