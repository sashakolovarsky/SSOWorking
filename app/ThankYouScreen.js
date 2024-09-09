import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThankYouScreen({ navigation, route }) {
  const { answers, userInfo } = route.params;

  useEffect(() => {
    const apiUrl = 'https://mta-questionnaire-3qlt4222pq-zf.a.run.app';
    console.log('Answers:', answers); // Log the answers to the console
    const fetchData = async () => {
      try {
        // 1. Fetch the list of questionnaires
        const questionnairesResponse = await fetch(`${apiUrl}/questionnaires`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userInfo.idToken}`,
            'Content-Type': 'application/json'
          }
        });
        const questionnairesData = await questionnairesResponse.json();

        // 2. Extract the IDs of the first three questionnaires
        const questionnaireIds = questionnairesData.data.slice(0, 3).map(q => q._id);

        // 3. Fetch questions for each questionnaire
        for (const questionnaireId of questionnaireIds) {
          const questionsResponse = await fetch(`${apiUrl}/questions/?questionnaire_id=${questionnaireId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userInfo.idToken}`,
              'Content-Type': 'application/json'
            }
          });
          const questionsData = await questionsResponse.json();
          
          // Extract the question_id from the first question
          const questionId = questionsData.data[0]._id;

          // 4. Send POST request with question_id and text answer
          const postResponse = await fetch(`${apiUrl}/questionnaires`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userInfo.idToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "questionnaire_id": questionnaireId,
              "answers": [
                {
                  "question_id": questionId,
                  "text": "7" // Your answer text here
                }
              ]
            })
          });

          const postResult = await postResponse.json();
          console.log('Post Response:', postResult);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    async function saveCompletionStatus() {
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      await AsyncStorage.setItem('questionnaireCompleted', currentDate);
    }
    saveCompletionStatus();
    fetchData();
  }, [answers]);

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank you, you completed the questionnaire for today!</Text>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  thankYouText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});