/**
 * Create/edit selected student
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Image, Text, View, Alert, TextInput, TouchableHighlight, Picker,
} from 'react-native';
import PropTypes from 'prop-types';

import backArrowIcon from './images/ic_action_arrow_back.png';
import saveChangesIcon from './images/ic_action_check.png';
import studentIcon from './images/ic_action_account_circle_user.png';

import styles from './styles';

export default class StudentForm extends Component {
  askBeforeDelete = (id) => {
    const { deleteStudent } = this.props;
    Alert.alert('Удалить участника', 'Точно удалить?', [
      { text: 'Да', onPress: () => deleteStudent(id) },
      { text: 'Отмена' },
    ]);
  };

  renderPicker = () => {
    const { groupList } = this.props;
    return groupList.map(item => (
      <Picker.Item
        style={styles.container}
        label={item.groupName}
        value={item.groupId}
        backgroundColor="pink"
        key={item.groupId.toString()}
      />
    ));
  };

  checkTitle = () => {
    const { tmp } = this.props;
    const { id } = tmp;
    return id === 'new' ? 'Добавить участника' : 'Изменить участника';
  };

  checkAction = () => {
    const { tmp, addStudent, editStudent } = this.props;
    const { id, groupId } = tmp;
    return id === 'new' ? () => addStudent(groupId) : () => editStudent(id);
  };

  checkName = () => {
    const { tmp, onEnterField } = this.props;
    const { id, studentName } = tmp;
    if (id === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => onEnterField(text, 'studentName')}
        />
      );
    }
    return (
      <TextInput
        value={studentName}
        style={styles.textInput}
        onChangeText={text => onEnterField(text, 'studentName')}
      />
    );
  };

  render() {
    const { cancelAddStudent, onEnterField, tmp } = this.props;
    const { groupId } = tmp;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => cancelAddStudent(groupId)}
          >
            <Image source={backArrowIcon} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.checkTitle()}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction()}>
            <Image source={saveChangesIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={studentIcon} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.textInputField}>{this.checkName()}</View>
            <Text style={styles.textInputLabel}>Имя участника</Text>
            <View style={styles.textInputField}>
              <View style={styles.picker}>
                <Picker
                  style={{ width: '100%' }}
                  selectedValue={groupId}
                  onValueChange={itemValue => onEnterField(itemValue, 'groupId')}
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
}

StudentForm.propTypes = {
  onEnterField: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  addStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
  cancelAddStudent: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({
    userid: PropTypes.number,
    userName: PropTypes.string,
    groupId: PropTypes.number,
    groupName: PropTypes.string,
  })),
  tmp: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    groupId: PropTypes.number.isRequired,
    studentName: PropTypes.string,
  }),
};

StudentForm.defaultProps = {
  groupList: [],
  tmp: PropTypes.shape({
    id: 'new',
    studentName: null,
  }),
};
