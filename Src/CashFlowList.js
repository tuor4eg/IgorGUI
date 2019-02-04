/**
 * List of students in selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  DatePickerAndroid,
  Picker,
  TouchableHighlight,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TimePickerAndroid,
  Modal,
  CheckBox,
  Image,
} from 'react-native';

import styles from './styles';
import { menuButtonsList } from './const';

import iconNoticeEmpty from './images/ic_cashflow_note_empty.png';
import iconNoticeFull from './images/ic_cashflow_note_full.png';

// import CheckBox from 'react-native-checkbox';

export default class CashFlowList extends Component {
  map = digit => (digit.toString().length >= 2 ? digit : `0${digit}`);

  getFormatDate = date => `${this.map(date.getHours())}:${this.map(date.getMinutes())}`;

  checkNotice = item => (item.notice ? iconNoticeFull : iconNoticeEmpty);

  checkSum = item => (item.sum ? item.sum.toString() : '0');

  checkCheckBox = item => (!item.checkbox ? false : item.checkbox !== 0);

  changeUser = (id) => {
    this.props.onEnterField(id, 'trainerId');
    const [getTrainer] = this.props.userList.filter(item => item.id === id);
    this.props.onEnterField(getTrainer.name, 'trainerName');
  };

  askBeforeCancel = (id) => {
    Alert.alert('Отменить тренировку', 'Точно отменить?', [
      { text: 'Да', onPress: () => this.props.cancelTraining(id) },
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
        this.props.onEnterField(dateWithTime, 'date');
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  onChangeSum = (value, id, key) => (!isNaN(Number(value))
    ? this.props.onChangeArray(value, id, key)
    : Alert.alert('Введите число!'));

  prepareNotice = (text) => {
    if (!text) {
      return '...';
    }
    return text.length > 10 ? `${text.substring(0, 9)}...` : text;
  };

  getNoticeModal = (id) => {
    this.props.onEnterField(id, 'student_id');
    this.props.onClickModal();
  };

  renderNew() {
    const tmp = this.props.tmp;
    const userList = this.props.userList;
    const cashflows = this.props.cashflows;
    const dateToString = `${tmp.date.getDate()}.${tmp.date.getMonth()
      + 1}.${tmp.date.getFullYear()}`;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => this.props.onPressMenu(menuButtonsList.button1)}
          >
            <Image source={require('./images/ic_action_arrow_back.png')} />
          </TouchableHighlight>
          <Text style={styles.titleText}>
            Группа
            {' '}
            {tmp.groupName}
,
            {' '}
            {this.getFormatDate(tmp.date)}
          </Text>
          <TouchableHighlight
            style={{ paddingRight: 24 }}
            onPress={() => this.props.onPressEditTraining(tmp.id)}
          >
            <Image source={require('./images/ic_action_mode_edit.png')} />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ paddingRight: 16 }}
            onPress={() => this.askBeforeCancel(tmp.id)}
          >
            <Image source={require('./images/ic_action_delete.png')} />
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            style={{ height: '90%' }}
            data={cashflows.map(i => i)}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.props.onPressGroup(item.groups_id)}>
                <View style={[styles.container, { height: 72 }]}>
                  <View style={{ paddingLeft: 16, paddingRight: 24 }}>
                    <Image source={require('./images/ic_action_account_circle.png')} />
                  </View>
                  <View style={[styles.twoLineCell, { flex: 1 }]}>
                    <Text style={[styles.cellText, { paddingTop: 16 }]}>{item.name}</Text>
                    <Text style={styles.cellTextSecond}>
                      {this.checkSum(item)}
                      {' '}
руб.
                    </Text>
                  </View>
                  <View style={{ paddingHorizontal: 16 }}>
                    <Image source={this.checkNotice(item)} />
                  </View>
                  <View style={{ paddingHorizontal: 16 }}>
                    <CheckBox
                      label=""
                      value={this.checkCheckBox(item)}
                      onValueChange={value => this.props.onChangeArray(value, item.id, 'checkbox')
                        }
                    />
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </View>
    );
  }

  renderOld() {
    const tmp = this.props.tmp;
    const userList = this.props.userList;
    const cashflows = this.props.cashflows;
    const dateToString = `${tmp.date.getDate()}.${tmp.date.getMonth()
      + 1}.${tmp.date.getFullYear()}`;
    const pick = userList.map(item => (
      <Picker.Item
        label={item.name}
        value={item.id}
        backgroundColor="pink"
        key={item.id.toString()}
      />
    ));
    const counter = cashflows.reduce(
      (acc, item) => {
        const totalCount = item.checkbox ? acc[0] + 1 : acc[0];
        const totalSum = item.sum ? acc[1] + 1 : acc[1];
        return [totalCount, totalSum];
      },
      [0, 0],
    );

    return (
      <View style={styles.wrapper}>
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.title}>
            <Text>
              Тренировка группы
              {' '}
              {tmp.groupName}
              {' '}
              {dateToString}
              {' '}
              {this.getFormatDate(tmp.date)}
            </Text>
          </View>
          <View style={styles.top}>
            <View style={styles.cell}>
              <Text>Отметка</Text>
            </View>
            <View style={styles.cell}>
              <Text>ФИО участника</Text>
            </View>
            <View style={styles.cell}>
              <Text>Сумма</Text>
            </View>
            <View style={styles.cell}>
              <Text>Примечание</Text>
            </View>
          </View>
          <View>
            <FlatList
              style={styles.scrolling}
              data={cashflows.map(i => i)}
              renderItem={({ item }) => (
                <TouchableHighlight onPress={() => this.getNoticeModal(item.id)}>
                  <View style={styles.container}>
                    <View style={styles.cell}>
                      <CheckBox
                        label=""
                        value={!item.checkbox ? false : item.checkbox !== 0}
                        onValueChange={value => this.props.onChangeArray(value, item.id, 'checkbox')
                          }
                      />
                    </View>
                    <View style={styles.cell}>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.cell}>
                      <TextInput
                        value={item.sum ? item.sum.toString() : '0'}
                        onChangeText={text => this.onChangeSum(text, item.id, 'sum')}
                      />
                    </View>
                    <View style={styles.cell}>
                      <Text>{this.prepareNotice(item.notice)}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
          <View style={styles.top}>
            <Text>
Всего участников:
              {counter[0]}
            </Text>
            <Text>
Итого, руб.:
              {counter[1]}
            </Text>
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
          <Button onPress={() => this.props.editTraining()} title="Сохранить изменения" />
          <Button
            onPress={() => this.askBeforeCancel(this.props.tmp.id)}
            title="Отменить тренировку"
          />
          <AddNoticeModal
            display={this.props.display}
            tmp={this.props.tmp}
            onClickModal={this.props.onClickModal}
            onEnterField={this.props.onEnterField}
            onChangeArray={this.props.onChangeArray}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  render() {
    return this.renderNew();
  }
}

class AddNoticeModal extends Component {
  onEnterNotice = (text, id) => {
    this.props.onChangeArray(text, id, 'notice');
    this.props.onClickModal();
  };

  render() {
    return (
      <Modal
        visible={this.props.display}
        animationType="slide"
        onRequestClose={() => console.log('closed')}
        transparent
      >
        <View style={styles.modalWrapper}>
          <Text>Добавить примечание</Text>
          <TextInput
            placeholder="..."
            onChangeText={text => this.props.onEnterField(text, 'notice')}
          />
          <Button
            onPress={() => this.onEnterNotice(this.props.tmp.notice, this.props.tmp.student_id)}
            title="Сохранить"
          />
          <Button onPress={() => this.props.onClickModal()} title="Отмена" />
        </View>
      </Modal>
    );
  }
}
