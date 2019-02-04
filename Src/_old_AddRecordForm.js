/**
 * Form to add new record
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert, Button, StyleSheet, TextInput, Text, View,
} from 'react-native';

export default class AddRecordForm extends Component {
  onChangeSum = text => (!isNaN(Number(text)) ? this.props.onChange(text, 'sum') : Alert.alert('Введите число!'));

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>Добавить запись</Text>
        </View>
        <View flexDirection="row" justifyContent="space-around">
          <Text>Фамилия</Text>
          <Text>Сумма</Text>
          <Text>Комментарий</Text>
        </View>
        <View flexDirection="row" justifyContent="space-around">
          <TextInput
            placeholder="ФИО..."
            onChangeText={text => this.props.onChange(text, 'name')}
          />
          <TextInput placeholder="Сумма..." onChangeText={text => this.onChangeSum(text)} />
          <TextInput
            placeholder="Примечание..."
            onChangeText={text => this.props.onChange(text, 'text')}
          />
        </View>
        <View flexDirection="column" justifyContent="space-around">
          <Button onPress={() => this.props.addRecord('save')} title="Сохранить" />
          <Button onPress={() => this.props.addRecord(null)} title="Отмена" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
});
