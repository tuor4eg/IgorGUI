/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, View, TouchableHighlight, FlatList, TouchableOpacity, Image, RefreshControl  } from 'react-native';

import {colors} from './const.js';
import {styles} from './styles.js';

export default class GroupList extends Component {
    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
      };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, {paddingLeft: 72}]}>Список групп</Text>
                    <TouchableOpacity
                    style={{paddingRight: 16}}
                    onPress={() => this.props.onPressAddGroup()}
                    >
                        <Image 
                        source={require('./images/ic_action_group_add.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                    style={{height: '90%'}}
                    data={this.props.groupList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onPressGroup(item.groups_id)}>
                        <View style={[styles.container, {height: 72}]}>
                            <View style={{paddingLeft: 16, paddingRight: 24}}>
                                <Image
                                source={require('./images/ic_action_supervised_user_circle.png')}
                                />
                            </View>
                            <View style={styles.twoLineCell}>
                                <Text style={[styles.cellText, {paddingTop: 16}]}>{item.groups_name}</Text>
                                <Text style={styles.cellTextSecond}>{item.users_name}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshing={this.props.loading}
                    onRefresh={() => this.props.getGroupList()}
                    />
                </View>
            </View>
        );
    }
}