import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
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
    // color: '#DA2727',
  },
  title: {
    backgroundColor: 'white',
    flex: 1,
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
});

export default styles;
