import React, {Component} from 'react';
import {ScrollView, Image, Text} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';

export default class Poll extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <Text style={styles.center}>POLL!!</Text>
        <Button
          style={styles.LogSignBtn}
          full
          onPress={() => navigate('Dashboard')}>
          <Text style={styles.BtnText}> Dash</Text>
        </Button>
        <Button
          style={styles.LogSignBtn}
          full
          onPress={() => navigate('Search')}>
          <Text style={styles.BtnText}> Search</Text>
        </Button>
        <Button style={styles.LogSignBtn} full onPress={() => navigate('Poll')}>
          <Text style={styles.BtnText}> Poll</Text>
        </Button>
        <Button
          style={styles.LogSignBtn}
          full
          onPress={() => navigate('Profile')}>
          <Text style={styles.BtnText}> Profile</Text>
        </Button>
      </ScrollView>
    );
  }
}
