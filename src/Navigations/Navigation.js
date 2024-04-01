import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import {colors} from '../Globals/Styles';
import {LoginBtnContext} from '../Contexts/LoginBtnContext';
import SignupScreen from '../Screens/AuthScreen/SignupScreen';
import VerifyScreen from '../Screens/AuthScreen/VerifyScreen';
import HomeVerification from '../Screens/VerificationScreen/HomeVerification';
import SelectIDScreen from '../Screens/VerificationScreen/SelectIDScreen';
import AdhaarCard from '../Components/AdhaarCard';
import DocumentUploader from '../Screens/VerificationScreen/DocumentUploader';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScannerCamera from '../Components/ScannerCamera';
import SelfieScreen from '../Screens/VerificationScreen/SelfieScreen';
import HomeScreen from '../Screens/UserScreens/HomeScreen';
import Cheers from '../Screens/UserScreens/Cheers';
import SearchBar from '../Components/SearchBar';
import LoginContext from '../Contexts/LoginBtnContext';
import {fetchToken} from '../utils/navigationutils';
import AuthContext from '../Contexts/NavigationContext';
import {createDrawerNavigator} from '@react-navigation/drawer';

export const Navigation = () => {
  const [isToken, setIsToken] = useState(null);
  // const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await fetchToken();
        console.log('token checking', token);
        if (token) {
          setIsToken(token);
        } else {
          setIsToken(null);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };
    checkToken();
  }, [fetchToken]);

  const VerifyStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="homeScreen" component={HomeVerification} />
      <Stack.Screen name="selectID" component={SelectIDScreen} />
      <Stack.Screen name="Upload Aadhaar" component={DocumentUploader} />
      <Stack.Screen name="Upload PanCard" component={ScannerCamera} />
      <Stack.Screen name="Take Selfie" component={SelfieScreen} />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="cheers" component={Cheers} />
      <Stack.Screen
        name="My Home"
        component={SearchBar}
        options={{headerStyle: {display: 'none'}}}
      />
    </Stack.Navigator>
  );

  return (
    <LoginBtnContext>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: colors.black},
            headerTitleStyle: {fontSize: 22, color: colors.buttons},
            headerTintColor: colors.buttons,
          }}>
          {!isToken ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Home" component={HomeStack} />
          )}
          <Stack.Screen name="Signin" component={LoginScreen} />
          <Stack.Screen name="Homes" component={HomeStack} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="verifyScreen" component={VerifyScreen} />
          <Stack.Screen name="verifyStack" component={VerifyStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginBtnContext>
  );
};

export default Navigation;
