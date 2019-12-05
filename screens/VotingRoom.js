import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {add_suggestion, get_suggestions, vote} from '../store';
import {connect} from 'react-redux';

class VotingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: '',
    };
  }
  componentDidMount() {
    this.props.getSuggestions(
      this.props.currentUser.username,
      this.props.navigation.getParam('poll').pollId,
    );
  }

  render() {
    const dat = this.props.navigation.getParam('poll').chosenDate.seconds;
    const date = new Date(dat * 1000);

    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AllPolls')}>
          <Image
            style={{width: 50, height: 50, marginTop: 50, marginLeft: 8}}
            source={require('../public/BackArrow.png')}
          />
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 5,
              marginTop: 5,
            }}>
            {this.props.navigation.getParam('poll').themeTitle}
          </Text>

          <Text style={{fontWeight: 'bold', marginBottom: 25}}>
            Date of Event: {date.toDateString()}
          </Text>
          <ScrollView>
            {this.props.suggestions.map((suggestion, indx) => {
              return (
                <View key={indx}>
                  <Button
                    onPress={() => {
                      if (!this.props.voted) {
                        this.props.vote(
                          this.props.currentUser.username,
                          this.props.navigation.getParam('poll').pollId,
                          suggestion.option,
                        );
                      } else {
                        Alert.alert('One vote per person please!');
                      }
                    }}
                    full
                    rounded
                    style={{
                      backgroundColor: '#2b81b5',
                      justifyContent: 'center',
                      width: 300,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {suggestion.option} {''}
                      {Math.floor(suggestion.percentage)}%
                    </Text>
                  </Button>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <Item floatingLabel>
          <Label> Add Suggestion </Label>

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.suggestion}
            onChangeText={suggestion => this.setState({suggestion})}
          />
        </Item>
        <Button
          full
          rounded
          style={{
            backgroundColor: '#2b81b5',
            justifyContent: 'center',
            marginTop: 25,
          }}
          onPress={() => {
            if (this.state.suggestion.trim().length === 0) {
              Alert.alert('Please input a valid suggestion.');
              return;
            }
            const poll = this.props.navigation.getParam('poll');
            if (this.props.suggestions.length !== poll.limit) {
              this.props.addSuggestion(poll.pollId, this.state.suggestion);
              this.setState({suggestion: ''});
            } else {
              Alert.alert(
                'Suggestion limit has been reached. You can only vote now.',
              );
            }
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Submit
          </Text>
        </Button>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    suggestions: state.polls.suggestions,
    currentUser: state.user.currentUser,
    voted: state.polls.voted,
  };
};

const dispatchToProps = dispatch => {
  return {
    addSuggestion: (pollId, suggestion) =>
      dispatch(add_suggestion(pollId, suggestion)),
    getSuggestions: (username, pollId) =>
      dispatch(get_suggestions(username, pollId)),
    vote: (username, pollId, option) =>
      dispatch(vote(username, pollId, option)),
  };
};

export default connect(mapToState, dispatchToProps)(VotingRoom);
