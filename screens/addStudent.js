import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default class AddStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            data: null
        })
    }

    componentDidMount = async () => {
        const auth = getAuth(app);
        let uid;
        //get user id
        onAuthStateChanged(auth, (user) => {
            if (user) {
                uid = user.uid;
            }
        });
        //await for uid
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(uid);

        //get data from firebase-database
        const db = getDatabase();
        const getData = ref(db, 'users/' + uid + '/');
        onValue(getData, (snapshot) => {
            const data = snapshot.val();
            this.setState({ data: data });

        });
        //await for data
        await new Promise(resolve => setTimeout(resolve, 20000));
        console.log(this.state.data)
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/AppGraphics/background.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/AppGraphics/app_logo.png')} style={styles.logo} />


                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.add();
                    }}>
                        <ImageBackground
                            source={require('../assets/AppGraphics/create_new_class_button.jpg')}
                            style={styles.buttonBackground}
                            imageStyle={styles.buttonImage}
                        >
                            <Text style={styles.buttonText}>Create New Class</Text>
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
