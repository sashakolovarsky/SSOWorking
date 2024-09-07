import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        options={{ title: "Login" }} 
      />
      <Stack.Screen 
        name="HomeScreen" 
        options={{ title: "Home" }} 
      />
      <Stack.Screen 
        name="PickerScreen" 
        options={{ title: "Picker" }} 
      />
      <Stack.Screen 
        name="SliderScreen" 
        options={{ title: "Slider" }} 
      />
      <Stack.Screen 
        name="ThankYouScreen" 
        options={{ title: "Thank You" }} 
      />
    </Stack>
  );
}
