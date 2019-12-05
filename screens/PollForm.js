import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  ImageBackground,
  DatePickerIOS,
  Picker,
} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {create_poll} from '../store';
import randomNYCphotos from '../public/photoURLS';

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {
        themeTitle: '',
        voteTimer: 10,
        limit: 2,
        chosenDate: new Date(),
        imageURL:
          randomNYCphotos[Math.floor(Math.random() * randomNYCphotos.length)],
      },

      showDatePicker: false,
      participants: this.props.navigation.getParam('participants'),
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({poll: {...this.state.poll, chosenDate: newDate}});
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
            <Label> Event Theme (ex: 'Movie Night') </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={themeTitle =>
                this.setState({poll: {...this.state.poll, themeTitle}})
              }
            />
          </Item>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                Set Timer For Votes:
              </Text>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                {this.state.poll.voteTimer < 60
                  ? `${this.state.poll.voteTimer} Minutes`
                  : `${this.state.poll.voteTimer / 60} Hours`}
              </Text>
              <Picker
                style={{padding: 15}}
                selectedValue={this.state.poll.voteTimer}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    poll: {...this.state.poll, voteTimer: itemValue},
                  });
                }}>
                <Picker.Item label="1 Minute" value={1} />
                <Picker.Item label="5 Minutes" value={5} />
                <Picker.Item label="10 Minutes" value={10} />
                <Picker.Item label="15 Minutes" value={15} />
                <Picker.Item label="30 Minutes" value={30} />
                <Picker.Item label="45 Minutes" value={45} />
                <Picker.Item label="1 Hour" value={60} />
                <Picker.Item label="2 Hours" value={120} />
                <Picker.Item label="3 Hours" value={180} />
                <Picker.Item label="4 Hours" value={240} />
                <Picker.Item label="5 Hours" value={300} />
                <Picker.Item label="6 Hours" value={360} />
                <Picker.Item label="7 Hours" value={420} />
                <Picker.Item label="8 Hours" value={480} />
                <Picker.Item label="9 Hours" value={540} />
                <Picker.Item label="10 Hours" value={600} />
                <Picker.Item label="11 Hours" value={660} />
                <Picker.Item label="12 Hours" value={720} />
                <Picker.Item label="24 Hours" value={1440} />
              </Picker>
            </View>

            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                Set Suggestion Input Limit:
              </Text>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                {`${this.state.poll.limit} Max Suggestions`}
              </Text>
              <Picker
                style={{padding: 15}}
                selectedValue={this.state.poll.limit}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    poll: {...this.state.poll, limit: itemValue},
                  });
                }}>
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
              </Picker>
            </View>
          </View>

          <Button
            style={{
              backgroundColor: '#2b81b5',
              justifyContent: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              this.setState({showDatePicker: !this.state.showDatePicker});
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Select Date & Time
            </Text>
          </Button>
        </View>
        {this.state.showDatePicker ? (
          <DatePickerIOS
            date={this.state.poll.chosenDate}
            onDateChange={this.setDate}
          />
        ) : null}

        <Button
          full
          style={{
            backgroundColor: '#2b81b5',
            justifyContent: 'center',
          }}
          onPress={async () => {
            await this.props.createPoll(
              this.props.currentUser.username,
              this.state.poll,
              this.state.participants,
            );
            this.props.navigation.navigate('AllPolls');
          }}>
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

const mapToState = state => {
  return {
    polls: state.polls.polls,
    currentUser: state.user.currentUser,
  };
};

const dispatchToProps = dispatch => {
  return {
    createPoll: (username, poll, participants) =>
      dispatch(create_poll(username, poll, participants)),
  };
};

export default connect(
  mapToState,
  dispatchToProps,
)(PollForm);
