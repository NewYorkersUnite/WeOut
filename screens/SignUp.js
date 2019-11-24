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

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  signUp(email, password) {
    try {
      if (this.state.password < 6) {
        alert('Please enter atleast 6 characters');
        return;
      }
      email = this.state.email;
      password = this.state.password;
      // username = this.state.username;
      firebase.auth().createUserWithEmailAndPassword(email, password);

      // firebase.auth().currentUser.providerData[0].displayName = username;
      console.log('CURRENT USER', firebase.auth());

      this.props.navigation.navigate('Dashboard');
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
            onPress={() => this.signUp(this.state.email, this.state.password)}>
            <Text style={styles.BtnText}>Sign Up</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default SignUp;
