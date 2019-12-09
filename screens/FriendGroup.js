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
import {Button, Thumbnail, CheckBox} from 'native-base';
import {connect} from 'react-redux';
import {getFriends, get_users} from '../store';

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
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <View style={{marginLeft: 20, flex: 2}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              Friend Group Name
            </Text>
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
            style={{
              flex: 1,
              backgroundColor: '#2b81b5',
              marginRight: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Select All
            </Text>
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
                        style={user.available ? styles.TNDetails : null}
                        source={{uri: user.imageUrl}}
                      />
                    </View>
                    <Text
                      style={{
                        paddingLeft: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {user.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>

        <Button
          full
          style={{
            backgroundColor: '#2b81b5',
            justifyContent: 'center',
          }}
          onPress={() =>
            this.props.navigation.navigate('PollForm', {
              participants: this.state.participants,
            })
          }>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Submit Invite To Poll Room
          </Text>
        </Button>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
    users: state.user.users,
  };
};

const dispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
    getUsers: () => dispatch(get_users()),
  };
};
export default connect(mapToState, dispatchToProps)(FriendGroup);
