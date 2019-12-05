import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../public/styles';
import {connect} from 'react-redux';
import {get_polls} from '../store';
import randomNYCphotos from '../public/photoURLS';
class AllPolls extends Component {
  async componentDidMount() {
    await this.props.getPolls(this.props.currentUser.username);
    this.interval = setInterval(() => this.setState({time: Date.now()}), 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image
            style={{width: 50, height: 50, marginTop: 70, marginLeft: 8}}
            source={require('../public/BackArrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.activeTitle}>Active Polls</Text>
        <View>
          <ScrollView>
            {this.props.allPolls.map(poll => {
              const thisMoment = new Date();
              const date = new Date(poll.endTime.seconds * 1000);
              let minutes = Math.floor((date - thisMoment) / 1000 / 60);
              // console.log('Minutes left is ', minutes);
              if (minutes > 0) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('VotingRoom', {poll})
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 100,
                        height: 100,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri: poll.imageURL,
                        }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                          marginLeft: 10,
                          marginTop: 10,
                          marginRight: 10,
                        }}
                      />
                      <View style={styles.pollDetails}>
                        <Text style={styles.scrollTxt}>{poll.themeTitle}</Text>
                        <Text>Final Votes Closing In: {minutes} minutes</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
const mapToState = state => {
  return {
    allPolls: state.polls.polls,
    currentUser: state.user.currentUser,
  };
};
const dispatchToProps = dispatch => {
  return {
    getPolls: username => {
      dispatch(get_polls(username));
    },
  };
};
export default connect(mapToState, dispatchToProps)(AllPolls);

