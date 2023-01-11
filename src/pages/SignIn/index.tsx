import React, { useContext, useState } from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // console.log(signed)
  // console.log(user)

  function handleSignIn(){
    if(username && password){
      console.log(username)
      console.log(password)
  
      signIn(username, password);
    }
  }

  return(
    <View>
      
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="login"
        onChangeText={(text)=>{ setUsername(text)}}
        value={username}
      />
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="senha"
        onChangeText={(text)=>{ setPassword(text)}}
        value={password}
        
      />
      <Button title='Sign In' onPress={handleSignIn} />
    </View>
  )
}

export default SignIn;