import React from 'react';
import { Text, ImageBackground, StyleSheet, View, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import app from '../firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database';

export default class NewClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = [{
            className: '',
            UID: ''
        }]
    }

    componentDidMount = async () => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                this.setState({ UID: uid })
            }
        })
    }

    createNewClass = async (cName, uid) => {
        if (cName && uid) {
            db = getDatabase(app)
            await set(ref(db, 'users/' + uid + '/' + cName + '/'), {
                students: 0
            }).catch((error) => {
                return Alert.alert(error.message)
            })
            
            this.props.navigation.navigate('Home')
            return Alert.alert('New Class Created Successfully.')
        }
        else{
            return Alert.alert('Enter Class Name and \n Try Again.')
        }

    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/AppGraphics/background.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Class Name"
                        onChangeText={(text) => {
                            this.setState({
                                className: text,
                            });
                        }}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => { this.createNewClass(this.state.className, this.state.UID) }}>
                        <Text style={styles.loginText}>Make New Class</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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