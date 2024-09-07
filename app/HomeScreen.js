import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const logo = require('../assets/images/DataRhythmLogo.jpg');

export default function HomeScreen({ navigation }) {
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = useState(false);

  const handleStartAnswering = () => {
    if (isQuestionnaireCompleted) {
      Alert.alert('You have already completed the questionnaire for today.');
    } else {
      navigation.navigate("Question1");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode='contain' />
      <Text style={styles.welcomeText}>Hello!</Text>
      <TouchableOpacity onPress={handleStartAnswering} style={isQuestionnaireCompleted ? styles.disabledButtonContainer : styles.buttonContainer}>
        <Text style={styles.buttonText}>Start Answering</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 20, 
  },
  welcomeText: {
    fontSize: 40,
    color: "white",
    marginBottom: 20,
  },
  logo: {
    width: 350,
    marginBottom: 10, 
  },
  buttonContainer: {
    backgroundColor: '#00B5B9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  disabledButtonContainer: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});