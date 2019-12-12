import React, {Component} from 'react';
import {ScrollView, Text, View, ImageBackground, Alert} from 'react-native';
import styles from '../public/styles';
import {Button, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import {
  getFriends,
  get_users,
  accept_friend,
  dismiss,
  get_notifications,
  get_events,
  get_polls,
  create_event,
} from '../store';

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
        <ScrollView style={styles.dashScroll}>
          <View style={styles.currentEventsCentered}>
            {this.props.events.map((event, indx) => {
              if (!event) return;
              const date = new Date(event.chosenDate.seconds * 1000);
              return (
                <View style={styles.currentEvents}>
                  <View style={styles.bottom}>
                    <Text style={styles.dashText}>{event.themeTitle}</Text>
                    <Text style={styles.eventsVote}>{event.winningVote}</Text>
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={styles.eventsDate}>{date.toDateString()}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderNotifications() {
    return (
      <View>
        <ScrollView style={{marginBottom: 116}}>
          {this.props.notifications.map((notif, idx) => {
            if (notif.includes('request to add you as friend')) {
              return (
                <View style={styles.notificationsMargin}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.notificationsBox}>
                      <Text style={styles.dashText}>{notif}</Text>
                    </View>

                    <View style={styles.requestBox}>
                      <View>
                        <Button
                          style={styles.requestAccept}
                          onPress={() => {
                            const friend = notif.slice(0, notif.length - 29);
                            Alert.alert(
                              'You have accepted their friend request!',
                            );
                            this.props.acceptFriend(
                              this.props.currentUser.username,
                              friend,
                              idx,
                            );
                          }}>
                          <Text style={styles.requestAcceptText}>Accept</Text>
                        </Button>
                      </View>
                      <View>
                        <Button
                          style={styles.requestDeny}
                          onPress={() => {
                            Alert.alert(
                              'You have denied their friend request!',
                            );
                            this.props.dismiss(
                              this.props.currentUser.username,
                              idx,
                            );
                          }}>
                          <Text style={styles.requestDenyText}>Deny</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.pollBox}>
                  <View style={styles.notificationPoll}>
                    <Text style={styles.dashText}>{notif}</Text>
                  </View>

                  <View style={styles.dismissBox}>
                    <Button
                      style={{backgroundColor: '#b8bab5'}}
                      onPress={() => {
                        Alert.alert('You have dismissed this poll invitation!');
                        this.props.dismiss(
                          this.props.currentUser.username,
                          idx,
                        );
                      }}>
                      <Text style={styles.dismissText}>Dismiss</Text>
                    </Button>
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
        <View>
          {this.props.numOfNotifications ? (
            <Text>{''}</Text>
          ) : (
            <Text style={styles.paragraph}>
              You don't have any notifications
            </Text>
          )}
        </View>
      </View>
    );
  }

  renderSection() {
    if (this.state.activeIndex === 0) {
      return <View>{this.renderCurrentSection()}</View>;
    } else if (this.state.activeIndex === 1) {
      return <View>{this.renderNotifications()}</View>;
    }
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.currentUser.username);
    await this.props.getUsers();
    await this.props.getNotifications(this.props.currentUser.username);
    await this.props.getPolls(this.props.currentUser.username);
    const allPolls = this.props.allPolls;
    await allPolls.forEach(async poll => {
      const thisMoment = new Date();
      const date = new Date(poll.endTime.seconds * 1000);
      let minutes = Math.floor((date - thisMoment) / 1000 / 60);
      if (minutes <= 0) {
        await this.props.createEvent(poll);
      }
    });
    await this.props.getEvents(this.props.eventsIds);
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
            <View>
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
                      ) {
                        return (
                          <Thumbnail
                            key={indx}
                            style={styles.TNDetails}
                            source={{uri: user.imageUrl}}
                          />
                        );
                      }
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.mainContainerCurrentEvents}>
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
                  <Text style={styles.NavBtnText}>
                    Notifications
                    {this.props.numOfNotifications
                      ? `(${this.props.numOfNotifications})`
                      : ''}
                  </Text>
                </Button>
              </View>
              <ImageBackground
                style={styles.opacityImg}
                source={require('../public/DashBack.jpeg')}>
                {this.renderSection()}
              </ImageBackground>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
    users: state.user.users,
    numOfFriends: state.user.numOfFriends,
    notifications: state.user.notifications,
    numOfNotifications: state.user.numOfNotifications,
    eventsIds: state.user.currentUser.polls,
    events: state.events.events,
    allPolls: state.polls.polls,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
    getUsers: () => dispatch(get_users()),
    acceptFriend: (username, friend, idx) =>
      dispatch(accept_friend(username, friend, idx)),
    dismiss: (username, idx) => dispatch(dismiss(username, idx)),
    getNotifications: username => dispatch(get_notifications(username)),
    getEvents: eventsIds => dispatch(get_events(eventsIds)),
    getPolls: username => {
      dispatch(get_polls(username));
    },
    createEvent: poll => dispatch(create_event(poll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
