/**
 * Edit selected student
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

export default class GroupForm extends Component {
    render () {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item 
            style={styles.container}
            label={item.name} 
            value={item.id} 
            backgroundColor='pink' 
            key={item.id.toString()}/>);
        return(
            <View style={styles.wrapper}>
            <View style={styles.title}>
                <Text>Изменить группу</Text>
            </View>
            <View style={styles.top}>
                <Text>Название</Text>
                <Text>Тренер</Text>
            </View>
            <View style={styles.container}>
                <TextInput value={this.props.tmp.groupName}
                style={styles.container}
                onChangeText={(text) => this.props.onEnterField(text, 'groupName')} />
                <Picker
                style={{ width: 150 }}
                selectedValue={this.props.tmp.trainerId}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}>
                    {pick}
                </Picker>
            </View>
            <Button 
            onPress={() => this.props.editGroup()}
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