import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'
import Spotify from 'rn-spotify-sdk'

const Login = ({navigation}) => {

  let { width } = Dimensions.get('window')
  let dim = width * .8

  const login = async () => {
    let loggedIn = await Spotify.login()
    if(loggedIn) {
      navigation.navigate('Auth')
    } else {
      Alert.alert('You gotta log in')
    }
  }

  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QueueHub</Text>
      </View>
      <View style={styles.footer}>
        <Button 
          title="Login with Spotify" 
          buttonStyle={{width: dim, ...styles.button}}
          icon={
            <Icon
              name='spotify'
              color='white'
              size={30} />
          }
          titleStyle={styles.buttonTitle}
          onPress={() => login()} 
        />
      </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }, 
  header: {
    width: '100%',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F85FF'
  },
  title: {
    color: 'white',
    fontSize: 50,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonTitle: {
    fontSize: 25
  }, 
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    borderRadius: 50,
    height: 50
  },
})

Login.navigationOptions = {
  header: null
}
export default Login
