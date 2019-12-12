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
const backgroundImg = require('../public/Background.png');
const backArrow = require('../public/BackArrow.png');

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
      <ImageBackground style={styles.title} source={backgroundImg}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.activeTitle}>Active Polls</Text>
        <View>
          <ScrollView>
            {this.props.allPolls.map(poll => {
              const thisMoment = new Date();
              const date = new Date(poll.endTime.seconds * 1000);
              let minutes = Math.floor((date - thisMoment) / 1000 / 60);
              if (minutes > 0) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('VotingRoom', {poll})
                    }>
                    <View style={styles.pollButton}>
                      <Image
                        source={{
                          uri: poll.imageURL,
                        }}
                        style={styles.pollImg}
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
const mapStateToProps = state => {
  return {
    allPolls: state.polls.polls,
    currentUser: state.user.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPolls: username => {
      dispatch(get_polls(username));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
