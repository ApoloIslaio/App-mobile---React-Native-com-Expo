import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import {AuthProvider} from './contexts/auth'
import { ApolloProvider } from '@apollo/client';
import { client } from './services/api';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ApolloProvider>
    </NavigationContainer>
  )
};

export default App;