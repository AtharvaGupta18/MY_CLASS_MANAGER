import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import app from '../firebaseConfig'

export default class Forget extends React.Component {
    constructor(props) {
        super(props)
        this.state = [{
            email: ''
        }]
    }

    sendEmail = async (email) => {
        if (email) {
            const auth = getAuth(app);
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    this.props.navigation.navigate('Login')
                    return Alert.alert('Password reset email sent successfully \n Check your inbox')
                })
                .catch((error) => {
                    return Alert.alert(error.message)
                })


        } else {
            Alert.alert('Enter Registered Email');
        }
    };


    render() {
        return (
            <ImageBackground source={require('../assets/AppGraphics/login_back.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />
                    <TextInput
                        style={styles.input}
                        placeholder="Registered Email Id"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            this.setState({
                                email: text,
                            });
                        }}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => { this.sendEmail(this.state.email) }}>
                        <Text style={styles.loginText}>Continue</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: 600,
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                        onPress={async () => {
                            this.props.navigation.navigate('Login');
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'rgba(165,247,0,0.65)', fontWeight: 'bold' }}>
                            Return to Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }


};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 20,
        color: '#ffffff',
    },
    loginButton: {
        marginTop: 30,
        width: 200,
        height: 50,
        backgroundColor: '#ff6f61',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});