import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/AppGraphics/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />
          <Text style={styles.title}>My Class Manager</Text>
          <Text style={styles.subtitle}>Smart Anytime, Anywhere!</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('StudentManager')}}>
            <ImageBackground
              source={require('../assets/AppGraphics/add_students_button.jpg')}
              style={styles.buttonBackground}
              imageStyle={styles.buttonImage}
            >
              <Text style={styles.buttonText}>Student Manager</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <ImageBackground
              source={require('../assets/AppGraphics/data_entry_button.jpg')}
              style={styles.buttonBackground}
              imageStyle={styles.buttonImage}
            >
              <Text style={styles.buttonText}>Data Entry</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <ImageBackground
              source={require('../assets/AppGraphics/data_management_button.jpg')}
              style={styles.buttonBackground}
              imageStyle={styles.buttonImage}
            >
              <Text style={styles.buttonText}>Data Management</Text>
            </ImageBackground>
          </TouchableOpacity>


        </View>
      </ImageBackground>
    );
  }

};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
  buttonBackground: {
    width: 250,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    borderRadius: 25,
    resizeMode: 'stretch',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 20
  },
});
