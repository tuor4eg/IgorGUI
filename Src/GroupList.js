/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight, FlatList } from 'react-native';

export default class GroupList extends Component {
    renderSeparator = () => {
        return (
          <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "black",
            }}
          />
        );
      };

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <Text>Список групп</Text>
                </View>
                <View style={styles.top}>
                    <Text>Группа</Text>
                    <Text>Тренер</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.groupList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onTouch(item.id)}>
                        <View style={styles.container}>
                            <Text>{item.groups_name}</Text>
                            <Text>{item.users_name}</Text>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                <Button
                onPress={() => console.log('1')}
                title="Добавить"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        flex: 1
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'pink'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'powderblue',
    }
});