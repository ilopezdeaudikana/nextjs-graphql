import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import 'antd/dist/antd.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
