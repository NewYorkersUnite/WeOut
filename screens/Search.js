import React, {Component} from 'react';
import {ScrollView, Image, Text, View, FlatList} from 'react-native';
import styles from '../public/styles';
import {Header, Item, Input, Button} from 'native-base';

const listItems = [
  'Writing',
  'Larning',
  'Descipling',
  'Productivity',
  'Personal',
  'Meditate',
  'Mindfulness',
  'Buddha',
  'Dhamma',
  'Health',
  'Fitness',
  'Music',
];
let searchResult = [];

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  searchFriends = text => {
    this.setState({text});
  };

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
                searchResult = listItems.filter(el => el.includes(value));
              }}
            />
          </Item>
        </Header>

        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <Text style={{padding: 20, fontSize: 20}}>{item}</Text>
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
