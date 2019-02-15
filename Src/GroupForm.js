/**
 * Create/edit selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableHighlight, Image, Picker,
} from 'react-native';
import PropTypes from 'prop-types';

import backArrowIcon from './images/ic_action_arrow_back.png';
import saveChangesIcon from './images/ic_action_check.png';
import groupIcon from './images/ic_group.png';

import styles from './styles';

export default class GroupForm extends Component {
  checkPicker = () => {
    const { tmp, onEnterField } = this.props;
    const { groupTrainer, groupId, trainerId } = tmp;
    if (groupId === 'new') {
      return (
        <Picker
          style={{ width: '100%' }}
          selectedValue={!groupTrainer ? 'Ololo' : groupTrainer}
          onValueChange={itemValue => onEnterField(itemValue, 'groupTrainer')}
          keyExtractor={(item, index) => index.toString()}
        >
          {this.renderPicker()}
        </Picker>
      );
    }
    return (
      <Picker
        style={{ width: '100%' }}
        selectedValue={trainerId}
        onValueChange={itemValue => onEnterField(itemValue, 'trainerId')}
        keyExtractor={(item, index) => index.toString()}
      >
        {this.renderPicker()}
      </Picker>
    );
  };

  checkName = () => {
    const { tmp, onEnterField } = this.props;
    const { groupId, groupName } = tmp;
    if (groupId === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => onEnterField(text, 'groupName')}
        />
      );
    }
    return (
      <TextInput
        style={styles.textInput}
        value={groupName}
        onChangeText={text => onEnterField(text, 'groupName')}
      />
    );
  };

  checkTitle = () => {
    const { tmp } = this.props;
    const { groupId } = tmp;
    return (groupId === 'new' ? 'Создать группу' : 'Изменить группу');
  }

  checkAction = () => {
    const { tmp, addGroup, editGroup } = this.props;
    const { groupId } = tmp;
    return (groupId === 'new' ? addGroup() : editGroup());
  }

  renderPicker() {
    const { userList } = this.props;
    const pick = userList.map(item => (
      <Picker.Item
        label={item.name}
        value={item.id}
        backgroundColor="pink"
        key={item.id.toString()}
      />
    ));
    return pick;
  }

  render() {
    const { cancelAddGroup, onEnterField, tmp } = this.props;
    const { trainerId, groupId } = tmp;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => cancelAddGroup(groupId)}
          >
            <Image source={backArrowIcon} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.checkTitle()}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction}>
            <Image source={saveChangesIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={groupIcon} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.textInputField}>{this.checkName()}</View>
            <Text style={styles.textInputLabel}>Название</Text>
            <View style={styles.textInputField}>
              <View style={styles.picker}>
                <Picker
                  style={{ width: '100%' }}
                  selectedValue={trainerId}
                  onValueChange={itemValue => onEnterField(itemValue, 'trainerId')
                  }
                  keyExtractor={(item, index) => index.toString()}
                >
                  {this.renderPicker()}
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

GroupForm.propTypes = {
  onEnterField: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  cancelAddGroup: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    login: PropTypes.string,
    role: PropTypes.string,
  })),
  tmp: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    groupId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    groupName: PropTypes.string,
    trainderId: PropTypes.number,
  }),
};

GroupForm.defaultProps = {
  userList: [],
  tmp: PropTypes.shape({
    id: 'new',
  }),
};
