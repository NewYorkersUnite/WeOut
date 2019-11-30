import React, {Component} from 'react';
import {ScrollView, Image, Text, View, FlatList, Alert} from 'react-native';
import styles from '../public/styles';
import {Header, Thumbnail, Item, Input, Button} from 'native-base';
const {db} = require('../functions/util/config');

import {connect} from 'react-redux';
import {addFriend} from '../store';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      // currentUser: this.props.navigation.getParam('currentUser'),
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
      users.push(element.data());
    });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({users});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.searchBar}>
        <Header searchBar rounded>
          <Item>
            <Input
              value={this.state.value}
              placeholder="Search For Friends"
              onChangeText={value => {
                this.setState({value});
                const searchResult = this.state.users.filter(el =>
                  el.username.includes(value.toLowerCase()),
                );
                this.setState({searchResult});
              }}
            />
          </Item>
        </Header>

        <FlatList
          data={this.state.searchResult}
          renderItem={({item}) => (
            <View style={styles.resultElement}>
              <Thumbnail
                style={styles.TNDetails}
                source={{uri: item.imageUrl}}
              />
              <Text style={styles.listFriends}>{item.username}</Text>
              <Button
                style={styles.addFriendBtn}
                onPress={() => this.addFriendClick({item})}>
                <Text>Add</Text>
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapToState = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

const dispatchToProps = dispatch => {
  return {
    addFriend: (username, item) => {
      dispatch(addFriend(username, item));
    },
  };
};

export default connect(mapToState, dispatchToProps)(Search);
