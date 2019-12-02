import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class PollFromProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeTitle: '',
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      invitees: [], // this will be all the available friends from database, just display names for now
    };
  }
  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('FriendGroup')}>
          <Image
            style={{width: 50, height: 50, marginTop: 50, marginLeft: 8}}
            source={require('../public/BackArrow.png')}
          />
        </TouchableOpacity>

        <View style={styles.centerish}>
          <Item floatingLabel>
            <Label> Theme Title (ex: 'Movie Night') </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={themeTitle =>
                this.setState({themeTitle: themeTitle})
              }
            />
          </Item>

          <Item floatingLabel>
            <Label> Option One </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={optionOne => this.setState({optionOne: optionOne})}
            />
          </Item>

          <Item floatingLabel>
            <Label> Option Two </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={optionTwo => this.setState({optionTwo: optionTwo})}
            />
          </Item>

          <Item floatingLabel>
            <Label> Option Three </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={optionThree =>
                this.setState({optionThree: optionThree})
              }
            />
          </Item>
        </View>
        <Button
          full
          style={{
            backgroundColor: '#2b81b5',
            justifyContent: 'center',
          }}
          onPress={() => this.props.navigation.navigate('SinglePoll')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Submit Poll
          </Text>
        </Button>
      </ImageBackground>
    );
  }
}
