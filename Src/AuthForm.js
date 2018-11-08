/**
 * Form to authorize in application
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Button, StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';

export default class AuthForm extends Component {
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='never'>
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text>Авторизация</Text>
                </View>
                <View style={styles.container}>
                    <Text>Имя пользователя:</Text>
                    <TextInput placeholder='login' onChangeText={(text) => this.props.onEnterAuth(text, 'login')}/>
                </View>
                <View style={styles.container}>
                    <Text>Пароль:</Text>
                    <TextInput secureTextEntry={true} placeholder='password' onChangeText={(text) => this.props.onEnterAuth(text, 'pass')}/>
                </View>
                <Button
                onPress={() => this.props.loginUser()}
                title="Войти"
                />
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'powderblue',
        flexDirection: 'row'
      },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
    });