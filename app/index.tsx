import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen'; 
import PickerScreen from './PickerScreen'; 
import SliderScreen from './SliderScreen'; 
import ThankYouScreen from './ThankYouScreen'; 

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer independent={true}> 
        <Stack.Navigator initialRouteName="LoginScreen"> 
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Question1" component={PickerScreen} 
            initialParams={{ question: 'When did you go to sleep?',
            nextScreen: 'Question2',
            defaultHour: "22",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question2" component={PickerScreen}
            initialParams={{ question: 'When did you wake up?',
            nextScreen: 'Question3',
            defaultHour: "08",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question3" component={SliderScreen}
            initialParams={{ question: 'How good was your sleep?',
            nextScreen: 'Question4' }} />
        <Stack.Screen name="Question4" component={SliderScreen}
            initialParams={{ question: 'How do you feel now? Rate your mood.',
            nextScreen: 'Question5' }} />
        <Stack.Screen name="Question5" component={PickerScreen}
            initialParams={{ question: 'When was your first meal yesterday?',
            nextScreen: 'Question6',
            defaultHour: "09",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question6" component={PickerScreen}
            initialParams={{ question: 'When was your last meal yesterday?',
            nextScreen: 'ThankYou',
            defaultHour: "21",
            defaultMinute: "00" }} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
