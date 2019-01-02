/**
 * Main application's page
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, DatePickerAndroid, FlatList, 
    TouchableHighlight, TouchableOpacity, TimePickerAndroid, Modal, Picker, Image } from 'react-native';

import CalendarForm from './Calendar.js';
import {colors} from './const.js';

export default class HomePage extends Component {
    map = digit => digit.toString().length >= 2 ? digit : `0${digit}`;

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

    getFormatDate = (date) => `${this.map(date.getHours())}:${this.map(date.getMinutes())}`;

    getDataFromServer = async () => {
        await this.props.getUserList();
        await this.props.getGroupList();
        this.props.onClickModal();
    }

    prepareCalendar = async () => {
        await this.props.getCalendarMarks();
        this.props.onClickCalendar();
    }

    renderMainPage() {
        const today = new Date(this.props.firstDate);
        const formatDateToday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Расписание занятий на {formatDateToday}</Text>
                    <TouchableHighlight
                    onPress={() => this.prepareCalendar()}
                    >
                        <Image 
                        source={require('./images/ic_action_date_range.png')}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.top}>
                    <View style={styles.cell}><Text style={styles.topText}>Время</Text></View>
                    <View style={styles.cell}><Text style={styles.topText}>Группа</Text></View>
                    <View style={styles.cell}><Text style={styles.topText}>Тренер</Text></View>
                </View>
                <View>
                    <FlatList
                    style={{height: '80%'}}
                    data={this.props.trainingList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressTraining(item.training_id)}>
                        <View style={styles.container}>
                            <View style={styles.cell}><Text style={styles.cellText}>{this.getFormatDate(item.training_date)}</Text></View>
                            <View style={styles.cell}><Text style={styles.cellText}>{item.group_name}</Text></View>
                            <View style={styles.cell}><Text style={styles.cellText}>{item.trainer_name}</Text></View>
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
                    onPress={() => this.getDataFromServer()}
                    >
                    <Image 
                    source={require('./images/ic_action_control_point.png')}
                    />
                    </TouchableOpacity>
                </View>
                <AddTrainingModal 
                display={this.props.display} 
                onClickModal={this.props.onClickModal} 
                onEnterField={this.props.onEnterField} 
                tmp={this.props.tmp}
                userList={this.props.userList}
                groupList={this.props.groupList}
                addTraining={this.props.addTraining}
                title="Добавить тренировку"/>
            </View>
        );
    }

    renderCalendar() {
        return(
            <View style={styles.wrapper}>
                <CalendarForm
                firstDate={this.props.firstDate}
                lastDate={this.props.lastDate}
                calendarMarks={this.props.calendarMarks}
                getTrainingList={this.props.getTrainingList}
                onClickCalendar={this.props.onClickCalendar}
                changeDate={this.props.changeDate}
                />
            </View>
        )
    }

    render() {
        return this.props.showCalendar ? this.renderCalendar() : this.renderMainPage();
    }
}

class AddTrainingModal extends Component {
    map = digit => digit.toString().length >= 2 ? digit : `0${digit}`;

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

    render() {
        const userList = this.props.userList;
        const groupList = this.props.groupList;
        const pickTrainer = userList.map(item => <Picker.Item label={item.name} value={item.id} backgroundColor='pink' key={item.id.toString()}/>);
        const pickGroup = groupList.map(item => <Picker.Item label={item.groups_name} value={item.groups_id} backgroundColor='pink' key={item.groups_id.toString()}/>);
        return (
        <Modal visible={this.props.display} animationType = "slide" onRequestClose={ () => console.log('closed')} transparent={true}>
            <View style={styles.modalWrapper}>
                <Text style={styles.titleText}>Добавить тренировку</Text>
                <Text style={styles.titleText}>Группа:</Text>
                <Picker
                style={{ width: 200 }}
                selectedValue={!this.props.tmp.groupId ? 'Ololo' : this.props.tmp.groupId}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')}
                keyExtractor={(item, index) => index.toString()}
                >
                {pickGroup}
                </Picker>
                <Text style={styles.titleText}>Тренер:</Text>
                <Picker
                style={{ width: 200 }}
                selectedValue={!this.props.tmp.trainerId ? 'Ololo' : this.props.tmp.trainerId}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}
                keyExtractor={(item, index) => index.toString()}
                >
                {pickTrainer}
                </Picker>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>Дата и время:</Text>
                    <TouchableHighlight
                    onPress={() =>this.showAndroidDatePicker()}
                    >
                    <Image 
                    source={require('./images/ic_action_access_time.png')}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.cellText}>{this.formatDateAndTime()}</Text>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around'}}>
                    <TouchableHighlight
                    onPress={() =>this.props.addTraining()}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cell: {
        flex: 0.33,
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
      button: {
        height: 30,
        width: '85%',
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
      },
      buttonText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white'
      }
});