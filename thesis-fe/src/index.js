import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { serverURL } from './helpers/constants';
import { InMemoryCache } from 'apollo-cache-inmemory';


import LinkFactory from './components/apollo/link_factory';

const client = new ApolloClient({
  uri: serverURL,
  link: LinkFactory(),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
