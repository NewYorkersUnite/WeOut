import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {add_suggestion, get_suggestions, vote} from '../store';
import {connect} from 'react-redux';

class SinglePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: '',
    };
  }
  componentDidMount() {
    this.props.getSuggestions(this.props.navigation.getParam('poll').pollId);
  }

  render() {
    // console.log('STATE', this.state);this.props.navigation.getParam('poll'));
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
              marginBottom: 30,
            }}>
            {this.props.navigation.getParam('poll').themeTitle}
          </Text>
          <ScrollView>
            {this.props.suggestions.map((suggestion, indx) => {
              return (
                <View key={indx}>
                  <Button
                    onPress={() =>
                      this.props.vote(
                        this.props.navigation.getParam('poll').pollId,
                        suggestion.option,
                      )
                    }
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
                      {suggestion.option}
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
            this.props.addSuggestion(
              this.props.navigation.getParam('poll').pollId,
              this.state.suggestion,
            );
            this.setState({suggestion: ''});
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
  };
};

const dispatchToProps = dispatch => {
  return {
    addSuggestion: (pollId, suggestion) =>
      dispatch(add_suggestion(pollId, suggestion)),
    getSuggestions: pollId => dispatch(get_suggestions(pollId)),
    vote: (pollId, option) => dispatch(vote(pollId, option)),
  };
};

export default connect(mapToState, dispatchToProps)(SinglePoll);

/*
<View style={styles.centerish}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 30,
            }}>
            Movie Night
          </Text>
          <View>
            <Button
              full
              rounded
              style={{
                backgroundColor: '#2b81b5',
                justifyContent: 'center',
                marginBottom: 25,
              }}
              onPress={() =>
                this.setState({optionOneVote: this.state.optionOneVote + 1})
              }>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {this.state.optionOne}{' '}
                {this.calcOfOptionOne() ? this.calcOfOptionOne() + '%' : null}
              </Text>
            </Button>
            */

// calcOfOptionOne() {
//   let percentOfOptionOne = Math.ceil(
//     (this.state.optionOneVote / this.totalVotes()) * 100,
//   );
//   return percentOfOptionOne;
// }
// calcOfOptionTwo() {
//   let percentOfOptionTwo = Math.ceil(
//     (this.state.optionTwoVote / this.totalVotes()) * 100,
//   );
//   return percentOfOptionTwo;
// }
// calcOfOptionThree() {
//   let percentOfOptionThree = Math.ceil(
//     (this.state.optionThreeVote / this.totalVotes()) * 100,
//   );
//   return percentOfOptionThree;
// }
