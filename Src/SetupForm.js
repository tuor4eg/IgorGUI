/**
 * Setup page
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight } from 'react-native';

import {styles} from './styles.js';

export default class SetupForm extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text>Setup Page. There will be something. Someday. Maybe.</Text>
                <Button 
                title="Выйти"
                onPress={() => this.props.onPressExit()}/>
            </View>
        );
    }
}
