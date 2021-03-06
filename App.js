import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen';
import Chat from './components/Chat';
import CustomActions from './components/CustomActions';


const Stack = createStackNavigator();

export default class App extends Component {

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
        >
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}