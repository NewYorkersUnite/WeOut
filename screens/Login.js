import React, {Component} from 'react';
import {View, Text, ImageBackground, Image, Alert} from 'react-native';
import styles from '../public/styles';
// const {firebaseApp, db, config} = require('../functions/util/config');

import {Input, Item, Button, Label} from 'native-base';
import {connect} from 'react-redux';
import {login} from '../store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      currentUser: {},
      error: '',
    };
  }

  async loginUser(email, password) {
    if (this.validateLoginData(this.state)) {
      await this.props.login(this.state.email, this.state.password);
    } else if (this.state.error === 'Email must not be empty') {
      console.log('ALERT SHOULD TRIGGER', this.state);
      return 'Email must not be empty';
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
    // let errors = {};
    if (this.isEmpty(data.email)) {
      // errors.email = 'Must not be empty';
      this.setState({error: 'Email must not be empty'});
      return;
    }
    if (this.isEmpty(data.password)) {
      // errors.password = 'Must not be empty';
    }
    return 1;
  };

  render() {
    if (this.props.logged_in) {
      this.props.navigation.navigate('BottomNavWrapper');
    }
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
            onPress={() => {
              if (
                this.loginUser(this.state.email, this.state.password) ===
                'Email must not be empty'
              ) {
                Alert.alert('Email must not be empty');
              }
            }}>
            <Text style={styles.BtnText}>Login</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const mapToProps = state => {
  return {
    currentUser: state.user.currentUser,
    logged_in: state.user.logged_in,
  };
};

const dispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
  };
};

export default connect(
  mapToProps,
  dispatchToProps,
)(Login);
