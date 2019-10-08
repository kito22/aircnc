import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

import api from '../services/axios';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState('');

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: {
          tech,
        },
      });
      setSpots(response.data);
    };

    loadSpots();
  }, [])

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empresas que usam <Text style={styles.textBold}>{tech}</Text></Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$ ${item.price}` : 'GRATUITO'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item._id)}>
              <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  text: {
    marginBottom: 10,
    color: '#444',
    fontSize: 20,
  },
  textBold: {
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    height: 120,
    width: 200,
    resizeMode: "cover",
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    color: "#444",
    marginTop: 10,
    fontWeight: "bold"
  },
  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5,
  },
  button: {
    height: 32,
    borderRadius: 3,
    backgroundColor: '#f05a5b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
})

export default withNavigation(SpotList);
