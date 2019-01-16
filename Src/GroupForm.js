/**
 * Create/edit selected group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,  TextInput, TouchableHighlight, Image, TouchableOpacity, Picker } from 'react-native';

import {styles} from './styles.js';

export default class GroupForm extends Component {
    renderPicker() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.id} backgroundColor='pink' key={item.id.toString()}/>);
        return pick;
    }

    checkTitle = () => this.props.tmp.groupId === 'new' ? 'Создать группу' : 'Изменить группу';

    checkAction = () => this.props.tmp.groupId === 'new' ? () => this.props.addGroup() : () => this.props.editGroup();

    checkName = () => {
        if (this.props.tmp.groupId === 'new') {
            return(
                <TextInput 
                style={styles.textInput} 
                placeholder='...' 
                onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
            );
        }
        return(
            <TextInput 
            style={styles.textInput} 
            value={this.props.tmp.groupName} 
            onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
            );
    }

    checkPicker = () => {
        if (this.props.tmp.groupId === 'new') {
            return (
            <Picker
            style={{width: '100%'}}
            selectedValue={!this.props.tmp.groupTrainer ? 'Ololo' : this.props.tmp.groupTrainer}
            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupTrainer')}
            keyExtractor={(item, index) => index.toString()}
            >
            {this.renderPicker()}
            </Picker>
            );
        }
        return(
            <Picker
            style={{width: '100%'}}
            selectedValue={this.props.tmp.trainerId}
            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}
            keyExtractor={(item, index) => index.toString()}
            >
            {this.renderPicker()}
            </Picker>
        );
    } 

    render() {
        return(
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableHighlight
                    style={{paddingLeft: 16, paddingRight: 24}}
                        onPress={() => this.props.cancelAddGroup(this.props.tmp.groupId)}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}/>
                    </TouchableHighlight>
                    <Text style={styles.titleText}>{this.checkTitle()}</Text>
                    <TouchableHighlight
                    style={{paddingRight: 16}}
                    onPress={this.checkAction()}
                    >
                        <Image 
                        source={require('./images/ic_action_check.png')}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.card}>
                    <View style={{ paddingTop: 16, paddingHorizontal: 16}}>
                        <Image source={require('./images/ic_action_supervised_user_circle.png')} />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={styles.textInputField}>
                            {this.checkName()}
                        </View>
                        <Text style={styles.textInputLabel}>Название</Text>
                        <View style={styles.textInputField}>
                            <View style={styles.picker}>
                            <Picker
                            style={{width: '100%'}}
                            selectedValue={this.props.tmp.trainerId}
                            onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'trainerId')}
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