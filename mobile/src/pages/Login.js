import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Image, StyleSheet, TextInput, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';

import api from '../services/axios'

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List')
      }
    })
  })

  async function handleSubmit() {
    const response = await api.post('/session', { email });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput style={styles.input}
          placeholder="Seu e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput style={styles.input}
          onChangeText={setTechs}
          placeholder="Tecnologias de interesse"
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor="#999" />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignSelf: 'stretch'
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  button: {
    height: 42,
    borderRadius: 3,
    backgroundColor: '#f05a5b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})

