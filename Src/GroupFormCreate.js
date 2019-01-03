/**
 * Create new group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Alert, TextInput, TouchableHighlight, FlatList, Picker } from 'react-native';

import {colors} from './const.js';
import {styles} from './styles.js';

export default class GroupFormCreate extends Component {
    getTrainerId = (array, name) => array.filter(item => item.name === name);

    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
    };

    render() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.name} backgroundColor='pink' key={item.id.toString()}/>);
        return(
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableHighlight
                    style={{paddingLeft: '5%'}}
                        onPress={() => this.props.cancelAddGroup()}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}/>
                    </TouchableHighlight>
                    <Text style={[styles.titleText, {paddingLeft: '15%'}]}>Добавить группу</Text>
                </View>
                <View style={styles.top}>
                    <Text style={styles.topText}>Название:</Text>
                </View>
                <TextInput style={styles.cellText} placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
                <View style={styles.top}>
                    <Text style={styles.topText}>Тренер:</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Picker
                style={{ width: 200 }}
                selectedValue={!this.props.tmp.groupTrainer ? 'Ololo' : this.props.tmp.groupTrainer.name}
                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(this.getTrainerId(userList, itemValue)[0], 'groupTrainer')}
                keyExtractor={(item, index) => index.toString()}
                >
                {pick}
                </Picker>
                </View>
                {this.renderSeparator()}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}}>
                    <TouchableHighlight
                    style={[styles.button, {width: '30%'}]}
                    onPress={() => this.props.addGroup()}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

