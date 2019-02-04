/**
 * Create/edit selected student
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Image,
  Text,
  View,
  Alert,
  TextInput,
  TouchableHighlight,
  Picker,
} from 'react-native';

import styles from './styles';

export default class StudentForm extends Component {
  askBeforeDelete = (id) => {
    Alert.alert('Удалить участника', 'Точно удалить?', [
      { text: 'Да', onPress: () => this.props.deleteStudent(id) },
      { text: 'Отмена' },
    ]);
  };

  renderPicker = () => this.props.groupList.map(item => (
    <Picker.Item
      style={styles.container}
      label={item.groups_name}
      value={item.groups_id}
      backgroundColor="pink"
      key={item.groups_id.toString()}
    />
  ));

  checkTitle = () => (this.props.tmp.id === 'new' ? 'Добавить участника' : 'Изменить участника');

  checkAction = () => (this.props.tmp.id === 'new'
    ? () => this.props.addStudent(this.props.tmp.groupId)
    : () => this.props.editStudent(this.props.tmp.id));

  checkName = () => {
    if (this.props.tmp.id === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => this.props.onEnterField(text, 'studentName')}
        />
      );
    }
    return (
      <TextInput
        value={this.props.tmp.studentName}
        style={styles.textInput}
        onChangeText={text => this.props.onEnterField(text, 'studentName')}
      />
    );
  };

  renderNew() {
    console.log(this.props.tmp.id);
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => this.props.cancelAddStudent(this.props.tmp.groupId)}
          >
            <Image source={require('./images/ic_action_arrow_back.png')} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.checkTitle()}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction()}>
            <Image source={require('./images/ic_action_check.png')} />
          </TouchableHighlight>
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={require('./images/ic_action_account_circle_user.png')} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.textInputField}>{this.checkName()}</View>
            <Text style={styles.textInputLabel}>Имя участника</Text>
            <View style={styles.textInputField}>
              <View style={styles.picker}>
                <Picker
                  style={{ width: '100%' }}
                  selectedValue={this.props.tmp.groupId}
                  onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')
                  }
                  keyExtractor={(item, index) => index.toString()}
                >
                  {this.renderPicker()}
                </Picker>
              </View>
            </View>
            <Text style={styles.textInputLabel}>Группа</Text>
          </View>
        </View>
      </View>
    );
  }

  renderOld() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>Изменить участника</Text>
        </View>
        <View style={styles.top}>
          <Text>ФИО</Text>
          <Text>Группа</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            value={this.props.tmp.studentName}
            style={styles.container}
            onChangeText={text => this.props.onEnterField(text, 'studentName')}
          />
          <Picker
            style={{ width: 150 }}
            selectedValue={this.props.tmp.groupId}
            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupId')}
          >
            {this.renderPicker()}
          </Picker>
        </View>
        <Button onPress={() => this.props.editStudent(this.props.studentId)} title="Сохранить" />
        <Button onPress={() => this.askBeforeDelete(this.props.studentId)} title="Удалить" />
      </View>
    );
  }

  render() {
    return this.renderNew();
  }
}
