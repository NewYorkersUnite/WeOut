import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import styles from '../public/styles';
import * as firebase from 'firebase';
import config from '../functions/util/config';

firebase.initializeApp(config);

import {Input, Item, Button, Label} from 'native-base';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  loginUser(email, password) {
    if (this.validateLoginData(this.state)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(user) {
          console.log('USER THAT WAS LOGGED IN >>>', user);
        })
        .catch(error => {
          console.error(error);
          console.log('Wrong credentials, please try again', error.toString());
        });
    }
    this.props.navigation.navigate('Dashboard');
  }

  isEmpty = string => {
    if (string.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

  validateLoginData = data => {
    let errors = {};
    if (this.isEmpty(data.email)) {
      errors.email = 'Must not be empty';
    }
    if (this.isEmpty(data.password)) {
      errors.password = 'Must not be empty';
    }
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  };

  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/City.jpg')}>
        <Image
          source={require('../public/WeOut.png')}
          style={styles.MainLogo}
        />
        <View style={styles.centerish}>
          <Item floatingLabel>
            <Label> Email </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({email: email})}
            />
          </Item>

          <Item floatingLabel>
            <Label> Password </Label>

            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({password: password})}
            />
          </Item>

          <Button
            style={styles.LogSignBtnCentered}
            full
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }>
            <Text style={styles.BtnText}>Login</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
export default Login;