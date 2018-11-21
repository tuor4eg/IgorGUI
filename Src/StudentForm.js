/**
 * Edit selected student
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

export default class StudentForm extends Component {
    askBeforeDelete = (id) => {
        Alert.alert(
          'Удалить участника',
          'Точно удалить?',
          [
            {text: 'Да', onPress: () => this.props.deleteStudent(id)},
            {text: 'Отмена'}
          ]
        )
      }
    
    render () {
        const groupList = this.props.groupList;
        const pick = groupList.map(item => <Picker.Item 
            style={styles.container}
            label={item.groups_name} 
            value={item.groups_id} 
            backgroundColor='pink' 
            key={item.groups_id.toString()}/>);
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
                selectedValue={this.props.tmp.groupId}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')}>
                    {pick}
                </Picker>
            </View>
            <Button 
            onPress={() => this.props.editStudent(this.props.studentId)}
            title="Сохранить"/>
            <Button 
            onPress={() => this.askBeforeDelete(this.props.studentId)}
            title="Удалить"/>
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