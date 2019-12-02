/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Splash from './screens/Splash';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import BottomNavWrapper from './screens/BottomNavWrapper';
import styles from './public/styles';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import store from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const MainNavigator = createSwitchNavigator(
  {
    Splash: {screen: Splash},
    SignUp: {screen: SignUp},
    Login: {screen: Login},
    BottomNavWrapper: {screen: BottomNavWrapper},
  },
  {
    backBehavior: 'none',
  },
);

const AppNavigator = createAppContainer(MainNavigator);
