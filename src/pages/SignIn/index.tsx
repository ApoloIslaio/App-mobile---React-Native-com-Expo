import React, { useContext } from 'react';
import {Alert, Button, View} from 'react-native';
import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signed, user, signIn } = useAuth()

  console.log(signed)
  console.log(user)


  function handleSignIn(){
    signIn()
  }

  return(
    <View>
      <Button title='Sign In' onPress={handleSignIn} />
    </View>
  )
}

export default SignIn;