/**
 * Form to edit cell
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Button, StyleSheet, TextInput, Text, View} from 'react-native';

export class EditTrainer extends Component {
  

  render() {
    <View>
      <View>
        <Text>Куратор:</Text>
      </View>
      <View>
        <TextInput
        value={this.props.trainer}/>
      </View>
    </View>
  }
}

export default class EditForm extends Component {

  onChangeSum = (text) => {
    !isNaN(Number(text)) ? this.props.onChange(text, 'sum') : Alert.alert("Введите число!")
  };

  askForDelete = (id) => {
    Alert.alert(
      'Удалить запись',
      'Точно удалить?',
      [
        {text: 'Да', onPress: () => this.props.deleteRecord(id)},
        {text: 'Отмена'}
      ]
    )
  }

  render() {
      const temp = this.props.temp;
      return (
        <View style={styles.wrapper}>
            <View style={styles.title}>
                <Text>Изменить запись</Text>
            </View>
            <View flexDirection='row' justifyContent='space-around'>
              <Text>Фамилия</Text>
              <Text>Сумма</Text>
              <Text>Комментарий</Text>
            </View>
            <View flexDirection='row' justifyContent='space-around'>
              <TextInput value={temp.name} onChangeText={(text) => this.props.onChange(text, 'name')}/>
              <TextInput 
              value={String(temp.sum)} 
              onChangeText={text => this.onChangeSum(text)}
              />
              <TextInput value={temp.text} onChangeText={(text) => this.props.onChange(text, 'text')}/>
            </View>
            <View flexDirection='column' justifyContent='space-around'>
            <Button
            onPress={() => this.props.editRecord('save')}
            title="Сохранить"
            />
            <Button
            onPress={() => this.askForDelete(temp.id)}
            title="Удалить"
            />
            <Button
            onPress={() => this.props.editRecord(null)}
            title="Отмена"
            />
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
    columns: {
      flex: 0.05,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'pink',
    },
    title: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'powderblue',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'skyblue',
    },
    cell:{
      flex: 0.33,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    ending: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
    },
    titleFont: {
      fontSize: 17,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      fontSize: 15,
      textAlign: 'center',
      color: 'black',
      marginBottom: 5,
    },
  });