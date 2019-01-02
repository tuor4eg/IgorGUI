/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Picker, ScrollView, TouchableHighlight, FlatList, Modal, TouchableOpacity, Image } from 'react-native';

import {colors} from './const.js';

export default class GroupList extends Component {
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
                    <Text style={styles.titleText}>Список групп</Text>
                </View>
                <View style={styles.top}>
                    <Text style={styles.topText}>Группа</Text>
                    <Text style={styles.topText}>Тренер</Text>
                </View>
                <View>
                    <FlatList
                    style={{height: '80%'}}
                    data={this.props.groupList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressGroup(item.groups_id)}>
                        <View style={styles.container}>
                            <View style={styles.cell}><Text style={styles.cellText}>{item.groups_name}</Text></View>
                            <View style={styles.cell}><Text style={styles.cellText}>{item.users_name}</Text></View>
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
                    onPress={() => this.props.onClickModal()}
                    >
                    <Image 
                    source={require('./images/ic_action_control_point.png')}
                    />
                    </TouchableOpacity>
                </View>
                <AddGroupModal 
                display={this.props.display} 
                onClickModal={this.props.onClickModal} 
                onEnterField={this.props.onEnterField} 
                tmp={this.props.tmp}
                userList={this.props.userList}
                addGroup={this.props.addGroup}
                title="Добавить группу"/>
            </View>
        );
    }
}

class AddGroupModal extends Component {
    getTrainerId = (array, name) => array.filter(item => item.name === name);

    render() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.name} backgroundColor='pink' key={item.id.toString()}/>);
        return (
        <Modal visible={this.props.display} animationType = "slide" onRequestClose={ () => console.log('closed')} transparent={true}>
            <View style={styles.modalWrapper}>
                <Text style={styles.titleText}>Добавить группу</Text>
                <Text style={styles.titleText}>Название:</Text>
                <TextInput style={styles.cellText} placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
                <Text style={styles.titleText}>Тренер:</Text>
                <Picker
                style={{ width: 200 }}
                selectedValue={!this.props.tmp.groupTrainer ? 'Ololo' : this.props.tmp.groupTrainer.name}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(this.getTrainerId(userList, itemValue)[0], 'groupTrainer')}
                keyExtractor={(item, index) => index.toString()}
                >
                {pick}
                </Picker>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around'}}>
                    <TouchableHighlight
                    onPress={() => this.props.addGroup()}
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
});