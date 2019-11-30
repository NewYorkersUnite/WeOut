import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SinglePoll extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Poll')}>
          <Image
            style={{width: 50, height: 50, marginTop: 50, marginLeft: 8}}
            source={require('../public/BackArrow.png')}
          />
        </TouchableOpacity>
        <View style={styles.centerish}>
          <Text>SINGLE POLL ROOM!!</Text>
        </View>
      </ImageBackground>
    );
  }
}
