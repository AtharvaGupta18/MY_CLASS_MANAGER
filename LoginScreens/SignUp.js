import React from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ImageBackground, Image, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import app from '../firebaseConfig'
import { getDatabase, ref, set } from 'firebase/database';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = [{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            UID: ''
        }]
    }

    // write name in firebase database under user's UID
    write = async (name, userID) => {
        db = getDatabase(app)
        await set(ref(db, 'users/' + userID), {
            name: name
        })
    }

    signup = async (email, password, confirmPassword, name) => {
        if (email && password && confirmPassword && name) {
            if (password != confirmPassword) {
                return Alert.alert("Passwords doesn't match. \n Check your password.");
            }
            else {
                const auth = getAuth(app);
                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;
                                this.setState({ UID: uid })
                                this.write(this.state.name, this.state.UID);
                                return Alert.alert('Successful ! \n Now login into your account.');
                            }

                        })

                    })
                    .catch((error) => {
                        return Alert.alert(error.message)
                    })


            }

        } else {
            Alert.alert('Enter Name, Email, \n Password and Confirm Password.');
        }
    };


    render() {
        return (
            <ImageBackground source={require('../assets/AppGraphics/login_back.jpg')} style={styles.background}>
                <KeyboardAvoidingView >
                    <ScrollView >
                        <View style={styles.container}>
                            <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                keyboardType="name"
                                onChangeText={(text) => {
                                    this.setState({
                                        name: text,
                                    });
                                }}
                            />
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
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text,
                                    });
                                }}
                            />
                            <TouchableOpacity style={styles.loginButton} onPress={() => { this.signup(this.state.email, this.state.password, this.state.confirmPassword, this.state.name) }}>
                                <Text style={styles.loginText}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: 45,
                                    width: 600,
                                    alignSelf: 'center',
                                    marginTop: 19
                                }}
                                onPress={async () => {
                                    this.props.navigation.navigate('Login');
                                }}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'rgba(252,210,1,0.5)', fontWeight: 'bold' }}>
                                    Return to Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
        justifyContent: 'center',
        marginTop: 120
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