import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';

class Poll extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <Text style={styles.activeTitle}>Active Polls</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SinglePoll')}>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={require('../public/Taxis.jpg')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginLeft: 10,
                marginTop: 10,
                marginRight: 10,
              }}
            />
            <View style={styles.pollDetails}>
              <Text>Username</Text>
              <Text>"Taco Tuesday"</Text>
              <Text>Suggestions Closing In: 25 minutes</Text>
              <Text>Final Votes Closing In: 40 minutes</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default Poll;
