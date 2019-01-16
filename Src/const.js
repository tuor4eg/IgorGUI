/**
 * List of consts
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

 export const menuButtonsList = {
     button1: 'Главная',
     button2: 'Группы',
     button3: 'Пользователи',
     button4: 'Настройки',
 };

 export const userRoles = {
    roles: ['admin', 'user'],
    roleLabels: ['Администратор', 'Пользователь']
 };

 export const errorCodes = {
     401: 'Неверное имя пользователя или пароль!',
     409: 'Такой пользователь существует!',
     600: 'Должен остаться хотя бы один администратор!',
     601: 'Нельзя удалить единственного администратора!'
 }

 export const colors = {
     orange: '#FDC423',
     grey: '#404040'
 }