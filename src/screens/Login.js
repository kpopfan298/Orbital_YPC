import React, { useState } from 'react';
import {
  Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import background from '../assets/background.jpeg';

export default function Login({ navigation }) {
  // const background = require('../assets/background.jpg');
  const auth = getAuth();
  // if (auth.currentUser) {
  //   navigation.navigate("ToDo");
  // } else {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("ToDo");
  //     }
  //   });
  // }

  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Please enter an email and password');
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don&apos;t have an account? </Text>
          <InlineTextButton text="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
        <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Forgotten your password? </Text>
          <InlineTextButton text="Reset" onPress={() => navigation.navigate('ResetPassword')} />
        </View>
        <Button title="Login" onPress={login} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
