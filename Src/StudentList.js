/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, TouchableOpacity, Text, View, Modal, TextInput, TouchableHighlight, FlatList, Alert, Image } from 'react-native';

import {styles} from './styles.js';
import {menuButtonsList} from './const.js';

export default class StudentList extends Component {
    askBeforeDelete = (id) => {
        Alert.alert(
          'Удалить группу',
          'Точно удалить?',
          [
            {text: 'Да', onPress: () => this.props.deleteGroup(id)},
            {text: 'Отмена'}
          ]
        )
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
                    <TouchableOpacity
                    style={{paddingLeft: 16, paddingRight: 24}}
                        onPress={() => this.props.onPressMenu(menuButtonsList.button2)}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Участники группы</Text>
                    <TouchableHighlight
                    style={{paddingRight: 24}}
                    onPress={() => this.props.onPressEditGroup(this.props.groupId)}
                    >
                        <Image 
                        source={require('./images/ic_action_mode_edit.png')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={{paddingRight: 16}}
                    onPress={() => this.askBeforeDelete(this.props.groupId)}
                    >
                        <Image 
                        source={require('./images/ic_action_delete.png')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={{paddingRight: 16}}
                    onPress={() => this.props.onPressAddStudent(this.props.groupId)}
                    >
                        <Image 
                        source={require('./images/ic_action_person_add.png')}
                        />
                    </TouchableHighlight>
                </View>
                <View>
                    <FlatList
                    style={{height: '90%'}}
                    data={this.props.studentList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressStudent(item.id, item.name, this.props.groupId)}>
                        <View style={styles.container}>
                            <View style={{paddingLeft: 16, paddingRight: 24}}>
                                <Image
                                source={require('./images/ic_action_account_circle.png')}
                                />
                            </View>
                            <Text style={styles.cellText}>{item.name}</Text>
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