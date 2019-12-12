import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  // All Pages
  title: {
    backgroundColor: 'white',
    flex: 1,
  },
  backArrow: {width: 50, height: 50, marginTop: 50, marginLeft: 8},

  // ALL POLLS
  activeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  pollDetails: {flexDirection: 'column', width: 300, height: 50},
  pollButton: {
    flexDirection: 'row',
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  pollImg: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },

  // BOTTOM NAV
  bottomIcons: {width: 30, height: 30},

  // DASHBOARD
  dashScroll: {
    marginTop: 25,
    marginBottom: 100,
  },
  dashText: {fontSize: 15, fontWeight: 'bold'},
  // DASHBOARD - CURRENT EVENTS
  currentEventsCentered: {alignItems: 'center'},
  currentEvents: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    width: width / 1.1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  eventsVote: {fontWeight: 'bold', color: 'gray'},
  eventsDate: {fontWeight: 'bold'},
  // DASHBOARD - NOTIFICATIONS
  notificationsMargin: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  notificationsBox: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  requestBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
  },
  requestAccept: {
    backgroundColor: '#2b81b5',
    width: 60,
  },
  requestAcceptText: {
    fontWeight: 'bold',
    marginLeft: 4,
    color: 'white',
  },
  requestDeny: {backgroundColor: '#ff4c30', width: 60},
  requestDenyText: {
    fontWeight: 'bold',
    marginLeft: 12,
    color: 'white',
  },
  pollBox: {
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  notificationPoll: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  dismissBox: {flex: 1, padding: 20, marginLeft: 50},
  dismissText: {fontWeight: 'bold', marginLeft: 22},
  // DASHBOARD - ALL FRIENDS
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
    paddingBottom: 5,
  },
  TNDetails: {
    marginHorizontal: 5,
    borderColor: '#60F718',
    borderWidth: 2,
  },
  // DASHBOARD - CURRENT EVENTS
  mainContainerCurrentEvents: {
    justifyContent: 'flex-start',
  },

  // FRIEND GROUP
  friendTitle: {flexDirection: 'row', marginTop: 25},
  friendView: {marginLeft: 20, flex: 2},
  friendText: {fontSize: 22, fontWeight: 'bold'},
  selectAllButton: {
    flex: 1,
    backgroundColor: '#2b81b5',
    marginRight: 20,
    justifyContent: 'center',
  },
  selectAllText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  friendName: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendSubmitPoll: {
    backgroundColor: '#2b81b5',
    justifyContent: 'center',
  },

  // LOGIN & SIGN UP
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
  LogSignBtn: {
    width: 200,
    backgroundColor: '#DA2727',
    paddingHorizontal: 26,
    fontSize: 22,
    marginVertical: 20,
  },
  BtnText: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // POLL FORM
  pollFormBox: {flex: 1, flexDirection: 'row', marginTop: 20},
  timerText: {fontWeight: 'bold', textAlign: 'center'},
  dateButton: {
    backgroundColor: '#2b81b5',
    justifyContent: 'center',
    marginTop: 10,
  },

  // PROFILE
  ProfileContainer: {
    flex: 1,
    paddingTop: 120,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 50,
  },
  profilePicBTN: {width: 100, height: 100, borderRadius: 50},
  alignCen: {
    alignItems: 'center',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  statBtnLRG: {
    flex: 3,
    marginLeft: 10,
    justifyContent: 'center',
    height: 40,
  },
  statBtnSML: {
    flex: 1,
    height: 40,
    marginRight: 10,
    marginLeft: 5,
    justifyContent: 'center',
  },
  categorySection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 25,
    paddingBottom: 100,
  },
  categoryLabels: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#DA2727',
    textAlign: 'center',
  },

  //SEARCH
  tabBackgroundColor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eae5e5',
    backgroundColor: '#F0F0F0',
  },
  resultElement: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
  },
  addFriendBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  opacityImg: {
    width: '100%',
    height: '100%',
    paddingBottom: 90,
  },
  paragraph: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 7,
  },
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  eachSearch: {marginTop: 40, paddingLeft: 20, paddingRight: 20},
  eachSearchLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  searchThumb: {flex: 2, flexDirection: 'row', alignItems: 'center'},
  searchAdd: {
    backgroundColor: '#2b81b5',
    justifyContent: 'center',
    width: 100,
  },

  // VOTING ROOM
  votingTitle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  votingText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
    marginTop: 5,
  },
  votingDate: {fontWeight: 'bold', marginBottom: 25},
  suggestion: {
    backgroundColor: '#2b81b5',
    justifyContent: 'center',
    width: 300,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addSuggestionButton: {
    backgroundColor: '#2b81b5',
    justifyContent: 'center',
    marginTop: 25,
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
    paddingTop: 150,
  },
  v1InsideSVTEXT: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});

export default styles;

//bottomnav@email.com
