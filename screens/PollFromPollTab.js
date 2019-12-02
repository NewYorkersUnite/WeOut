import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TimePicker from 'react-native-simple-time-picker';

export default class PollFromPollTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeTitle: '',
      selectedHours: 0,
      selectedMinutes: 0,
      voteTimer: '',
      limit: '',
    };
  }

  render() {
    const {selectedHours, selectedMinutes} = this.state;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Poll')}>
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
            <Label> How Many Suggestions? (Set A Limit) </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={limit => this.setState({limit: limit})}
            />
          </Item>

          <Text>
            {this.state.selectedHours}hr:
            {this.state.selectedMinutes}min
          </Text>
          <TimePicker
            selectedHours={this.state.selectedHours}
            //initial Hourse value
            selectedMinutes={this.state.selectedMinutes}
            //initial Minutes value
            onChange={(hours, minutes) =>
              this.setState({
                selectedHours: hours,
                selectedMinutes: minutes,
              })
            }
          />
          <Button>
            <Text>Start</Text>
          </Button>
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
