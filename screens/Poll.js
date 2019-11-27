import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';

export default class Dashboard extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.mainContainer}>
          <Text style={styles.center}>POLL!!</Text>
        </View>
      </ImageBackground>
    );
  }
}
