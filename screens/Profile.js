import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../public/styles';
import {Button, Content, Container} from 'native-base';

const AllFriends = require('../public/AllFriends.jpg');
const College = require('../public/College.jpg');
const Foodie = require('../public/Foodie.jpg');
const Lockers = require('../public/Lockers.jpg');
const Office = require('../public/Office.jpg');
const Parents = require('../public/Parents.jpg');
const Party = require('../public/Party.jpg');
const Single = require('../public/Single.jpg');

const catergories = [
  AllFriends,
  College,
  Single,
  Lockers,
  Office,
  Party,
  Parents,
  Foodie,
];

const {width, height} = Dimensions.get('window');

export default class Profile extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.ProfileContainer}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../public/Taxis.jpg')}
                  style={{width: 100, height: 100, borderRadius: 50}}
                />
              </View>
              <View style={{flex: 3}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 22}}>
                      Username
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text>205</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Followers</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text>167</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Friends</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 10,
                  }}>
                  <Button
                    bordered
                    dark
                    style={{
                      flex: 3,
                      marginLeft: 10,
                      justifyContent: 'center',
                      height: 30,
                    }}>
                    <Text>Edit Profile</Text>
                  </Button>

                  <Button
                    bordered
                    dark
                    style={{
                      flex: 1,
                      height: 30,
                      marginRight: 10,
                      marginLeft: 5,
                      justifyContent: 'center',
                    }}>
                    <Text>?</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 25}}>
              {catergories.map((category, ind) => {
                return (
                  <View
                    key={ind}
                    style={[
                      {width: width / 3},
                      {height: width / 3},
                      ind % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
                    ]}>
                    <Image
                      style={{flex: 1, width: undefined, height: undefined}}
                      source={category}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
