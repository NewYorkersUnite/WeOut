/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Splash from './screens/Splash';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import styles from './public/styles';

export default class App extends React.Component {
  // componentDidMount() {
  // Nayyif will enter this data later
  // const firebaseConfig = {
  //   apiKey: "apiKey",
  //   authDomain: "authDomain",
  //   databaseURL: "databaseURL",
  //   projectId: "projectId",
  //   storageBucket: "storageBucket",
  //   messagingSenderId: "messagingSenderId",
  //   appId: "appId",
  //   measurementId: "measurementId"
  // };
  // firebase.initializeApp(firebaseConfig);
  // }
  render() {
    return <AppNavigator />;
  }
}

const MainNavigator = createSwitchNavigator({
  Splash: {screen: Splash},
  SignUp: {screen: SignUp},
  Login: {screen: Login},
});

const AppNavigator = createAppContainer(MainNavigator);
