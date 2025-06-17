// Pet Profile Card Component
import React from 'react';
import { View, Text, Image } from 'react-native';

const PetCard = ({ pet }) => (
  <View>
    <Image source={{ uri: pet.photoUrl }} />
    <Text>{pet.name} ({pet.breed})</Text>
    <Text>{pet.age} years old</Text>
    <Text>Looking for: {pet.intentions.join(', ')}</Text>
  </View>
);

export default PetCard;
