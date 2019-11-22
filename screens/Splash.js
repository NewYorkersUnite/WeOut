import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {Button} from 'native-base';
import styles from '../public/styles';
import {createUser} from '../store/actions/users';
import {connect} from 'react-redux';

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
              onPress={() => this.props.createUser({user: 'John'})}>
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

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => {
      dispatch(createUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(Splash);

//onPress={() => navigate('SignUp')}
