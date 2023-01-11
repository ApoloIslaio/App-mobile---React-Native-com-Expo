import React, { createContext, useState, useEffect, useContext } from "react";
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql, useMutation } from "@apollo/client";


interface User {
    colaborador: ({
      id: String;
      login: String;
      nome: String;
      email: String;
      apelido: String;
      buscaValorDia: number;
      buscaValorSemana: number;
      buscaValorMes: number;
    })
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider = ({children}: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading1, setLoading1] = useState(true) 

  useEffect(() => {
    async function loadStorageData(){
      const StoragedUser = await AsyncStorage.getItem('@RNAuth:user');
      const StoragedToken = await AsyncStorage.getItem('@RNAuth:token');

      if(StoragedUser && StoragedToken){
        setUser(JSON.parse(StoragedUser));
        setLoading1(false)
        console.log('UserStoraged aqui: ', JSON.parse(StoragedUser))
        console.log('StoragedToken aqui: ', StoragedToken)
      }
      setLoading1(false)
    }

    loadStorageData()
  }, [])

    
  const LOGIN_COLABORADOR = gql`
    mutation ($username: String!, $password: String!) {
      loginColaborador(input: {
        credentials: {
          login: $username,
          password: $password
        }
      }) 
      {
        token
        colaborador{
          id
          nome
          email
          apelido
        }
      }
    }
  `

  const [loginColaborador, { error, loading }] = useMutation(LOGIN_COLABORADOR)

  const signIn = async (username: string, password: string) => {
    
      setLoading1(true)
      
    
      console.log('Entrou aqui')
       try {
        console.log('Agora está aqui')
         
        const result = await loginColaborador({
          variables: {
            username,
            password
          }
        });
         const response = result.data;
         console.log('Result',result)

         console.log('Chegou aqui')
         if(response){
            console.log('Entrou no if')
             setUser(response.loginColaborador);
            console.log('Res',response.loginColaborador)
            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.loginColaborador));
            await AsyncStorage.setItem('@RNAuth:token', response.loginColaborador.token);
            console.log('user', user)   
           console.log('terminou o if')
           setLoading1(false);
         }  
       } catch (err) {
         console.log('ERROS: ', err)
         console.error('graphql errors ', error)
         setLoading1(false);
       }
       setLoading1(false);

  }

  function signOut(){
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  if(loading1){
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
  const context = useContext(AuthContext);

  return context;
}