import React, {Component} from 'react';
import {ScrollView, Image, Text, View, ImageBackground} from 'react-native';
import styles from '../public/styles';
import {Button} from 'native-base';

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
        <View style={styles.mainContainer}>
          <ScrollView horizontal={true} scrollEventThrottle={16}>
            <View style={styles.v1InsideSV}>
              <Text style={styles.v1InsideSVTEXT}>
                TEST IN THE dashboard BABBBAYYYYYYYYYY
              </Text>
            </View>

            <View style={styles.friendsSVContainer}>
              <ScrollView>
                <View style={styles.friendsSV}>
                  <View style={{flex: 2}}>
                    <Image
                      source={{uri: dummyFriends[0]}}
                      style={styles.friendImgThumbnail}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text>FIRST ONE</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>

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
      </ImageBackground>
    );
  }
}
