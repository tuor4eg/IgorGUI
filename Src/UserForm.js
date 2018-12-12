/**
 * Edit selected user
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

import {userRoles} from './const.js';

export default class StudentForm extends Component {
    askBeforeDelete = (id) => {
        Alert.alert(
          'Удалить пользователя',
          'Точно удалить?',
          [
            {text: 'Да', onPress: () => this.props.deleteUser(id)},
            {text: 'Отмена'}
          ]
        )
      }
    
    render () {
        const pick = userRoles.roles.map((item, index) => <Picker.Item 
        style={styles.container}
        label={userRoles.roleLabels[index]} 
        value={item} 
        backgroundColor='pink' 
        key={item.toString()}/>);

        const {id, name, login, role} = this.props.tmp;
        return(
        <View style={styles.wrapper}>
            <View style={styles.title}>
                <Text>Изменить пользователя</Text>
            </View>
            <View style={styles.top}>
                <Text>Имя</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                value={name}
                style={styles.container}
                onChangeText={(text) => this.props.onEnterField(text, 'name')} />
            </View>
            <View style={styles.top}>
                <Text>Логин</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                value={login}
                style={styles.container}
                onChangeText={(text) => this.props.onEnterField(text, 'login')} />
            </View>
            <View style={styles.top}>
                <Text>Роль</Text>
            </View>
            <View style={styles.container}>
                    <Picker
                    style={{ width: 250 }}
                    selectedValue={this.props.tmp.role}
                    onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'role')}>
                    {pick}
                    </Picker>
            </View>
            <View style={styles.top}>
                <Text>Пароль</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                secureTextEntry={true} 
                placeholder='********' 
                style={styles.container}
                onChangeText={(text) => this.props.onEnterField(text, 'openPassword')} />
            </View>
            <Button 
            onPress={() => this.props.editUser()}
            title="Сохранить"/>
            <Button 
            onPress={() => this.askBeforeDelete(id)}
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