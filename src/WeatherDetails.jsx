import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import Toast from "react-native-toast-message";
import backGround from '../assets/backGround.jpg'

const WeatherDetail = ({ route }) => {
    const { city } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        const apiKey = 'aad7df59a6e513b8ee44dc47a57c2e15';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const getWeatherIcon = (temp) => {
        if (temp > 25) return '☀️';
        if (temp < 15) return '☁️';
        return '🌤️';
    };
    const showToast = () => {
        Toast.show({
            text1: 'Good Day!',
            visibilityTime: 3000,
            position: 'bottom',
        });
    };

    return (
        <ImageBackground
            source={backGround}
            style={styles.background}
        >
            <View style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        {weatherData && (
                            <View>
                                <Text style={styles.weatherText}>City: {city}</Text>
                                <Text style={styles.weatherText}>Temperature: {weatherData.main.temp} °C </Text>
                                <Text style={styles.icon}>
                                    {getWeatherIcon(weatherData.main.temp)}
                                </Text>
                                <Text style={styles.weatherText}>Condition: {weatherData.weather[0].description}</Text>
                            </View>
                        )}
                    </>
                )}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="what to say?" onPress={showToast} />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>
            </View>
        </ImageBackground>
    );
};
export default WeatherDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    weatherText: {
        fontSize: 18,
        marginVertical: 4,
        color: 'white'
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    icon: {
        fontSize: 36
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


