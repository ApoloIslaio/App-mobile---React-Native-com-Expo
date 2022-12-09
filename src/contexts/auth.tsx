import React, { createContext, useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from 'react-native'
import * as auth from '../services/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    async function loadStorageData(){
      const StoragedUser = await AsyncStorage.getItem('@RNAuth:user');
      const StoragedToken = await AsyncStorage.getItem('@RNAuth:token');

      if(StoragedUser && StoragedToken){
        setUser(JSON.parse(StoragedUser));
        setLoading(false)
      }
      setLoading(false)
    }

    loadStorageData()
  }, [])

  async function signIn(){
    setLoading(true)
    const response = await auth.signIn();
    setUser(response.user)
    
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    setLoading(false)

  }
  function signOut(){
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return(
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext)

  return context
}