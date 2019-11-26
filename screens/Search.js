import React, {Component} from 'react';
import {ScrollView, Image, Text, View} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';

export default class Dashboard extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.center}>SEARCH!!</Text>
        <View style={styles.navContainer}>
          <View style={styles.navButtonContainer}>
            <Button
              style={styles.NavButton}
              onPress={() => navigate('Dashboard')}>
              <Text style={styles.NavBtnText}> Dash</Text>
            </Button>
          </View>

          <View style={styles.navButtonContainer}>
            <Button style={styles.NavButton} onPress={() => navigate('Search')}>
              <Text style={styles.NavBtnText}> Search</Text>
            </Button>
          </View>

          <View style={styles.navButtonContainer}>
            <Button style={styles.NavButton} onPress={() => navigate('Poll')}>
              <Text style={styles.NavBtnText}> Poll</Text>
            </Button>
          </View>

          <View style={styles.navButtonContainer}>
            <Button
              style={styles.NavButton}
              onPress={() => navigate('Profile')}>
              <Text style={styles.NavBtnText}> Profile</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
