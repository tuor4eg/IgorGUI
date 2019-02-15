/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  DatePickerAndroid,
  TouchableHighlight,
  FlatList,
  Alert,
  TimePickerAndroid,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { menuButtonsList } from './const';

import noticeEmptyIcon from './images/ic_cashflow_note_empty.png';
import noticeFullIcon from './images/ic_cashflow_note_full.png';
import backArrowIcon from './images/ic_action_arrow_back.png';
import editTrainingIcon from './images/ic_action_mode_edit.png';
import cancelTrainingIcon from './images/ic_action_delete.png';
import userIcon from './images/ic_action_account_circle.png';
import checkedIcon from './images/ic_checkbox_true.png';

export default class CashFlowList extends Component {
  map = digit => (digit.toString().length >= 2 ? digit : `0${digit}`);

  getFormatDate = date => `${this.map(date.getHours())}:${this.map(date.getMinutes())}`;

  checkNotice = item => (item.notice ? noticeFullIcon : noticeEmptyIcon);

  checkSum = item => (item.sum ? item.sum.toString() : '0');

  checkCheckBox = (item) => {
    if (!item.checkbox || item.checkbox === 0) {
      return null;
    }
    return <Image source={checkedIcon} />;
  };

  askBeforeCancel = (id) => {
    const { cancelTraining } = this.props;
    Alert.alert('Отменить тренировку', 'Точно отменить?', [
      { text: 'Да', onPress: () => cancelTraining(id) },
      { text: 'Отмена' },
    ]);
  };

  renderSeparator = () => <View style={styles.separator} />;

  showAndroidDatePicker = async (currentDate) => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: currentDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        this.showAndroidTimePicker(date, currentDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  showAndroidTimePicker = async (date, oldDate) => {
    const { onEnterField } = this.props;
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: oldDate.getHours(),
        minute: oldDate.getMinutes(),
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const dateWithTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minute,
        );
        onEnterField(dateWithTime, 'date');
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  renderItem = ({ item }) => {
    const { onPressCashFlow } = this.props;
    const sumToString = `${this.checkSum(item)} руб.`;
    return (
      <TouchableHighlight onPress={() => onPressCashFlow(item)}>
        <View style={[styles.container, { height: 72 }]}>
          <View style={{ paddingLeft: 16, paddingRight: 24 }}>
            <Image source={userIcon} />
          </View>
          <View style={[styles.twoLineCell, { flex: 1 }]}>
            <Text style={[styles.cellText, { paddingTop: 16 }]}>{item.studentName}</Text>
            <Text style={styles.cellTextSecond}>{sumToString}</Text>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <Image source={this.checkNotice(item)} />
          </View>
          <View style={{ paddingHorizontal: 36 }}>{this.checkCheckBox(item)}</View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {
      tmp, cashflows, onPressMenu, onPressEditTraining,
    } = this.props;
    const { groupName, date, trainingId } = tmp;
    const titleToString = `Группа ${groupName}, ${this.getFormatDate(date)}`;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => onPressMenu(menuButtonsList.button1)}
          >
            <Image source={backArrowIcon} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{titleToString}</Text>
          <TouchableHighlight
            style={{ paddingRight: 24 }}
            onPress={() => onPressEditTraining(trainingId)}
          >
            <Image source={editTrainingIcon} />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ paddingRight: 16 }}
            onPress={() => this.askBeforeCancel(trainingId)}
          >
            <Image source={cancelTrainingIcon} />
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            style={{ height: '90%' }}
            data={cashflows.map(i => i)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </View>
    );
  }
}

CashFlowList.propTypes = {
  onEnterField: PropTypes.func.isRequired,
  cancelTraining: PropTypes.func.isRequired,
  cashflows: PropTypes.arrayOf(
    PropTypes.shape({
      studentId: PropTypes.number.isRequired,
      studentName: PropTypes.string.isRequired,
      cashId: PropTypes.number,
      notice: PropTypes.string,
      sum: PropTypes.number,
      checkbox: PropTypes.number,
    }),
  ),
  onPressEditTraining: PropTypes.func.isRequired,
  onPressMenu: PropTypes.func.isRequired,
  tmp: PropTypes.shape({
    groupId: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    trainerId: PropTypes.number.isRequired,
    trainerName: PropTypes.string.isRequired,
    trainingId: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }),
  onPressCashFlow: PropTypes.func.isRequired,
};

CashFlowList.defaultProps = {
  cashflows: PropTypes.shape({
    cashId: null,
    notice: null,
    sum: null,
    checkbox: null,
  }),
  tmp: PropTypes.shape({
    date: null,
  }),
};
