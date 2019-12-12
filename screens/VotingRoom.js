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
const backgroundImg = require('../public/Background.png');
const backArrow = require('../public/BackArrow.png');

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
      <ImageBackground style={styles.title} source={backgroundImg}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AllPolls')}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>

        <View style={styles.votingTitle}>
          <Text style={styles.votingText}>
            {this.props.navigation.getParam('poll').themeTitle}
          </Text>

          <Text style={styles.votingDate}>
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
                    style={styles.suggestion}>
                    <Text style={styles.suggestionText}>
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
          style={styles.addSuggestionButton}
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
          <Text style={styles.suggestionText}>Submit</Text>
        </Button>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    suggestions: state.polls.suggestions,
    currentUser: state.user.currentUser,
    voted: state.polls.voted,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSuggestion: (pollId, suggestion) =>
      dispatch(add_suggestion(pollId, suggestion)),
    getSuggestions: (username, pollId) =>
      dispatch(get_suggestions(username, pollId)),
    vote: (username, pollId, option) =>
      dispatch(vote(username, pollId, option)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotingRoom);
