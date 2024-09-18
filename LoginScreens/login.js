import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../firebaseConfig'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = [{
            email: '',
            password: ''
        }]
    }

    login = async (email, password) => {
        if (email && password) {
            auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential);
                    this.props.navigation.navigate('Home')
                })
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case 'auth/user-not-found':
                            Alert.alert('User Does Not Exists');
                            break;
                        case 'auth/invalid-credential':
                            Alert.alert('Incorrect Email or Password');
                            break;
                    }
                })


        } else {
            Alert.alert('Enter Email And Password');
        }
    };


    render() {
        return (
            <ImageBackground source={require('../assets/AppGraphics/login_back.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Email Id"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            this.setState({
                                email: text,
                            });
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text,
                            });
                        }}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => { this.login(this.state.email, this.state.password) }}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: 600,
                            alignSelf: 'center',
                            marginTop: 19
                        }}
                        onPress={async () => {
                            this.props.navigation.navigate('SignUp');
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'rgba(252,210,1,0.5)', fontWeight: 'bold' }}>
                            New to MY CLASS MANAGER ? Sign up now !
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: 600,
                            alignSelf: 'center',
                            marginTop: -10
                        }}
                        onPress={async () => {
                            this.props.navigation.navigate('Forget');
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'rgba(165,247,0,0.65)', fontWeight: 'bold' }}>
                            Forget Password
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