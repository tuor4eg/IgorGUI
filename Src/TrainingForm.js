/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Modal, Picker, TouchableHighlight, FlatList, KeyboardAvoidingView, Alert } from 'react-native';

export default class TrainingForm extends Component {
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
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.name} backgroundColor='pink' key={item.id.toString()}/>);
        return (
            <View style={styles.wrapper}>
            <KeyboardAvoidingView behavior='position' enabled>
                <View style={styles.title}>
                    <Text>Тренировка группы {this.props.tmp.groupName} {this.props.tmp.date} {this.props.tmp.time}</Text>
                </View>
                <View style={styles.top}>
                    <Text>ФИО участника</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.studentList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => console.log('lol')}>
                        <View style={styles.container}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                <View style={styles.top}>
                    <Text>Тренер</Text>
                    <Picker
                    style={{ width: 200 }}
                    selectedValue={!this.props.tmp.trainerId ? 'Ololo' : this.props.tmp.trainerId}
                    onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}
                    keyExtractor={(item, index) => index.toString()}
                    >
                    {pick}
                    </Picker>
                </View>
                <Button
                onPress={() => console.log('change')}
                title="Сохранить изменения"
                />
                <Button
                onPress={() => console.log('cancel')}
                title="Отменить тренировку"
                />
                </KeyboardAvoidingView>
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
        alignItems: 'center',
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
        flex: 0.35,
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