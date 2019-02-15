/**
 * Main application's page
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, FlatList, TouchableHighlight, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import calendarIcon from './images/ic_action_date_range.png';
import trainingIcon from './images/ic_action_directions_run.png';

import CalendarForm from './Calendar';

import styles from './styles';

export default class HomePage extends Component {
  map = digit => (digit.toString().length >= 2 ? digit : `0${digit}`);

  renderSeparator = () => <View style={styles.separator} />;

  getFormatDate = date => `${this.map(date.getHours())}:${this.map(date.getMinutes())}`;

  getDataFromServer = async () => {
    const { getUserList, getGroupList, onClickModal } = this.props;
    await getUserList();
    await getGroupList();
    onClickModal();
  };

  prepareCalendar = async () => {
    const { getCalendarMarks, onClickCalendar } = this.props;
    await getCalendarMarks();
    onClickCalendar();
  };

  renderMainPage() {
    const {
      firstDate, trainingList, onPressTraining, onPressAddTraining,
    } = this.props;
    console.log(trainingList);
    const today = new Date(firstDate);
    const formatDateToday = `${this.map(today.getDate())}.${this.map(
      today.getMonth() + 1,
    )}.${today.getFullYear()}`;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text style={[styles.titleText, { paddingLeft: 56 }]}>
            Расписание на
            {' '}
            {formatDateToday}
          </Text>
          <TouchableOpacity style={{ paddingRight: 16 }} onPress={this.prepareCalendar}>
            <Image source={calendarIcon} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={trainingList}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => onPressTraining(item.trainingId)}>
              <View style={[styles.container, { height: 72 }]}>
                <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                  <Image source={trainingIcon} />
                </View>
                <Text style={styles.cellText}>{this.getFormatDate(item.trainingDate)}</Text>
                <View style={styles.twoLineCell}>
                  <Text style={[styles.cellText, { paddingTop: 16 }]}>{item.groupName}</Text>
                  <Text style={styles.cellTextSecond}>{item.trainerName}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={onPressAddTraining}>
          <View style={styles.fab}>
            <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderCalendar() {
    const {
      firstDate,
      lastDate,
      calendarMarks,
      getTrainingList,
      onClickCalendar,
      changeDate,
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <CalendarForm
          firstDate={firstDate}
          lastDate={lastDate}
          calendarMarks={calendarMarks}
          getTrainingList={getTrainingList}
          onClickCalendar={onClickCalendar}
          changeDate={changeDate}
        />
      </View>
    );
  }

  render() {
    const { showCalendar } = this.props;
    return showCalendar ? this.renderCalendar() : this.renderMainPage();
  }
}

HomePage.propTypes = {
  firstDate: PropTypes.number.isRequired,
  lastDate: PropTypes.number.isRequired,
  calendarMarks: PropTypes.objectOf(PropTypes.number).isRequired,
  trainingList: PropTypes.arrayOf(
    PropTypes.shape({
      trainingId: PropTypes.number,
      trainingDate: PropTypes.date,
      groupId: PropTypes.number,
      groupName: PropTypes.string,
      trainerName: PropTypes.string,
    }),
  ).isRequired,
  getTrainingList: PropTypes.func.isRequired,
  onClickCalendar: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  onPressAddTraining: PropTypes.func.isRequired,
  onPressTraining: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
};
