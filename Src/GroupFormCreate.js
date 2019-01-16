/**
 * Create new group
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Text, View, TextInput, TouchableHighlight, Picker } from 'react-native';

import {styles} from './styles.js';

export default class GroupFormCreate extends Component {

    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
    };

    

    render() {
        const userList = this.props.userList;
        const pick = userList.map(item => <Picker.Item label={item.name} value={item.id} backgroundColor='pink' key={item.id.toString()}/>);
        return(
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableHighlight
                    style={{paddingLeft: 16, paddingRight: 24}}
                        onPress={() => this.props.cancelAddGroup()}
                    >
                        <Image 
                        source={require('./images/ic_action_arrow_back.png')}/>
                    </TouchableHighlight>
                    <Text style={styles.titleText}>Добавить группу</Text>
                    <TouchableHighlight
                    style={{paddingRight: 16}}
                    onPress={() => this.props.addGroup()}
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
                            <TextInput style={styles.textInput} placeholder='...' onChangeText={(text) => this.props.onEnterField(text, 'groupName')}/>
                        </View>
                        <Text style={styles.textInputLabel}>Название</Text>
                        <View style={styles.textInputField}>
                            <View style={styles.picker}>
                                <Picker
                                style={{width: '100%'}}
                                selectedValue={!this.props.tmp.groupTrainer ? 'Ololo' : this.props.tmp.groupTrainer}
                                onValueChange={(itemValue, itemIndex) => this.props.onEnterField(itemValue, 'groupTrainer')}
                                keyExtractor={(item, index) => index.toString()}
                                >
                                {pick}
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

