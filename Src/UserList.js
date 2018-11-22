/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Modal, TouchableHighlight, FlatList, Picker } from 'react-native';

import {userRoles} from './const.js';

export default class UserList extends Component {
    renderSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "black",
            }}
          />
        );
      };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text>Список пользователей</Text>
                </View>
                <View style={styles.top}>
                    <Text>Пользователь</Text>
                    <Text>Роль</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.userList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressUser(item.id)}>
                        <View style={styles.container}>
                            <Text>{item.name}</Text>
                            <Text>{item.role}</Text>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                <Button
                onPress={() => this.props.onClickModal()}
                title="Добавить"
                />
                <AddUserModal 
                display={this.props.display} 
                onClickModal={this.props.onClickModal} 
                onEnterField={this.props.onEnterField} 
                tmp={this.props.tmp}
                addUser={this.props.addUser}
                title="Добавить пользователя"/>
            </View>
        );
    }
}

class AddUserModal extends Component {
    render() {
        const pick = userRoles.roles.map((item, index) => <Picker.Item 
            style={styles.container}
            label={userRoles.roleLabels[index]} 
            value={item} 
            backgroundColor='pink' 
            key={item.toString()}/>);
        return (
            <Modal visible={this.props.display} animationType = "slide" onRequestClose={ () => console.log('closed')} transparent={true}>
                <View style={styles.modalWrapper}>
                    <Text>Добавить пользователя</Text>
                    <Text>Имя:</Text>
                    <TextInput placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'userName')}/>
                    <Text>Роль:</Text>
                    <Picker
                    style={{ width: 150 }}
                    selectedValue={this.props.tmp.role}
                    onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'role')}>
                    {pick}
                    </Picker>
                    <Text>Логин:</Text>
                    <TextInput placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'login')}/>
                    <Text>Пароль:</Text>
                    <TextInput 
                    secureTextEntry={true} 
                    placeholder='password' 
                    onChangeText={(text) => this.props.onEnterField(text, 'openPassword')}/>
                    <Button 
                    onPress={() => this.props.addUser()}
                    title="Сохранить"
                    />
                    <Button 
                    onPress={() => this.props.onClickModal()}
                    title="Отмена"
                    />
                </View>
            </Modal>
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
    },
    modalWrapper: {
        //flex: 0.35,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'skyblue',
        marginTop: 150,
        opacity: 1,
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      }
});