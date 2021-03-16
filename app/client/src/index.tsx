import {
    ApolloClient,
    NormalizedCacheObject,
    ApolloProvider
  } from '@apollo/client';
  import { cache } from './cache';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Pages from './pages';
  import injectStyles from './styles';
  
  // Initialize ApolloClient
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: localStorage.getItem('token') || '',
    }
  });
  
  injectStyles();
  
  /* Pass the ApolloClient instance to the ApolloProvider component.
  It wrapq our app in the ApolloProvider component from the @apollo/client package
  wraps the React app and places client on the context, which enables to access it from anywhere in your component tree.
  */
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>,
    document.getElementById('root')
  );