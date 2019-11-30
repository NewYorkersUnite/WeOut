import React, {Component} from 'react';
import {View, Text, ImageBackground, Image, Alert} from 'react-native';
import styles from '../public/styles';
const {firebaseApp, db, config} = require('../functions/util/config');

import {Input, Item, Button, Label} from 'native-base';

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

  signUp(email, password, confirmPassword, username) {
    if (this.validateSignUpData(this.state)) {
      const noImg = 'no-img.png';

      let token; // initialize a token
      let userId; // initialize a userId

      const newUser = this.state;
      db.doc(`/users/${newUser.username}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            Alert.alert('Username is taken.');
          } else {
            return firebaseApp
              .auth()
              .createUserWithEmailAndPassword(newUser.email, newUser.password);
          }
        })
        .then(data => {
          userId = data.user.uid;
        })
        .then(idToken => {
          token = idToken;

          const userCredentials = {
            // this part is to place the new user info into the db
            username: newUser.username,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
            userId: userId,
          };
          return db
            .doc(`/users/${newUser.username}`)
            .set(userCredentials)
            .then(() => {
              console.log('TOKEN', token);
            });
        })
        .catch(error => {
          console.error(error);
          console.log('Email is already in use or invalid.');
        });
      this.props.navigation.navigate('BottomNavWrapper');
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
    // console.log('FIREBASE', Firebase.Firebase);
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

export default SignUp;
