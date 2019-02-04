/**
 * Create new user
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Text, View, Alert, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

import {styles} from './styles.js';
import {userRoles} from './const.js';

export default class UserFormCreate extends Component {
    getTrainerId = (array, name) => array.filter(item => item.name === name);

    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
    };

    render() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.name} backgroundColor='pink' key={item.id.toString()}/>);
        return(
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableHighlight
                    style={{paddingLeft: 16, paddingRight: 24}}
                        onPress={() => this.props.cancelAddUser()}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}/>
                    </TouchableHighlight>
                    <Text style={styles.titleText}>Добавить пользователя</Text>
                </View>
                <View>
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
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}}>
                    <TouchableHighlight
                    style={[styles.button, {width: '30%'}]}
                    onPress={() => this.props.addUser()}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
