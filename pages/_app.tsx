import App from 'next/app';
import 'bulma/css/bulma.css';
import '@creativebulma/bulma-divider/dist/bulma-divider.min.css';
import { Provider } from "react-redux";
import { useStore } from '../store';

declare module 'react' {
  interface HTMLAttributes<T> {
      disabled?: any;
  }
}

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;
    const store = useStore(pageProps.initialReduxState);
    return (
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;
