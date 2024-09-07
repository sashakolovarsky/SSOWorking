import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const logo = require('../assets/images/DataRhythmLogo.jpg');
const screenWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => { // Access navigation prop here
  const [isInProgress, setIsInProgress] = useState(false);
  const webClientId =
    "779578984133-io2iq9b2f8fif44i59vinhu92u95anon.apps.googleusercontent.com";

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  }, []);

  const googleLogin = async () => {
    try {
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // Save user sessionId and handle user info if needed

      // Navigate to HomeScreen upon successful login
      navigation.navigate('HomeScreen'); // Use navigation instead of router
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle cancellation
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Handle in-progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Handle play services not available
      } else {
        // Handle other errors
      }
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.welcomeText}>Welcome to DataRhythm!</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleLogin}
        disabled={isInProgress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
