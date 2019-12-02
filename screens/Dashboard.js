import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import styles from '../public/styles';
import {Button, Thumbnail, Container} from 'native-base';
import {connect} from 'react-redux';
import {getFriends, get_users, accept_friend, deny_friend} from '../store';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      friends: [],
    };
  }

  segmentClicked(index) {
    this.setState({
      activeIndex: index,
    });
  }
  checkActive = index => {
    if (this.state.activeIndex !== index) {
      return {color: 'grey'};
    } else {
      return {};
    }
  };

  renderCurrentSection() {
    return (
      <View>
        <Text style={styles.paragraph}>TODAY YOOOOO!</Text>
      </View>
    );
  }
  renderPastSection() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>Past!</Text>
      </View>
    );
  }
  renderNotifications() {
    return (
      <View>
        {this.props.currentUser.notifications.map((notif, idx) => {
          return (
            <View>
              <Text>{notif}</Text>
              <Button
                onPress={() => {
                  const friend = notif.slice(0, notif.length - 29);
                  this.props.acceptFriend(
                    this.props.currentUser.username,
                    friend,
                    idx,
                  );
                }}>
                <Text>Accept</Text>
              </Button>
              <Button
                onPress={() => {
                  this.props.denyFriend(this.props.currentUser.username, idx);
                }}>
                <Text>Deny</Text>
              </Button>
            </View>
          );
        })}
        <View>
          {this.props.numOfNotifications ? (
            <Text>{''}</Text>
          ) : (
            <Text>{'You dont have any notification'}</Text>
          )}
        </View>
      </View>
    );
  }
  // style={{flexDirection: 'row', flexWrap: 'wrap'}}
  renderSection() {
    if (this.state.activeIndex === 0) {
      return <View>{this.renderCurrentSection()}</View>;
    } else if (this.state.activeIndex === 1) {
      return <View>{this.renderPastSection()}</View>;
    } else if (this.state.activeIndex === 2) {
      return <View>{this.renderNotifications()}</View>;
    }
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.currentUser.username);
    await this.props.getUsers();
  }

  render() {
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.logo}>
          {/* This is is just an empty space to allow the logo to show */}
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.top}>
            <View style={styles.scrollContainer}>
              <View style={styles.scrollHeight}>
                <View style={styles.proportionsOfScroll}>
                  <Text style={styles.scrollTxt}>All Friends</Text>
                </View>
                <View style={styles.proportionsOfScrollPRT2}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollPadding}>
                    {this.props.users.map((user, indx) => {
                      if (
                        user.available &&
                        this.props.friends.includes(user.username)
                      )
                        return (
                          <Thumbnail
                            key={indx}
                            style={styles.TNDetails}
                            source={{uri: user.imageUrl}}
                          />
                        );
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            {/* CALANDER BUTTONS */}
            <View style={styles.mainContainerCALANDAR}>
              <View style={styles.tabBackgroundColor}>
                <Button
                  onPress={() => this.segmentClicked(0)}
                  transparent
                  active={this.state.activeIndex === 0}>
                  <Text style={styles.NavBtnText}> Current Events</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(1)}
                  transparent
                  active={this.state.activeIndex === 1}>
                  <Text style={styles.NavBtnText}> Past Events</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(2)}
                  transparent
                  active={this.state.activeIndex === 2}>
                  <Text style={styles.NavBtnText}>
                    Notifications
                    {this.props.numOfNotifications
                      ? this.props.numOfNotifications
                      : ''}
                  </Text>
                </Button>
              </View>
              <ImageBackground
                style={styles.opacityImg}
                imageStyle={{opacity: 0.3}}
                source={require('../public/Taxis.jpg')}>
                {this.renderSection()}
              </ImageBackground>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
    users: state.user.users,
    numOfFriends: state.user.numOfFriends,
    numOfNotifications: state.user.numOfNotifications,
  };
};

const dispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
    getUsers: () => dispatch(get_users()),
    acceptFriend: (username, friend, idx) =>
      dispatch(accept_friend(username, friend, idx)),
    denyFriend: (username, idx) => dispatch(deny_friend(username, idx)),
  };
};

export default connect(mapToState, dispatchToProps)(Dashboard);
