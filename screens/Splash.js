import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {Button} from 'native-base';
import styles from '../public/styles';

class Splash extends Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/City.jpg')}>
        <Image
          source={require('../public/WeOut.png')}
          style={styles.MainLogo}
        />
        <View style={styles.LogSignBtnContainer}>
          <View>
            <Button
              style={styles.LogSignBtn}
              full
              onPress={() => navigate('SignUp')}>
              <Text style={styles.BtnText}>Sign Up</Text>
            </Button>
          </View>

          <View>
            <Button
              style={styles.LogSignBtn}
              full
              onPress={() => navigate('Login')}>
              <Text style={styles.BtnText}> Login</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
