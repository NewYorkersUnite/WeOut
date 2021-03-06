import React, {Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import styles from '../public/styles';
import {Header, Thumbnail, Item, Input, Button} from 'native-base';
const {db} = require('../secrets');

import {connect} from 'react-redux';
import {addFriend} from '../store';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      users: [],
      searchResult: [],
    };
  }

  addFriendClick({item}) {
    this.props.addFriend(this.props.currentUser.username, item);
  }

  async componentDidMount() {
    const users = [];
    const userData = await db.collection('users').get();
    userData.forEach(element => {
      if (
        element.data().username !== this.props.currentUser.username &&
        !this.props.friends.includes(element.data().username)
      )
        users.push(element.data());
    });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({users, searchResult: users});
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <Header searchBar rounded>
          <Item>
            <Input
              value={this.state.value}
              placeholder="Search For Friends"
              onChangeText={value => {
                value = value.toLocaleLowerCase();
                this.setState({value});
                const searchResult = this.state.users.filter(el => {
                  return el.username.toLowerCase().includes(value);
                });
                this.setState({searchResult});
              }}
            />
          </Item>
        </Header>

        <Text style={styles.searchText}>Search Results:</Text>

        <FlatList
          style={styles.eachSearch}
          data={this.state.searchResult}
          renderItem={({item}) => (
            <View style={styles.eachSearchLayout}>
              <View style={styles.searchThumb}>
                <Thumbnail
                  style={item.available ? styles.TNDetails : {marginLeft: 3}}
                  source={{uri: item.imageUrl}}
                />
                <Text style={styles.friendName}>{item.username}</Text>
              </View>
              <Button
                full
                rounded
                style={styles.searchAdd}
                onPress={() => {
                  Alert.alert(`Friend Request Sent to ${item.username}!`);
                  this.addFriendClick({item});
                }}>
                <Text style={styles.selectAllText}>Add Friend</Text>
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.currentUser.friends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: (username, item) => {
      dispatch(addFriend(username, item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
