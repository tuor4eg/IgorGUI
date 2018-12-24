/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, 
    View, DatePickerAndroid, Picker, 
    TouchableHighlight, FlatList, 
    KeyboardAvoidingView, Alert, 
    TextInput, TimePickerAndroid, Modal } from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class TrainingForm extends Component {
    map = digit => digit.toString().length >= 2 ? digit : `0${digit}`;

    getFormatDate = (date) => `${this.map(date.getHours())}:${this.map(date.getMinutes())}`;

    changeUser = (id) => {
        this.props.onEnterField(id, 'trainerId');
        const [getTrainer] = this.props.userList.filter(item => item.id === id);
        this.props.onEnterField(getTrainer.name, 'trainerName');
    }

    askBeforeCancel = (id) => {
        Alert.alert(
          'Отменить тренировку',
          'Точно отменить?',
          [
            {text: 'Да', onPress: () => this.props.cancelTraining(id)},
            {text: 'Отмена'}
          ]
        )
      }

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

    showAndroidDatePicker = async (currentDate) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: currentDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date(year, month, day);
                this.showAndroidTimePicker(date, currentDate);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    showAndroidTimePicker = async (date, oldDate) => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: oldDate.getHours(),
              minute: oldDate.getMinutes(),
              is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const dateWithTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
                this.props.onEnterField(dateWithTime, 'date');
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }

    render() {
        const tmp = this.props.tmp;
        const userList = this.props.userList;
        const cashflows = this.props.cashflows;
        const dateToString = `${tmp.date.getDate()}.${tmp.date.getMonth() + 1}.${tmp.date.getFullYear()}`;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.id} backgroundColor='pink' key={item.id.toString()}/>);
        return (
            <View style={styles.wrapper}>
            <KeyboardAvoidingView behavior='position' enabled>
                <View style={styles.title}>
                    <Text>Тренировка группы {tmp.groupName} {dateToString} {this.getFormatDate(tmp.date)}</Text>
                </View>
                <View style={styles.top}>
                    <View style={styles.cell}><Text>Отметка</Text></View>
                    <View style={styles.cell}><Text>ФИО участника</Text></View>
                    <View style={styles.cell}><Text>Сумма</Text></View>
                    <View style={styles.cell}><Text>Примечание</Text></View>
                </View>
                <View>
                    <FlatList
                    style={styles.scrolling}
                    data={cashflows}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onClickModal()}>
                        <View style={styles.container}>
                            <View style={styles.cell}>
                                <CheckBox
                                label=''
                                checked={!item.checkbox ? false : item.checkbox === 0 ? false : true}
                                onChange={(checked) => this.prepareToUpdate({students_id: item.id, checkbox: checked}, 'cashflows')}
                                />
                            </View>
                            <View style={styles.cell}><Text>{item.name}</Text></View>
                            <View style={styles.cell}>
                                <TextInput 
                                value={item.sum ? item.sum.toString() : '0'}
                                onChangeText={(text) => console.log('lol')} 
                                />
                            </View>
                            <View style={styles.cell}>
                                <Text>...</Text>
                            </View>
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
                    onValueChange={(itemValue, itemIndex) => this.changeUser(itemValue)}
                    keyExtractor={(item, index) => index.toString()}
                    >
                    {pick}
                    </Picker>
                </View>
                <Button
                    onPress={() => this.showAndroidDatePicker(tmp.date)}
                    title="Изменить дату и время"
                />
                <Button
                    onPress={() => this.props.editTraining()}
                    title="Сохранить изменения"
                />
                <Button
                    onPress={() => this.askBeforeCancel(this.props.tmp.id)}
                    title="Отменить тренировку"
                />
                <AddNoticeModal 
                display={this.props.display}
                onClickModal={this.props.onClickModal}
                onEnterField={this.props.onEnterField}
                />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

class AddNoticeModal extends Component {
    render() {
        return (
            <Modal visible={this.props.display} animationType = "slide" onRequestClose={ () => console.log('closed')} transparent={true}>
                <View style={styles.modalWrapper}>
                    <Text>Добавить примечание</Text>
                    <TextInput placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'studentName')}/>
                    <Button 
                    onPress={() => console.log('ok')}
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
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'powderblue',
    },
    cell: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    scrolling: {
        height: '65%'
    },
});