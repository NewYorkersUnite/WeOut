import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import styles from '../public/styles';
import {Button, Thumbnail, Container} from 'native-base';

const dummyFriends = [
  'https://i.pinimg.com/originals/34/cf/e4/34cfe4ff152f7cde337006dbaf9a5cbf.jpg',
  'https://pbs.twimg.com/media/C1tPCorUoAINR3c.jpg',
  'https://data.whicdn.com/images/248670503/original.png',
  'https://mcdn.wallpapersafari.com/medium/12/74/HlNebR.jpg',
  'https://cdn.designbyhumans.com/product_images/p/618788.f56.05432S7ay1Cm2MjUAAA-650x650-b-p.jpg',
  'https://d310a9hpolx59w.cloudfront.net/product_photos/66352254/file_53df422983_original.jpg',
];

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <Container style={{marginTop: 120}}>
          <View style={{height: 100}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 7,
              }}>
              <Text style={{fontWeight: 'bold'}}>All Friends</Text>
            </View>
            <View style={{flex: 3}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingStart: 5,
                  paddingEnd: 5,
                }}>
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[0]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[1]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[2]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[3]}}
                />

                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[4]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[5]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[4]}}
                />
                <Thumbnail
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#60F718',
                    borderWidth: 2,
                  }}
                  source={{uri: dummyFriends[5]}}
                />
              </ScrollView>
            </View>
          </View>
        </Container>

        <Text style={styles.center}>DASHBOARD!!</Text>
        <View style={styles.navContainer}>
          <View style={styles.navButtonContainer}>
            <Button
              style={styles.NavButton}
              onPress={() => navigate('Dashboard')}>
              <Text style={styles.NavBtnText}> Dash</Text>
            </Button>
          </View>

          <View style={styles.navButtonContainer}>
            <Button style={styles.NavButton} onPress={() => navigate('Search')}>
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
      </ImageBackground>
    );
  }
}
