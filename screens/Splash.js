import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button} from 'native-base';
import styles from '../public/styles';
import {createUser} from '../store/actions/users';
import {connect} from 'react-redux';

import {getFirestore} from 'redux-firestore';
import {getFirebase} from 'react-redux-firebase';

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

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => {
      dispatch(createUser(user));
    },
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Splash);
