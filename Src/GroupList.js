/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Picker, ScrollView, TouchableHighlight, FlatList, Modal } from 'react-native';

export default class GroupList extends Component {
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
                    <Text>Список групп</Text>
                </View>
                <View style={styles.top}>
                    <Text>Группа</Text>
                    <Text>Тренер</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.groupList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => console.log(item.groups_id)}>
                        <View style={styles.container}>
                            <Text>{item.groups_name}</Text>
                            <Text>{item.users_name}</Text>
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
                <AddGroupModal 
                display={this.props.display} 
                onClickModal={this.props.onClickModal} 
                onEnterField={this.props.onEnterField} 
                tmp={this.props.tmp}
                userList={this.props.userList}
                addGroup={this.props.addGroup}
                title="Добавить"/>
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
                <Text>Добавить группу</Text>
                <Text>Название:</Text>
                <TextInput placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
                <Text>Тренер:</Text>
                <Picker
                style={{ width: 200 }}
                selectedValue={!this.props.tmp.groupTrainer ? 'Ololo' : this.props.tmp.groupTrainer.name}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(this.getTrainerId(userList, itemValue)[0], 'groupTrainer')}
                keyExtractor={(item, index) => index.toString()}
                >
                {pick}
                </Picker>
                <Button 
                onPress={() => this.props.addGroup()}
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
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'skyblue',
        marginTop: 150,
        opacity: 1,
        //width: 400,
        //height: 400
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      }
});