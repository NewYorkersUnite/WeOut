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
import {Button, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import {getFriends, get_users} from '../store';
const backgroundImg = require('../public/Background.png');
const backArrow = require('../public/BackArrow.png');

class FriendGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
    };
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.currentUser.username);
    await this.props.getUsers();
  }

  unselect(unselected) {
    if (this.state.participants.includes(unselected)) {
      let newArray = this.state.participants.filter(unselected);
      return newArray;
    }
  }

  render() {
    return (
      <ImageBackground style={styles.title} source={backgroundImg}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <View style={styles.friendTitle}>
          <View style={styles.friendView}>
            <Text style={styles.friendText}>Friend Group Name</Text>
            <Text>{this.props.currentUser.friends.length} Friends</Text>
          </View>
          <Button
            onPress={() => {
              const participants = [];
              this.props.users.forEach((user, index) => {
                if (this.props.friends.includes(user.username)) {
                  participants.push(user.username);
                }
              });

              if (this.state.participants.length === participants.length) {
                this.setState({participants: []});
              } else {
                this.setState({participants});
              }
            }}
            style={styles.selectAllButton}>
            <Text style={styles.selectAllText}>Select All</Text>
          </Button>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingTop: 30,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          {this.props.users.map((user, indx) => {
            if (this.props.friends.includes(user.username)) {
              return (
                <TouchableOpacity
                  style={{marginBottom: 3}}
                  onPress={() => {
                    if (this.state.participants.includes(user.username)) {
                      const participants = this.state.participants.filter(
                        participant =>
                          user.username === participant ? false : true,
                      );
                      this.setState({participants: participants});
                    } else {
                      this.setState({
                        participants: [
                          ...this.state.participants,
                          user.username,
                        ],
                      });
                    }
                  }}>
                  <View
                    style={
                      this.state.participants.includes(user.username)
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'gray',
                          }
                        : {flexDirection: 'row', alignItems: 'center'}
                    }>
                    <View>
                      <Thumbnail
                        style={
                          user.available ? styles.TNDetails : {marginLeft: 3}
                        }
                        source={{uri: user.imageUrl}}
                      />
                    </View>
                    <Text style={styles.friendName}>{user.username}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>

        <Button
          full
          style={styles.friendSubmitPoll}
          onPress={() =>
            this.props.navigation.navigate('PollForm', {
              participants: this.state.participants,
            })
          }>
          <Text style={styles.selectAllText}>Submit Invite To Poll Room</Text>
        </Button>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
    users: state.user.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
    getUsers: () => dispatch(get_users()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendGroup);
