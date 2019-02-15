/**
 * Create/edit trainings
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  Image,
  Picker,
  DatePickerAndroid,
  TimePickerAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import cancelTrainingIcon from './images/ic_action_delete.png';
import backArrowIcon from './images/ic_action_arrow_back.png';
import saveChangesIcon from './images/ic_action_check.png';
import trainingIcon from './images/ic_action_directions_run_train.png';
import dateTimeTrainingIcon from './images/ic_action_access_time.png';

import styles from './styles';

export default class TrainingForm extends Component {
  askBeforeDelete = (id) => {
    const { cancelTraining } = this.props;
    Alert.alert('Отменить занятие', 'Точно отменить?', [
      { text: 'Да', onPress: () => cancelTraining(id) },
      { text: 'Отмена' },
    ]);
  };

  map = digit => (digit.toString().length >= 2 ? digit : `0${digit}`);

  formatDateAndTime = () => {
    const { tmp } = this.props;
    const { trainingDate } = tmp;
    const today = new Date();
    const formatDateToday = `${this.map(today.getDate())}.${this.map(
      today.getMonth() + 1,
    )}.${today.getFullYear()}`;
    const formatTimeToday = `${this.map(today.getHours())}:${this.map(today.getMinutes())}`;
    if (trainingDate) {
      return `${this.map(trainingDate.getDate())}.${this.map(trainingDate.getMonth() + 1)}.${this.map(
        trainingDate.getFullYear(),
      )} ${this.map(trainingDate.getHours())}:${this.map(trainingDate.getMinutes())}`;
    }
    return `${formatDateToday} ${formatTimeToday}`;
  };

  showAndroidDatePicker = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        this.showAndroidTimePicker(date);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  showAndroidTimePicker = async (date) => {
    const { onEnterField } = this.props;
    const today = new Date();
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: today.getHours(),
        minute: today.getMinutes(),
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

  checkTitle = () => {
    const { tmp } = this.props;
    const { id } = tmp;
    return id === 'new' ? 'Добавить занятие' : 'Изменить занятие';
  };

  checkAction = () => {
    const { tmp, addTraining, editTraining } = this.props;
    const { id } = tmp;
    return id === 'new' ? addTraining() : editTraining();
  };

  checkForDelete = () => {
    const { tmp } = this.props;
    const { id } = tmp;
    if (id === 'new') {
      return null;
    }
    return (
      <TouchableHighlight
        style={{ paddingRight: 16 }}
        onPress={() => this.askBeforeDelete(id)}
      >
        <Image source={cancelTrainingIcon} />
      </TouchableHighlight>
    );
  };

  renderGroupPicker() {
    const { groupList } = this.props;
    const pick = groupList.map(item => (
      <Picker.Item
        label={item.groupName}
        value={item.groupId}
        key={item.groupId.toString()}
      />
    ));
    return pick;
  }

  renderTrainerPicker() {
    const { userList } = this.props;
    const pick = userList.map(item => (
      <Picker.Item label={item.name} value={item.id} key={item.id.toString()} />
    ));
    return pick;
  }

  render() {
    const { cancelAddTraining, onEnterField, tmp } = this.props;
    const { groupId, trainerId } = tmp;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={cancelAddTraining}
          >
            <Image source={backArrowIcon} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.checkTitle()}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction}>
            <Image source={saveChangesIcon} />
          </TouchableHighlight>
          {this.checkForDelete()}
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={trainingIcon} />
          </View>
          <View style={styles.cardInfo}>
            <View style={[styles.textInputField, { flexDirection: 'row' }]}>
              <Text style={[styles.textInput, { flex: 1, paddingVertical: 16 }]}>
                {this.formatDateAndTime()}
              </Text>
              <TouchableHighlight
                style={{ paddingLeft: 16 }}
                onPress={() => this.showAndroidDatePicker()}
              >
                <Image source={dateTimeTrainingIcon} />
              </TouchableHighlight>
            </View>
            <Text style={styles.textInputLabel}>Время и дата</Text>
            <View style={styles.textInputField}>
              <View style={styles.picker}>
                <Picker
                  style={{ width: '100%' }}
                  selectedValue={groupId}
                  onValueChange={itemValue => onEnterField(itemValue, 'groupId')}
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
                  style={{ width: '100%' }}
                  selectedValue={trainerId}
                  onValueChange={itemValue => onEnterField(itemValue, 'trainerId')
                  }
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

TrainingForm.propTypes = {
  onEnterField: PropTypes.func.isRequired,
  cancelAddTraining: PropTypes.func.isRequired,
  cancelTraining: PropTypes.func.isRequired,
  addTraining: PropTypes.func.isRequired,
  editTraining: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({
    userid: PropTypes.number,
    userName: PropTypes.string,
    groupId: PropTypes.number,
    groupName: PropTypes.string,
  })),
  userList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    login: PropTypes.string,
    role: PropTypes.string,
  })),
  tmp: PropTypes.shape({
    groupId: PropTypes.number.isRequired,
    groupName: PropTypes.string,
    trainerId: PropTypes.number.isRequired,
    trainerName: PropTypes.string,
    id: PropTypes.number,
    date: PropTypes.instanceOf(Date),
  }),
};

TrainingForm.defaultProps = {
  groupList: [],
  userList: [],
  tmp: PropTypes.shape({
    cashId: 'new',
    sum: null,
    notice: null,
    checkbox: null,
  }),
};
