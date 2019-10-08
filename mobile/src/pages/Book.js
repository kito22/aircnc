import React, { useState } from 'react';
import { Alert, AsyncStorage, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/axios'

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const spotId = navigation.getParam('id')

  async function handleSubmit() {
    try {
      const user_id = await AsyncStorage.getItem('user');

      if (!user_id) {
        Alert.alert('Problemas na validação do usuário, tente novamente');
        return;
      }

      if (!date || date.length < 6) {
        Alert.alert('Por favor, preencha a data corretamente');
        return;
      }

      await api.post(`/spot/${spotId}/booking`, { date },
        {
          headers: {
            user_id
          }
        })

      Alert.alert('Solicitação enviada com sucesso');
      navigation.navigate('List');
    } catch (error) {
      Alert.alert('Erro ao solicitar reserva, verifique os dados informados');
    }
  }

  function handleCancel() {
    navigation.navigate('List');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput style={styles.input}
        placeholder="Qual data você deseja reservar"
        autoCapitalize="words"
        autoCorrect={false}
        placeholderTextColor="#999"
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    marginTop: 30,
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
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})
