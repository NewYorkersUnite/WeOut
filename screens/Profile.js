import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
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
  {name: 'AllFriends', img: AllFriends},
  {name: 'College', img: College},
  {name: 'Single', img: Single},
  {name: 'High School', img: Lockers},
  {name: 'Office', img: Office},
  {name: 'Party', img: Party},
  {name: 'Parents', img: Parents},
  {name: 'Foodie', img: Foodie},
];

const {width, height} = Dimensions.get('window');

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      availablity: true,
    };
  }

  availablity() {
    if (this.state.availablity === true) {
      this.setState({availablity: false});
    } else {
      this.setState({availablity: true});
    }
  }

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
                  style={[
                    {width: 100, height: 100, borderRadius: 50},
                    this.state.availablity
                      ? {borderColor: '#60F718', borderWidth: 4}
                      : null,
                  ]}
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
                    <Text style={{fontSize: 10, color: 'grey'}}>Friends</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text>167</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Polls</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 15,
                  }}>
                  <Button
                    bordered
                    dark
                    style={{
                      flex: 3,
                      marginLeft: 10,
                      justifyContent: 'center',
                      height: 40,
                    }}
                    onPress={() => this.availablity()}>
                    <Text style={{fontWeight: 'bold'}}>Status</Text>
                  </Button>

                  <Button
                    bordered
                    dark
                    style={{
                      flex: 1,
                      height: 40,
                      marginRight: 10,
                      marginLeft: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Log Out</Text>
                  </Button>
                </View>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingTop: 25,
                  paddingBottom: 100,
                }}>
                {catergories.map((category, ind) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FriendGroup')
                      }>
                      <View
                        key={ind}
                        style={[
                          {width: width / 2},
                          {height: width / 2},
                          {marginBottom: 2},
                          ind % 2 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
                        ]}>
                        <ImageBackground
                          style={{flex: 1, width: undefined, height: undefined}}
                          source={category.img}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              backgroundColor: '#DA2727',
                              textAlign: 'center',
                            }}>
                            {category.name}
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
