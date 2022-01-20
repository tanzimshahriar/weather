import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weather }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(weather.weather[0].main));
    }, [weather])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Clear') return sunny
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        return haze;
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{weather.name}</Text>
                    <Text style={{ ...styles.subheaderText, color: textColor }}>{weather.weather[0].main}</Text>
                    <Text style={{ ...styles.subheaderTempText, color: textColor, fontWeight: 'bold' }}>{weather.main.temp} °C</Text>
                </View>

                

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{weather.main.humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{weather.wind.speed} m/s</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Max Temperature</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{weather.main.temp_max} °C</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Minimum Temperature</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{weather.main.temp_min} °C</Text>
                    </View>

               

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width,

    },
    headerText: {
        fontSize: 36,
        marginTop: 70,
    },
    subheaderText: {
        fontSize: 26,
        marginTop: 10,
    },
    subheaderTempText: {
        fontSize: 36,
        marginTop: 10,
    },

    info: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 10,
        justifyContent: 'center'
    }
})