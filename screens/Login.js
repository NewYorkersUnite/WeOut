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
  }
  render() {
    return (
      <View style={styles.center}>
        <Text>Login Page</Text>
      </View>
    );
  }
}
export default Login;
