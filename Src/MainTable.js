/**
 * Generate main data table
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View, FlatList} from 'react-native';

class Cell extends Component {}

export default class MainTable extends Component {
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
        const trainer = `Куратор: ${this.props.trainer}`;
        return (
            <View style={styles.wrapper}>
                <View  style={styles.title}>
                    <Text style={styles.titleFont}>Группа любителей шпилей</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={[styles.titleFont, styles.cell]}>Агент</Text>
                    <Text style={[styles.titleFont, styles.cell]}>Сумма, р.</Text>
                    <Text style={[styles.titleFont, styles.cell]}>Комментарий</Text>
                </View>
                <View>
                    <FlatList
                    data={this.props.data}
                    renderItem={({item}) => {
                    return (
                    <TouchableHighlight onPress={() => this.props.onTouch(item.id)} style={styles.container}>
                        <View style={styles.container}>
                            <Text style={[styles.instructions, styles.cell]}>{item.name}</Text>
                            <Text style={[styles.instructions, styles.cell]}>{item.sum}</Text>
                            <Text style={[styles.instructions, styles.cell]}>{item.text}</Text>
                        </View>
                    </TouchableHighlight>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                <View  style={styles.ending}>
                    <Text style={styles.titleFont}>{trainer}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    columns: {
      flex: 0.05,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'pink',
    },
    title: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'powderblue',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'skyblue',
    },
    cell:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    ending: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
    },
    titleFont: {
      fontSize: 17,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      fontSize: 15,
      textAlign: 'center',
      color: 'black',
      marginBottom: 5,
    },
  });
  