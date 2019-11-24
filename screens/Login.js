import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../public/styles';
import * as firebase from 'firebase';

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from 'native-base';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log('USER THAT WAS LOGGED IN >>>', user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  }
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
        {/* <View style={styles.center}>
          <Text>Login Page</Text>
        </View> */}
      </ImageBackground>
    );
  }
}
export default Login;
