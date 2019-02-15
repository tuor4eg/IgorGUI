/**
 * Create/edit selected cashflow
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Image, Text, View, TextInput, TouchableHighlight, CheckBox,
} from 'react-native';
import PropTypes from 'prop-types';

import backArrowIcon from './images/ic_action_arrow_back.png';
import saveChangesIcon from './images/ic_action_check.png';
import studentIcon from './images/ic_action_account_circle_user.png';

import styles from './styles';

export default class CashFlowForm extends Component {
  checkAction = () => {
    const { tmp, addCashFlow, editCashFlow } = this.props;
    const { cashId } = tmp;
    return cashId === 'new' ? addCashFlow() : editCashFlow();
  };

  checkSum = () => {
    const { tmp, onEnterField } = this.props;
    const { cashId, sum } = tmp;
    if (cashId === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => onEnterField(text, 'sum')}
        />
      );
    }
    return (
      <TextInput
        value={sum.toString()}
        style={styles.textInput}
        onChangeText={text => onEnterField(text, 'sum')}
      />
    );
  };

  checkNotice = () => {
    const { tmp, onEnterField } = this.props;
    const { cashId, notice } = tmp;
    if (cashId === 'new') {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="..."
          onChangeText={text => onEnterField(text, 'notice')}
        />
      );
    }
    return (
      <TextInput
        value={notice}
        style={styles.textInput}
        onChangeText={text => onEnterField(text, 'notice')}
      />
    );
  };

  checkCheckBox = item => (!item ? false : item !== 0);

  render() {
    const { cancelCashFlowChanges, tmp, onEnterField } = this.props;
    const { trainingId, studentName, checkbox } = tmp;
    console.log(tmp);
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <TouchableHighlight
            style={{ paddingLeft: 16, paddingRight: 24 }}
            onPress={() => cancelCashFlowChanges(trainingId)}
          >
            <Image source={backArrowIcon} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{studentName}</Text>
          <TouchableHighlight style={{ paddingRight: 16 }} onPress={this.checkAction}>
            <Image source={saveChangesIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.card}>
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Image source={studentIcon} />
          </View>
          <View style={styles.cardInfo}>
            <View style={{ flexDirection: 'row', height: 56, alignItems: 'center' }}>
              <CheckBox
                label=""
                value={this.checkCheckBox(checkbox)}
                onValueChange={value => onEnterField(value, 'checkbox')}
              />
              <Text style={styles.textInputLabel}>Отметка о присутствии</Text>
            </View>
            <View style={styles.textInputField}>{this.checkSum()}</View>
            <Text style={styles.textInputLabel}>Сумма, руб.</Text>
            <View style={styles.textInputField}>{this.checkNotice()}</View>
            <Text style={styles.textInputLabel}>Примечание</Text>
          </View>
        </View>
      </View>
    );
  }
}

CashFlowForm.propTypes = {
  onEnterField: PropTypes.func.isRequired,
  addCashFlow: PropTypes.func.isRequired,
  editCashFlow: PropTypes.func.isRequired,
  cancelCashFlowChanges: PropTypes.func.isRequired,
  tmp: PropTypes.shape({
    groupId: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    trainerId: PropTypes.number.isRequired,
    trainerName: PropTypes.string.isRequired,
    trainingId: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    cashId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sum: PropTypes.number,
    notice: PropTypes.string,
    checkbox: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  }),
};

CashFlowForm.defaultProps = {
  tmp: PropTypes.shape({
    cashId: 'new',
    sum: null,
    notice: null,
    checkbox: null,
  }),
};
