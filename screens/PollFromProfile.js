import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  ImageBackground,
  DatePickerIOS,
} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {create_poll} from '../store';

class PollFromProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {
        themeTitle: '',
        suggestionTimer: '',
        voteTimer: '',
        limit: '',
        chosenDate: new Date(),
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
            <Label> Theme Title (ex: 'Movie Night') </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={themeTitle =>
                this.setState({poll: {...this.state.poll, themeTitle}})
              }
            />
          </Item>

          <Item floatingLabel>
            <Label> Set Timer for Suggestion Input (Numerical Value) </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={suggestionTimer =>
                this.setState({suggestionTimer: suggestionTimer})
              }
            />
          </Item>

          <Item floatingLabel>
            <Label> Set Timer for Votes (Numerical Value) </Label>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={voteTimer => this.setState({voteTimer: voteTimer})}
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
          onPress={() => {
            this.props.createPoll(
              this.props.currentUser.username,
              this.state.poll,
              this.state.participants,
            );
            this.props.navigation.navigate('VotingRoomP');
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
)(PollFromProfile);
