import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import styles from '../public/styles';
const {firebaseApp, db, config} = require('../functions/util/config');

import {Input, Item, Button, Label} from 'native-base';
import store from '../store';
import {connect} from 'react-redux';
import {login} from '../store/users';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  async loginUser(email, password) {
    try {
      if (this.validateLoginData(this.state)) {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        this.props.navigation.navigate('BottomNavWrapper');
      }
    } catch (error) {
      console.error(error);
      console.log('Wrong credentials, please try again', error.toString());
    }
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
              this.props.login(this.state.email, this.state.password)
            }>
            <Text style={styles.BtnText}>Login</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const mapProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatch = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};
export default connect(mapProps, mapDispatch)(Login);
