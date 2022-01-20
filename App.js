import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
const API_KEY = "cdb76bb3cdc25615affd8f2d5b9bee3a";

import Weather from "./components/Weather";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      getWeather()
      console.log("weather:", weather)
    }
  }, [location]);





  async function getWeather() {
    console.log("getWeather called")
    console.log("lat,long", location.coords.latitude, location.coords.longitude)
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`;
    console.log("API_URL", API_URL)
    try {
      const response = await fetch(API_URL);
      if (response.status == 200) {

        const data = await response.json();
        setWeather(data);
        console.log("response 200", data)
      } else {
        console.log("response not 200")
        setWeather(null);
        setErrorMsg('Fetching Weather Data Failed')
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMsg(e);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator} size={36} />
      </View>
    )
  }
  else if (weather === null) {
    return (
      <View style={styles.container}><Text>Loading Failed</Text></View>
    )
  }

    return (
      <View style={styles.container}>
             <Weather weather={weather} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

  });
