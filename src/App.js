import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Launches from './components/Launches/Launches';
import Launch from './components/Launch/Launch';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={Launches} />
        <Route exact path='/launch/:id' component={Launch} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
