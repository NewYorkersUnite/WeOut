import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  // Main Page
  logo: {
    height: 120,
  },
  top: {
    flex: 5,
  },
  feeds: {
    flex: 20,
  },
  bottom: {
    flex: 2,
  },




  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainLogo: {
    marginTop: 100,
    marginLeft: 65,
  },
  LogSignBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 250,
  },
  title: {
    backgroundColor: 'white',
    flex: 1,
  },
  LogSignBtn: {
    width: 200,
    backgroundColor: '#DA2727', // SUPREME RED COLOR
    paddingHorizontal: 26,
    fontSize: 22,
    marginVertical: 20,
  },
  BtnText: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // LOGIN & SIGN UP SCREENS
  centerish: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  LogSignBtnCentered: {
    width: 200,
    backgroundColor: '#DA2727',
    paddingHorizontal: 26,
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 110,
  },

  //NAV BAR
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  navContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
  },
  navButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavButton: {
    backgroundColor: '#F0F0F0',
  },
  NavBtnText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  // HORIZONTAL SCROLL - DASHBOARD
  v1InsideSV: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingTop: 150,
  },
  v1InsideSVTEXT: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },

  // FRIENDS SCROLLVIEW
  scrollContainer: {
    // marginTop: 120,
    // marginBottom: -460,
  },
  scrollHeight: {
    height: 100,
  },
  proportionsOfScroll: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  scrollTxt: {
    fontWeight: 'bold',
  },
  proportionsOfScrollPRT2: {
    flex: 3,
  },
  scrollPadding: {
    alignItems: 'center',
    paddingStart: 5,
    paddingEnd: 5,
  },
  TNDetails: {
    marginHorizontal: 5,
    borderColor: '#60F718',
    borderWidth: 2,
  },
  // DASHBOARD CALANDAR NAV
  mainContainerCALANDAR: {
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  //SEARCH BAR
  resultElement: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  searchBar: {
    flex: 1,
  },
  listFriends: {
    flex: 7,
    // padding: 20,
    fontSize: 20,
    // backgroundColor: 'red',
  },
  addFriendBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: "stretch",
  },
});

export default styles;

//bottomnav@email.com
