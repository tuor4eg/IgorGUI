/**
 * Main application's page
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, DatePickerAndroid, FlatList, 
    TouchableHighlight, TouchableOpacity, TimePickerAndroid, Modal, Picker, Image } from 'react-native';

import CalendarForm from './Calendar.js';

import {styles} from './styles.js';

export default class HomePage extends Component {
    map = digit => digit.toString().length >= 2 ? digit : `0${digit}`;

    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
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
        const formatDateToday = `${this.map(today.getDate())}.${this.map(today.getMonth() + 1)}.${today.getFullYear()}`;
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, {paddingLeft: 56}]}>Расписание на {formatDateToday}</Text>
                    <TouchableOpacity
                    style={{ paddingRight: 16}}
                    onPress={() => this.prepareCalendar()}
                    >
                        <Image 
                        source={require('./images/ic_action_date_range.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                    style={{height: '90%'}}
                    data={this.props.trainingList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressTraining(item.training_id)}>
                        <View style={[styles.container, {height: 72}]}>
                            <View style={{paddingLeft: 16, paddingRight: 16}}>
                                <Image
                                source={require('./images/ic_action_directions_run.png')}
                                />
                            </View>
                            <Text style={styles.cellText}>{this.getFormatDate(item.training_date)}</Text>
                            <View style={styles.twoLineCell}>
                                <Text style={[styles.cellText, {paddingTop: 16}]}>{item.group_name}</Text>
                                <Text style={styles.cellTextSecond}>{item.trainer_name}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                    <TouchableOpacity
                    style={styles.TouchableOpacityStyle}
                    onPress={() => this.props.onPressAddTraining()}
                    >
                        <View style={styles.fab}>
                            <Text style={{color: 'white', fontSize: 24}}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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