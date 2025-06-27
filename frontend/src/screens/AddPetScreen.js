import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPetScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [intentions, setIntentions] = useState('playdate');

  const handleAddPet = async () => {
    if (!name || !breed || !age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://10.0.2.2:5000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          species,
          breed,
          age: parseInt(age),
          intentions: [intentions],
          vaccinated: true,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', `${name} has been added to your profile!`);
        navigation.navigate('browse');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Your Pet 🐾</Text>

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="What's your pet's name?"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Species</Text>
      <View style={styles.speciesContainer}>
        {['Dog', 'Cat', 'Bird', 'Other'].map((spec) => (
          <TouchableOpacity
            key={spec}
            style={[styles.speciesButton, species === spec && styles.selectedSpecies]}
            onPress={() => setSpecies(spec)}
          >
            <Text style={[styles.speciesText, species === spec && styles.selectedSpeciesText]}>
              {spec}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="What breed?"
        value={breed}
        onChangeText={setBreed}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age in years"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Looking for:</Text>
      <View style={styles.intentionContainer}>
        {['playdate', 'mating', 'adoption'].map((intent) => (
          <TouchableOpacity
            key={intent}
            style={[styles.intentionButton, intentions === intent && styles.selectedIntention]}
            onPress={() => setIntentions(intent)}
          >
            <Text style={[styles.intentionText, intentions === intent && styles.selectedIntentionText]}>
              {intent.charAt(0).toUpperCase() + intent.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddPet}>
        <Text style={styles.buttonText}>Add {name || 'Pet'} 🎉</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  speciesContainer: { flexDirection: 'row', marginBottom: 20 },
  speciesButton: {
    flex: 1,
    padding: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  selectedSpecies: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  speciesText: { textAlign: 'center', color: '#333' },
  selectedSpeciesText: { color: 'white' },
  intentionContainer: { flexDirection: 'row', marginBottom: 20 },
  intentionButton: {
    flex: 1,
    padding: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  selectedIntention: { backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' },
  intentionText: { textAlign: 'center', fontSize: 12, color: '#333' },
  selectedIntentionText: { color: 'white' },
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default AddPetScreen;
