import React, {Component} from 'react';
import {ScrollView, Image, Text, View, FlatList, Alert} from 'react-native';
import styles from '../public/styles';
import {Header, Thumbnail, Item, Input, Button} from 'native-base';
const {db} = require('../functions/util/config');

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.navigation.getParam('currentUser'),
      value: '',
      users: [],
      searchResult: [],
    };
  }

  async addFriendClick({item}) {
    console.log("ADDEED", item);
    await db
      .doc(`/users/${this.state.currentUser}/fiends/${item.username}`)
      .set(item);
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
    console.log("In search current user is", this.state.currentUser  );

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
              <Text style={styles.listFriends}>
                {item.username.toUpperCase()}
              </Text>
              <Button
                style={styles.addFriendBtn}
                // eslint-disable-next-line no-shadow
                // eslint-disable-next-line no-undef
                onPress={() => this.addFriendClick({item})}>
                <Text>Add</Text>
              </Button>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.mainContainer}>
          <View style={styles.navContainer}>
            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Dashboard')}>
                <Text style={styles.NavBtnText}> Dash</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Search')}>
                <Text style={styles.NavBtnText}> Search</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button style={styles.NavButton} onPress={() => navigate('Poll')}>
                <Text style={styles.NavBtnText}> Poll</Text>
              </Button>
            </View>

            <View style={styles.navButtonContainer}>
              <Button
                style={styles.NavButton}
                onPress={() => navigate('Profile')}>
                <Text style={styles.NavBtnText}> Profile</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
