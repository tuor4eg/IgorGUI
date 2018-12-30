/**
 * Form to authorize in application
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Button, StyleSheet, TextInput, Text, View, TouchableHighlight} from 'react-native';

import {colors} from './const.js'

export default class AuthForm extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{ height: '50%'}}><Image
                style={styles.logo}
                source={require('./images/logo_demi_mini.png')}
                resizeMode="contain"
                />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Авторизация</Text>
                </View>
                <View style={styles.container}>
                    <Text>Имя пользователя:</Text>
                        <TextInput 
                        style={styles.inputField} 
                        placeholder='login' 
                        onChangeText={(text) => this.props.onEnterField(text, 'login')}/>
                </View>
                <View style={styles.container}>
                    <Text>Пароль:</Text>
                    <TextInput 
                    style={styles.inputField} 
                    secureTextEntry={true} 
                    placeholder='password' 
                    onChangeText={(text) => this.props.onEnterField(text, 'pass')}/>
                </View>
                <TouchableHighlight
                style={styles.button}
                onPress={() => this.props.loginUser()}
                >
                <Text style={styles.buttonText}>Войти</Text>
                </TouchableHighlight>
                <Text>Powered by Tuor4eg 2018</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orange
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#404040',
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputField: {
   
    },
    logo: {
        flex: 1,
    },
    button: {
        height: '10%',
        width: '50%',
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
    });