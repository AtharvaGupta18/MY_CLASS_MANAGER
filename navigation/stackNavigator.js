import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../LoginScreens/login';
import ForgetPassword from '../LoginScreens/forget_password';
import SignUp from '../LoginScreens/SignUp';
import Home from '../screens/home';
import StudentManager from '../screens/studentManager';
import NewClass from '../screens/createNew';
import AddStudent from '../screens/addStudent';

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="Forget" component={ForgetPassword} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name='StudentManager' component={StudentManager}/>
			<Stack.Screen name='NewClass' component={NewClass}/>
			<Stack.Screen name='AddStudent' component={AddStudent}/>
			
		</Stack.Navigator>
	);
}

export default StackNavigator;