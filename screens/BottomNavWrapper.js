import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Search from './Search';
import Poll from './Poll';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Dash',

        // tabBarIcon: ({tintColor}) => (
        //   <Icon name="home" size={23} color={tintColor} />
        // ),
      },
    },

    Search: {
      screen: Search,
      navigationOptions: {
        // tabBarIcon: ({tintColor}) => (
        //   <Icon name="search" size={23} color={tintColor} />
        // ),
      },
    },
    Poll: {
      screen: Poll,
      navigationOptions: {
        // tabBarIcon: ({tintColor}) => (
        //   <Icon name="list" size={23} color={tintColor} />
        // ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        // tabBarIcon: ({tintColor}) => (
        //   <Icon name="user" size={23} color={tintColor} />
        // ),
      },
    },
  },
  {
    shifting: false,
    activeColor: '#000000',
    inactiveColor: '#404040',
    barStyle: {
      backgroundColor: '#F0F0F0',
    },
    initialRouteName: 'Dashboard',
    backBehavior: 'none',
  },
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class BottomNavWrapper extends Component {
  render() {
    return <AppContainer />;
  }
}
