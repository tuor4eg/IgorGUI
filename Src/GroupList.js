/**
 * List of train groups
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView, TouchableHighlight } from 'react-native';

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
            <View>
                <View>
                    <Text>Group list</Text>
                </View>
                <View>
                    <Text>Group name</Text>
                    <Text>Trainer</Text>
                </View>
                <View>
                    <FlatList
                    groupList={this.props.groupList}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onTouch(item.id)}>
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.trainer}</Text>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    }
});