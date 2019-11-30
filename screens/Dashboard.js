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
import {connect} from 'react-redux';
import {getFriends} from '../store';

const dummyFriends = [
  'https://i.pinimg.com/originals/34/cf/e4/34cfe4ff152f7cde337006dbaf9a5cbf.jpg',
  'https://pbs.twimg.com/media/C1tPCorUoAINR3c.jpg',
  'https://data.whicdn.com/images/248670503/original.png',
  'https://mcdn.wallpapersafari.com/medium/12/74/HlNebR.jpg',
  'https://cdn.designbyhumans.com/product_images/p/618788.f56.05432S7ay1Cm2MjUAAA-650x650-b-p.jpg',
  'https://d310a9hpolx59w.cloudfront.net/product_photos/66352254/file_53df422983_original.jpg',
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      friends: [],
    };
  }

  segmentClicked(index) {
    this.setState({
      activeIndex: index,
    });
  }
  checkActive = index => {
    if (this.state.activeIndex !== index) {
      return {color: 'grey'};
    } else {
      return {};
    }
  };

  renderTodaySection() {
    return (
      <View>
        <Text style={styles.paragraph}>TODAY YOOOOO!</Text>
      </View>
    );
  }
  renderUpcomingSection() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>COMING UP!</Text>
      </View>
    );
  }
  renderPastSection() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>Past!</Text>
      </View>
    );
  }
  // style={{flexDirection: 'row', flexWrap: 'wrap'}}
  renderSection() {
    if (this.state.activeIndex === 0) {
      return <View>{this.renderTodaySection()}</View>;
    } else if (this.state.activeIndex === 1) {
      return <View>{this.renderUpcomingSection()}</View>;
    } else if (this.state.activeIndex === 2) {
      return <View>{this.renderPastSection()}</View>;
    }
  }

  render() {
    this.props.getFriends(this.props.currentUser.username);
    // console.log(this.props.friends);
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
            <View style={styles.scrollContainer}>
              <View style={styles.scrollHeight}>
                <View style={styles.proportionsOfScroll}>
                  <Text style={styles.scrollTxt}>All Friends</Text>
                </View>
                <View style={styles.proportionsOfScrollPRT2}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollPadding}>
                    {this.props.friends.map((friend, indx) => {
                      if (friend.available === true)
                        return (
                          <Thumbnail
                            key={indx}
                            style={styles.TNDetails}
                            source={{uri: friend.imageUrl}}
                          />
                        );
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            {/* CALANDER BUTTONS */}
            <View style={styles.mainContainerCALANDAR}>
              <View style={styles.tabBackgroundColor}>
                <Button
                  onPress={() => this.segmentClicked(0)}
                  transparent
                  active={this.state.activeIndex === 0}>
                  <Text style={styles.NavBtnText}> Today</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(1)}
                  transparent
                  active={this.state.activeIndex === 1}>
                  <Text style={styles.NavBtnText}> Upcoming</Text>
                </Button>

                <Button
                  onPress={() => this.segmentClicked(2)}
                  transparent
                  active={this.state.activeIndex === 2}>
                  <Text style={styles.NavBtnText}> Past Events</Text>
                </Button>
              </View>
              <ImageBackground
                style={styles.opacityImg}
                imageStyle={{opacity: 0.3}}
                source={require('../public/Taxis.jpg')}>
                {this.renderSection()}
              </ImageBackground>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapToState = state => {
  return {
    currentUser: state.user.currentUser,
    friends: state.user.friends,
  };
};

const dispatchToProps = dispatch => {
  return {
    getFriends: username => dispatch(getFriends(username)),
  };
};

export default connect(mapToState, dispatchToProps)(Dashboard);
