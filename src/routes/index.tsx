import React, { useContext } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../contexts/auth';

const Routes: React.FC = () => {
  const {signed} = useAuth()

  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;