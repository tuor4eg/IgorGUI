/**
 * Edit selected student
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Modal, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

export default class StudentForm extends Component {
    render () {
        const groupList = this.props.groupList;
        const getGroup = groupList.filter(item => item.groups_id === this.props.tmp.groupId)[0];
        console.log(getGroup.groups_name);
        const pick = groupList.map(item => <Picker.Item 
            style={styles.container}
            label={item.groups_name} 
            value={item.groups_id} 
            backgroundColor='pink' 
            key={item.groups_id.toString()}/>);
        console.log(this.props.tmp);
        return(
        <View style={styles.wrapper}>
            <View style={styles.title}>
                <Text>Изменить участника</Text>
            </View>
            <View style={styles.top}>
                <Text>ФИО</Text>
                <Text>Группа</Text>
            </View>
            <View style={styles.container}>
                <TextInput value={this.props.tmp.studentName}
                style={styles.container}
                onChangeText={(text) => this.props.onEnterField(text, 'studentName')} />
                <Picker
                style={{ width: 150 }}
                selectedValue={getGroup.groups_name}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')}>
                    {pick}
                </Picker>
            </View>
            <Button 
            onPress={() => this.props.editStudent(this.props.studentId)}
            title="Сохранить"/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        flex: 1
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'pink'
    },
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'powderblue',
    }
});