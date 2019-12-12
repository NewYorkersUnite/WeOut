import React, {Component} from 'react';
import {Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Search from './Search';
import AllPolls from './AllPolls';
import VotingRoom from './VotingRoom';
import FriendGroup from './FriendGroup';
import PollForm from './PollForm';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import styles from '../public/styles';

const PollTab = createSwitchNavigator({
  AllPolls: {screen: AllPolls},
  VotingRoom: {screen: VotingRoom},
});

const ProfileTab = createSwitchNavigator({
  Profile: {screen: Profile},
  FriendGroup: {screen: FriendGroup},
  PollForm: {screen: PollForm},
  AllPolls: {screen: AllPolls},
});

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require('../public/HomeIcon.png')}
            style={styles.bottomIcons}
          />
        ),
      },
    },

    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require('../public/searchIcon.png')}
            style={styles.bottomIcons}
          />
        ),
      },
    },
    Poll: {
      screen: PollTab,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require('../public/poll.png')}
            style={styles.bottomIcons}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileTab,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require('../public/UserIcon.png')}
            style={styles.bottomIcons}
          />
        ),
      },
    },
  },
  {
    shifting: false,
    labeled: false,

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
