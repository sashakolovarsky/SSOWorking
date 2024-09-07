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
import login from "../Utils/Auth";

const logo = require('../assets/images/DataRhythmLogo.jpg');
const screenWidth = Dimensions.get("window").width;

const LoginScreen = ({  }) => {
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
      console.log(userInfo)
      // Save user sessionId
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
    backgroundColor: "#000000",  // Set screen background color to black
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,  // Add padding to prevent text from going off-screen
  },
  logo: {
    width: screenWidth * 0.5,  // Adjusted logo size to be responsive
    height: screenWidth * 0.5, // Make sure the logo is square
    marginBottom: 30,  // Adjust margin to move the logo up
  },
  welcomeText: {
    fontSize: 24,  // Reduced the font size for better fit
    fontWeight: "bold",  // Make the text bold
    color: "#FFFFFF",  // Set text color to white
    marginBottom: 20,  // Space between the welcome text and the Google Sign-In button
    textAlign: "center",  // Center the text
  },
});

export default LoginScreen;
