/**
 * Application's styles
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import {StyleSheet } from 'react-native';

import {colors} from './const.js';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.orange,
        height: 50,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 30
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cell: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    cellText: {
        fontSize: 16,
        color: colors.grey,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 18,
        color: colors.grey,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    topText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: colors.grey,
        marginLeft: '5%'
    },
    button: {
        height: 50,
        backgroundColor: colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 10
    },
      buttonText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white'
    }
});