import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { ImageBackground } from 'react-native';
import backGround from '../assets/backGround.jpg'
import { FontAwesome } from '@expo/vector-icons';

const WeatherSearch = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${query}&appid=aad7df59a6e513b8ee44dc47a57c2e15`);
        setSuggestions(response.data.list.map(item => item.name));
      } catch (err) {
        setError('Error fetching suggestions');
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCityChange = (text) => {
    setCity(text);
    fetchSuggestions(text);
  };

  const handleSearch = () => {
    navigation.navigate('WeatherDetail', { city });
  };

  const handlePress = () => {
    alert('Button Pressed!');
  };

  return (
    <ImageBackground
      source={backGround}
      style={styles.background}
    >
      <View style={styles.lineIcon}>
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
        <FontAwesome style={styles.icon} name="snowflake-o" size={30} color="white" />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={handleCityChange}
          autoCapitalize="none"
          keyboardType="default"
        />
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCityChange(item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Image
          source={require('../assets/myImage.jpg')}
          style={styles.image}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Press me</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>

  );
};
export default WeatherSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  weatherText: {
    fontSize: 18,
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  suggestionText: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 5,
  },
  lineIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 100,
    borderRadius: 20,
    elevation: 5,
  },
});