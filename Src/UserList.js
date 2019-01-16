/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, TextInput, Modal, TouchableHighlight, FlatList, Picker, TouchableOpacity, Image } from 'react-native';

import {userRoles, colors} from './const.js';
import {styles} from './styles.js';

export default class UserList extends Component {
    addUserWithDefaultRole = () => {
        this.props.onEnterField('admin', 'role');
        this.props.onPressAddUser();
    }

    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
      };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, {paddingLeft: 72}]}>Список пользователей</Text>
                    <TouchableOpacity
                    style={{paddingRight: 16}}
                    onPress={() => this.addUserWithDefaultRole()}
                    >
                        <Image 
                        source={require('./images/ic_action_person_add.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                    style={{height: '85%'}}
                    data={this.props.userList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressUser(item.id)}>
                        <View style={[styles.container, {height: 72}]}>
                            <View style={{paddingLeft: 16, paddingRight: 24}}>
                                <Image
                                source={item.role === 'admin' ? require('./images/ic_action_perm_identity.png') : require('./images/ic_action_person.png')}
                                />
                            </View>
                            <View style={styles.twoLineCell}>
                                <Text style={[styles.cellText, {paddingTop: 16}]}>{item.name}</Text>
                                <Text style={styles.cellTextSecond}>{item.role}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </View>
        );
    }
}