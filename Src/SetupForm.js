/**
 * Setup page
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight } from 'react-native';

export default class SetupForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Setup Page. There will be something. Someday. Maybe.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    }
});