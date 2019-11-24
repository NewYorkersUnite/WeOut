import React, {Component} from 'react';
import {ScrollView, Image, Text} from 'react-native';
import styles from '../public/styles';

export default class Dashboard extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.center}>DASHBOARD!!</Text>
      </ScrollView>
    );
  }
}
