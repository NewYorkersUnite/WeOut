import React, {Component} from 'react';
import {ScrollView, Image, Text, View} from 'react-native';
import styles from '../public/styles';
import {Header, Item, Input, Button} from 'native-base';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      friendSearch: '',
    };
  }

  searchFriends = friendSearch => {
    this.setState({friendSearch});
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.searchBar}>
        <Header searchBar rounded>
          <Item>
            <Input
              value={this.state.searchFriends}
              placeholder="Search For Friends"
              onChangeText={friendSearch => this.setState({friendSearch})}
            />
          </Item>
        </Header>

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

export default Search;
