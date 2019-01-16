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
        height: 56,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 30
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 56
    },
    twoLineCell: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 16,
        color: colors.grey,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingRight: 16
    },
    cellTextSecond: {
        flex: 1,
        fontSize: 14,
        color: colors.grey,
        textAlign: 'left',
    },
    titleText: {
        flex: 1,
        fontSize: 18,
        color: colors.grey,
        textAlign: 'left',
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
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16,
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
    },
    textInput: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 12

    },
    textInputLabel: {
        fontSize: 14,
        paddingLeft: 12,
        paddingTop: 2

    },
    textInputField: {
        paddingTop: 16,
        height: 72,
        paddingRight: 16
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    cardInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    picker: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
    },
    fab: {
        height: 56, 
        width: 56, 
        borderRadius: 28, 
        backgroundColor: 
        colors.orange, 
        justifyContent: 'center', 
        alignItems: 'center', 
        elevation: 5
    }
});