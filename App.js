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
import CreatePoll from './screens/CreatePoll';
import SinglePoll from './screens/SinglePoll';
import BottomNavWrapper from './screens/BottomNavWrapper';
import styles from './public/styles';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import store from './store';

export default class App extends React.Component {
  // componentDidMount() {

  //   // SELECT DATA
  //   firebase
  //     .database()
  //     .ref('users')
  //     .on('value', data => {
  //       // the on method is always detecting if the database has changed and it will console log the results.
  //       console.log(data.toJSON());
  //     });

  //   // INSERT DATA
  //   setTimeout(() => {
  //     firebase
  //       .database()
  //       .ref('users/003')
  //       .set({
  //         name: 'Nayyif Oussoumatou',
  //         age: 28,
  //         status: 'available',
  //       })
  //       .then(() => {
  //         console.log('INSERTED');
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, 5000);

  //   // UPDATE DATA
  //   firebase
  //     .database()
  //     .ref('users/001')
  //     .update({
  //       name: 'Kaitlyn Ashley Martinez',
  //       email: "kait@gmail.com"
  //     });

  //     // DELETE DATA
  //     firebase.database().ref("users/001/email").remove()
  // }
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
    CreatePoll: {screen: CreatePoll},
    SinglePoll: {screen: SinglePoll},
    BottomNavWrapper: {screen: BottomNavWrapper},
  },
  {
    backBehavior: 'none',
  },
);

const AppNavigator = createAppContainer(MainNavigator);
