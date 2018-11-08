/**
 * Main bottom menu
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight } from 'react-native';

export default class MainMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={() => this.props.onPressMenu('home')}>
                    <Text>Home</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu('groups')}>
                    <Text>Groups</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu('users')}>
                    <Text>Users</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu('set')}>
                    <Text>Set</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        //flex: 1
    },
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'skyblue',
    },
    button: {
        flex: 1,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    }
});