/**
 * Edit selected user
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, Alert, TouchableHighlight, Image, Picker, DatePickerAndroid, TimePickerAndroid } from 'react-native';

import {styles} from './styles.js';

export default class TrainingForm extends Component {
    askBeforeDelete = (id) => {
        Alert.alert(
          'Отменить занятие',
          'Точно отменить?',
          [
            {text: 'Да', onPress: () => this.props.cancelTraining(id)},
            {text: 'Отмена'}
          ]
        )
    }

    map = digit => digit.toString().length >= 2 ? digit : `0${digit}`;

    formatDateAndTime = () => {
        const date = this.props.tmp.date;
        const today = new Date();
        const formatDateToday = `${this.map(today.getDate())}.${this.map(today.getMonth() + 1)}.${today.getFullYear()}`;
        const formatTimeToday = `${this.map(today.getHours())}:${this.map(today.getMinutes())}`;
        if (date) {
            return `${this.map(date.getDate())}.${this.map(date.getMonth() + 1)}.${this.map(date.getFullYear())} ${this.map(date.getHours())}:${this.map(date.getMinutes())}`;
        }
        return `${formatDateToday} ${formatTimeToday}`;
    }

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date(year, month, day);
                this.showAndroidTimePicker(date);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    showAndroidTimePicker = async (date) => {
        const today = new Date();
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: today.getHours(),
              minute: today.getMinutes(),
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

    renderTrainerPicker() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.id} key={item.id.toString()}/>);
        return pick;
    }

    renderGroupPicker() {
        const groupList = this.props.groupList;
        const pick = groupList.map(item => <Picker.Item label={item.groups_name} value={item.groups_id} key={item.groups_id.toString()}/>);
        return pick;
    }

    checkTitle = () => this.props.tmp.id === 'new' ? 'Добавить занятие' : 'Изменить занятие';

    checkAction = () => this.props.tmp.id === 'new' ? () => this.props.addTraining() : () => this.props.editTraining();

    checkForDelete = () => {
        if (this.props.tmp.id === 'new') {
            return null;
        }
        return(
            <TouchableHighlight
            style={{paddingRight: 16}}
            onPress={() => this.askBeforeDelete(this.props.tmp.id)}
            >
                <Image 
                source={require('./images/ic_action_delete.png')}
                />
            </TouchableHighlight>
        );
    }
    
    render() {
        return(
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableHighlight
                    style={{paddingLeft: 16, paddingRight: 24}}
                        onPress={() => this.props.cancelAddTraining()}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}/>
                    </TouchableHighlight>
                    <Text style={styles.titleText}>{this.checkTitle()}</Text>
                    <TouchableHighlight
                    style={{paddingRight: 16}}
                    onPress={this.checkAction()}
                    >
                        <Image 
                        source={require('./images/ic_action_check.png')}
                        />
                    </TouchableHighlight>
                    {this.checkForDelete()}
                </View>
                <View style={styles.card}>
                    <View style={{ paddingTop: 16, paddingHorizontal: 16}}>
                        <Image source={require('./images/ic_action_directions_run_train.png')} />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={[styles.textInputField, {flexDirection: 'row'}]}>
                            <Text style={[styles.textInput, {flex: 1, paddingVertical: 16}]}>{this.formatDateAndTime()}</Text>
                            <TouchableHighlight
                            onPress={() =>this.showAndroidDatePicker()}>
                                <Image
                                source={require('./images/ic_action_access_time.png')}
                                />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.textInputLabel}>Время и дата</Text>
                        <View style={styles.textInputField}>
                            <View style={styles.picker}>
                            <Picker
                            style={{width: '100%'}}
                            selectedValue={this.props.tmp.groupId}
                            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')}
                            keyExtractor={(item, index) => index.toString()}
                            >
                            {this.renderGroupPicker()}
                            </Picker>
                            </View>
                        </View>
                        <Text style={styles.textInputLabel}>Группа</Text>
                        <View style={styles.textInputField}>
                            <View style={styles.picker}>
                            <Picker
                            style={{width: '100%'}}
                            selectedValue={this.props.tmp.trainerId}
                            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}
                            keyExtractor={(item, index) => index.toString()}
                            >
                            {this.renderTrainerPicker()}
                            </Picker>
                            </View>
                        </View>
                        <Text style={styles.textInputLabel}>Тренер</Text>
                    </View>
                </View>
            </View>
        );
    }
}