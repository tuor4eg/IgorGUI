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
        //const pick = groupList.map(item => <Picker.Item label={item.name} value={item.name} backgroundColor='pink' key={item.id.toString()}/>);
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
                <TextInput value='olol'
                onChangeText={(text) => this.props.onEnterField(text, 'studentName')}/>
                <Picker
                selectedValue='Ololo'
                onValueChange={() => console.log(kek)}>
                    
                </Picker>
            </View>
            <Button 
            onPress={() => this.props.onClickModal()}
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'powderblue',
    }
});