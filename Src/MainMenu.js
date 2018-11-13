/**
 * Main bottom menu
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight } from 'react-native';

import * as consts from './const.js'

const menu = consts.menuButtonsList;

export default class MainMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={() => this.props.onPressMenu(menu.button1)}>
                    <Text>{menu.button1}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu(menu.button2)}>
                    <Text>{menu.button2}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu(menu.button3)}>
                    <Text>{menu.button3}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}  onPress={() => this.props.onPressMenu(menu.button4)}>
                    <Text>{menu.button4}</Text>
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