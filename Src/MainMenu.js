/**
 * Main bottom menu
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';

import * as consts from './const';

import home from './images/ic_action_home.png';
import homeSelected from './images/ic_action_home_sel.png';
import groups from './images/ic_action_people.png';
import groupsSelected from './images/ic_action_people_sel.png';
import users from './images/ic_action_person_main_menu.png';
import usersSelected from './images/ic_action_person_main_menu_sel.png';
import settings from './images/ic_action_settings.png';
import settingsSelected from './images/ic_action_settings_sel.png';

const menu = consts.menuButtonsList;
const { colors } = consts;

export default class MainMenu extends Component {
  getPressedButton = button => (this.props.button === button ? [styles.button, styles.tab] : styles.button);

  getTextColor = button => (this.props.button === button ? [styles.buttonText, styles.textTab] : styles.buttonText);

  render() {
    const pic1 = menu.button1 === this.props.button ? homeSelected : home;
    const pic2 = menu.button2 === this.props.button ? groupsSelected : groups;
    const pic3 = menu.button3 === this.props.button ? usersSelected : users;
    const pic4 = menu.button4 === this.props.button ? settingsSelected : settings;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={this.getPressedButton(menu.button1)}
          onPress={() => this.props.onPressMenu(menu.button1)}
        >
          <View style={styles.inner}>
            <Image source={pic1} />
            <Text style={this.getTextColor(menu.button1)}>{menu.button1}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.getPressedButton(menu.button2)}
          onPress={() => this.props.onPressMenu(menu.button2)}
        >
          <View style={styles.inner}>
            <Image source={pic2} />
            <Text style={this.getTextColor(menu.button2)}>{menu.button2}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.getPressedButton(menu.button3)}
          onPress={() => this.props.onPressMenu(menu.button3)}
        >
          <View style={styles.inner}>
            <Image source={pic3} />
            <Text style={this.getTextColor(menu.button3)}>{menu.button3}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.getPressedButton(menu.button4)}
          onPress={() => this.props.onPressMenu(menu.button4)}
        >
          <View style={styles.inner}>
            <Image source={pic4} />
            <Text style={this.getTextColor(menu.button4)}>{menu.button4}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    // flex: 1
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 72,
    backgroundColor: colors.grey,
  },
  button: {
    flex: 1,
    height: 72,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  inner: {
    // flex: 1,
    paddingTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.grey,
  },
  tab: {
    height: 70,
  },
  textTab: {
    color: colors.orange,
  },
});
