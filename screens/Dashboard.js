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
  today() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>TODAY YOOOOO!</Text>
      </View>
    );
  }
  upcoming() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>COMING UP!</Text>
      </View>
    );
  }
  past() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>Past!</Text>
      </View>
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        style={styles.title}
        source={require('../public/Background.png')}>
        <View style={styles.logo}>
          {/* This is is just an empty space to allow the logo to show */}
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.top}>
            <Container style={styles.scrollContainer}>
              <View style={styles.scrollHeight}>
                <View style={styles.proportionsOfScroll}>
                  <Text style={styles.scrollTxt}>All Friends</Text>
                </View>
                <View style={styles.proportionsOfScrollPRT2}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollPadding}>
                    {dummyFriends.map((friend, indx) => {
                      return (
                        <Thumbnail
                          key={indx}
                          style={styles.TNDetails}
                          source={{uri: friend}}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Container>

            {/* CALANDER BUTTONS */}
            <View style={styles.mainContainerCALANDAR}>
              <View style={styles.navButtonContainer}>
                <Button
                  style={styles.NavButton}
                  onPress={() => {
                    this.today;
                  }}>
                  <Text style={styles.NavBtnText}> Today</Text>
                </Button>
              </View>

              <View style={styles.navButtonContainer}>
                <Button
                  style={styles.NavButton}
                  onPress={() => {
                    this.upcoming;
                  }}>
                  <Text style={styles.NavBtnText}> Upcoming</Text>
                </Button>
              </View>

              <View style={styles.navButtonContainer}>
                <Button
                  style={styles.NavButton}
                  onPress={() => {
                    this.past;
                  }}>
                  <Text style={styles.NavBtnText}> Past Events</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.feeds} />
        </View>
      </ImageBackground>
    );
  }
}
