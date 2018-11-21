/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Modal, TextInput, TouchableHighlight, FlatList, KeyboardAvoidingView } from 'react-native';

export default class StudentList extends Component {
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
            <KeyboardAvoidingView behavior='position' enabled>
                <View style={styles.title}>
                    <Text>Участники группы</Text>
                </View>
                <View style={styles.top}>
                    <Text>ФИО</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.studentList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressStudent(item.id, item.name)}>
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
                <Button
                onPress={() => this.props.onClickModal()}
                title="Добавить участника"
                />
                <AddStudentModal 
                display={this.props.display} 
                onClickModal={this.props.onClickModal} 
                onEnterField={this.props.onEnterField} 
                tmp={this.props.tmp}
                addStudent={this.props.addStudent}
                id={this.props.id}
                title="Добавить участника"/>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

class AddStudentModal extends Component {
    render() {
        return (
            <Modal visible={this.props.display} animationType = "slide" onRequestClose={ () => console.log('closed')} transparent={true}>
                <View style={styles.modalWrapper}>
                    <Text>Добавить участника</Text>
                    <Text>ФИО:</Text>
                    <TextInput placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'studentName')}/>
                    <Button 
                    onPress={() => this.props.addStudent(this.props.id)}
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