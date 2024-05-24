import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../LoginScreens/login';
import ForgetPassword from '../LoginScreens/forget_password';
import SignUp from '../LoginScreens/SignUp';

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="Login" component={ForgetPassword} />
		</Stack.Navigator>
	);
}

export default StackNavigator;