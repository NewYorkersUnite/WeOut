import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button, Item, Label, Input} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {voteOptionOne, voteOptionTwo, voteOptionThree} from '../store';
import {connect} from 'react-redux';

class VotingRoomP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      suggestion: '',
    };
  }

  totalVotes() {
    let totalVotes =
      this.state.optionOneVote +
      this.state.optionTwoVote +
      this.state.optionThreeVote;
    return totalVotes;
  }

  calcOfOptionOne() {
    let percentOfOptionOne = Math.ceil(
      (this.state.optionOneVote / this.totalVotes()) * 100,
    );
    return percentOfOptionOne;
  }
  calcOfOptionTwo() {
    let percentOfOptionTwo = Math.ceil(
      (this.state.optionTwoVote / this.totalVotes()) * 100,
    );
    return percentOfOptionTwo;
  }
  calcOfOptionThree() {
    let percentOfOptionThree = Math.ceil(
      (this.state.optionThreeVote / this.totalVotes()) * 100,
    );
    return percentOfOptionThree;
  }
  render() {
    console.log('STATE', this.state);
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 30,
            }}>
            Choosen Theme: Movie Night
          </Text>
          <ScrollView>
            {this.state.suggestions.map((suggestion, indx) => {
              return (
                <View key={indx}>
                  <Button
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
                      {suggestion}
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
          onPress={() =>
            this.setState({
              suggestions: [...this.state.suggestions, this.state.suggestion],
            })
          }>
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
    optionOne: state.optionOne,
    optionTwo: state.optionTwo,
    optionThree: state.optionThree,
  };
};

const dispatchToProps = dispatch => {
  return {
    voteOptionOne: () => dispatch(voteOptionOne()),
    voteOptionTwo: () => dispatch(voteOptionTwo()),
    voteOptionThree: () => dispatch(voteOptionThree()),
  };
};

export default connect(
  mapToState,
  dispatchToProps,
)(VotingRoomP);
