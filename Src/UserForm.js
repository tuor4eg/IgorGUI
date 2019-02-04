/**
 * Creat/edit selected user
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, Alert, TextInput, TouchableHighlight, Image, Picker,
} from 'react-native';

import { userRoles } from './const';
import styles from './styles';

import userIcon from './images/ic_action_person.png';
import adminIcon from './images/ic_action_perm_identity.png';

export default class StudentForm extends Component {
  askBeforeDelete = (id) => {
    Alert.alert('Удалить пользователя', 'Точно удалить?', [
      { text: 'Да', onPress: () => this.props.deleteUser(id) },
      { text: 'Отмена' },
    ]);
  };

  checkTitle = () => (this.props.tmp.id === 'new' ? 'Создать пользователя' : 'Изменить пользователя');

  checkForDelete = () => {
    if (this.props.tmp.id === 'new') {
      return null;
    }
    return (
      <TouchableHighlight
        style={{ paddingRight: 16 }}
        onPress={() => this.askBeforeDelete(this.props.tmp.id)}
      >
        <Image source={require('./images/ic_action_delete.png')} />
      </TouchableHighlight>
    );
  };

  checkAction = () => (this.props.tmp.id === 'new' ? () => this.props.addUser() : () => this.props.editUser());

  checkIcon = () => (this.props.tmp.role === 'admin' ? adminIcon : userIcon);

  checkName = () => {
    if (this.props.tmp.id === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => this.props.onEnterField(text, 'name')}
        />
      );
    }
    return (
      <TextInput
        value={this.props.tmp.name}
        style={styles.textInput}
        onChangeText={text => this.props.onEnterField(text, 'name')}
      />
    );
  };

  checkLogin = () => {
    if (this.props.tmp.id === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => this.props.onEnterField(text, 'login')}
        />
      );
    }
    return (
      <TextInput
        value={this.props.tmp.login}
        style={styles.textInput}
        onChangeText={text => this.props.onEnterField(text, 'login')}
      />
    );
  };

  renderPicker = () => userRoles.roles.map((item, index) => (
    <Picker.Item
      style={styles.container}
      label={userRoles.roleLabels[index]}
      value={item}
      key={item.toString()}
    />
  ));

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => this.props.cancelAddUser()}
          >
            <Image source={require('./images/ic_action_arrow_back.png')} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.checkTitle()}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction()}>
            <Image source={require('./images/ic_action_check.png')} />
          </TouchableHighlight>
          {this.checkForDelete()}
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={this.checkIcon()} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.textInputField}>{this.checkName()}</View>
            <Text style={styles.textInputLabel}>Имя пользователя</Text>
            <View style={styles.textInputField}>
              <View style={styles.picker}>
                <Picker
                  style={{ width: '100%' }}
                  selectedValue={!this.props.tmp.role ? userRoles[0] : this.props.tmp.role}
                  onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'role')
                  }
                  keyExtractor={(item, index) => index.toString()}
                >
                  {this.renderPicker()}
                </Picker>
              </View>
            </View>
            <Text style={styles.textInputLabel}>Роль</Text>
            <View style={styles.textInputField}>{this.checkLogin()}</View>
            <Text style={styles.textInputLabel}>Логин</Text>
            <View style={styles.textInputField}>
              <TextInput
                style={styles.textInput}
                placeholder="***"
                onChangeText={text => this.props.onEnterField(text, 'openPassword')}
              />
            </View>
            <Text style={styles.textInputLabel}>Пароль</Text>
          </View>
        </View>
      </View>
    );
  }
}
