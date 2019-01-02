/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Modal, TouchableHighlight, FlatList, Picker, TouchableOpacity, Image } from 'react-native';

import {userRoles, colors} from './const.js';

export default class UserList extends Component {
    addUserWithDefaultRole = () => {
        this.props.onEnterField('admin', 'role');
        this.props.onClickModal();
    }

    renderSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: "90%",
                backgroundColor: colors.grey,
                marginLeft: '5%'
            }}
          />
        );
      };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Список пользователей</Text>
                </View>
                <View style={styles.top}>
                    <View style={styles.cell}><Text style={styles.topText}>Пользователь</Text></View>
                    <View style={styles.cell}><Text style={styles.topText}>Роль</Text></View>
                </View>
                <View>
                    <FlatList
                    style={{height: '80%'}}
                    data={this.props.userList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressUser(item.id)}>
                        <View style={styles.container}>
                        <View style={styles.cell}><Text style={styles.cellText}>{item.name}</Text></View>
                        <View style={styles.cell}><Text style={styles.cellText}>{item.role}</Text></View>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                    <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacityStyle}
                    onPress={() => this.addUserWithDefaultRole()}
                    >
                    <Image 
                    source={require('./images/ic_action_control_point.png')}
                    />
                    </TouchableOpacity>
                </View>
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
                    <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around'}}>
                        <TouchableHighlight
                        onPress={() => this.props.addUser()}
                        >
                        <Image 
                        source={require('./images/ic_action_check_circle_outline.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight
                        onPress={() =>this.props.onClickModal()}
                        >
                        <Image 
                        source={require('./images/ic_action_highlight_off.png')}/>
                        </TouchableHighlight>
                    </View>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.orange,
        height: 50
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 30
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cell: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    cellText: {
        fontSize: 16,
        color: colors.grey,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: colors.grey,
        marginTop: 80,
        marginLeft: '10%',
        width: '80%',
        height: '60%'
    },
    titleText: {
        fontSize: 18,
        color: colors.grey,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    topText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TouchableOpacityStyle:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
      },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      }
});