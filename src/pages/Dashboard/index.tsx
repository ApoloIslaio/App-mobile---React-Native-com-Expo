import React, { useContext } from 'react';
import {Button, View, Text} from 'react-native';
import {useAuth} from '../../contexts/auth';


//DASHBOARD
const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  function handleSignOut(){
    signOut()
  }

  return(
    <View>
      <Button title='Sign Out' onPress={handleSignOut} />
      <Text>Nome: {user?.colaborador.nome}</Text>
      <Text> {user?.colaborador.email}</Text>

    </View>
  )
}

export default Dashboard;