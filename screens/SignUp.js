import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import styles from '../public/styles';
import {Input, Item, Button, Label} from 'native-base';
import {connect} from 'react-redux';
import {sign_up} from '../store';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    };
  }

  async signUp(email, password, confirmPassword, username) {
    if (this.validateSignUpData(this.state)) {
      const newUser = this.state;
      await this.props.signUp(newUser);
    }
  }

  isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
      return true;
    } else {
      return false;
    }
  };

  isEmpty = string => {
    if (string.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

  validateSignUpData = data => {
    let errors = {};

    if (this.isEmpty(data.email)) {
      errors.email = 'Must not be empty';
    } else if (!this.isEmail(data.email)) {
      errors.email = 'Must be a valid email address';
    }

    if (this.isEmpty(data.password)) {
      errors.password = 'Must not be empty';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    if (this.isEmpty(data.username)) {
      errors.username = 'Must not be empty';
    }
    return {
      errors,
    };
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
            <Label> Username </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={username => this.setState({username: username})}
            />
          </Item>

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

          <Item floatingLabel>
            <Label> Confirm Password </Label>

            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={confirmPassword =>
                this.setState({confirmPassword: confirmPassword})
              }
            />
          </Item>

          <Button
            style={styles.LogSignBtnCentered}
            full
            success
            onPress={() =>
              this.signUp(
                this.state.email,
                this.state.password,
                this.state.confirmPassword,
                this.state.username,
              )
            }>
            <Text style={styles.BtnText}>Sign Up</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    logged_in: state.user.logged_in,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => {
      dispatch(sign_up(newUser));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
