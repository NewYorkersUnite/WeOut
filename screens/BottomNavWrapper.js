import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Search from './Search';
import AllPolls from './AllPolls';
import SinglePoll from './SinglePoll';
import FriendGroup from './FriendGroup';
import PollFromProfile from './PollFromProfile';
import VotingRoomP from './VotingRoomP';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

const PollTab = createSwitchNavigator({
  AllPolls: {screen: AllPolls},
  SinglePoll: {screen: SinglePoll},
});

const ProfileTab = createSwitchNavigator({
  Profile: {screen: Profile},
  FriendGroup: {screen: FriendGroup},
  PollFromProfile: {screen: PollFromProfile},
  VotingRoomP: {screen: VotingRoomP},
});

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Dash',
      },
    },

    Search: {
      screen: Search,
      navigationOptions: {
      },
    },
    Poll: {
      screen: PollTab,
      navigationOptions: {
        tabBarLabel: 'Poll',
      },
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarLabel: 'Profile',
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
