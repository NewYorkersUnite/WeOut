import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button} from 'native-base';
import styles from '../public/styles';

class Splash extends Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/City.jpg')}>
        <View>
          <View>
            <Button full onPress={() => navigate('SignUp')}>
              <Text> Sign Up</Text>
            </Button>
          </View>

          <View>
            <Button full onPress={() => navigate('Login')}>
              <Text> Login</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
