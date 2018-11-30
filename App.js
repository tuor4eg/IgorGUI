/**
 * Igor Project V 1 alpha
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View, Alert  } from 'react-native';
//Import Components
import AuthForm from './Src/AuthForm.js';
import ServerApi from './Src/ServerAPI.js';
import MainMenu from './Src/MainMenu.js';
import HomePage from './Src/HomePage.js';
import GroupList from './Src/GroupList.js';
import GroupForm from './Src/GroupForm.js';
import UserList from './Src/UserList.js';
import StudentList from './Src/StudentList.js';
import StudentForm from './Src/StudentForm.js';
import UserForm from './Src/UserForm.js';
import SetupForm from './Src/SetupForm.js';
//Import Constants
import * as consts from './Src/const.js';

const host = 'http://192.168.17.108:3000';
const token = '123';

const menu = consts.menuButtonsList;

const api = new ServerApi(host, token);

export default class App extends Component {
  state = {
    //user options
    auth: 'Admin',
    role: 'admin',
    userList: [],
    //group options
    groupList: [],
    studentList: [],
    //navigation
    loadScreen: menu.button1,
    loading: false,
    showModal: false,
    //data
    data: [],
    tmp: {},
    //other
    error: null
  }

  /*componentDidMount() {

  }*/

//=====State fuctions=====

onEnterField = (data, key) => {
  const tmp = this.state.tmp;
  if (tmp[key]) {
    tmp[key] = data;
    this.setState({tmp});
    return;
  }
  const newTmp = {...tmp, [key]: data};
  this.setState({tmp: newTmp});
}

onClickModal = () => {
  this.setState({showModal: !this.state.showModal});
}

//==User auth==

loginUser = async () => {
  this.setState({loading: true});
  try {
    const response = await api.authUser(this.state.tmp);
    if (response.length === 0) {
      Alert.alert('Неверное имя пользователя или пароль!');
    return;
    }
    this.setState({loading: false, auth: response.name, role: response.role, tmp: {}});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

addUser = async() => {
  const {userName, login, role, openPassword} = this.state.tmp;
  if (!userName || !login || !openPassword) {
    Alert.alert('Заполните данные!');
    return;
  }
  const checkUniqueLogin = this.state.userList.filter(item.login === login);
  if (checkUniqueLogin.length !== 0) {
    Alert.alert('Такой пользователь существует!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.addUser({userName, login, role, openPassword});
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}});
  this.onClickModal();
}

checkForOnlyAdmin = () => this.state.userList.filter(item => item.id !== this.state.id && item.role === 'admin');

editUser = async() => {
  const {name, login, role, openPassword} = this.state.tmp;
  if (!name || !login) {
    Alert.alert('Заполните данные!');
    return;
  }
  if ( openPassword === '') {
    Alert.alert('Укажите пароль!');
    return;
  }
  if (this.checkForOnlyAdmin().length === 0 && role != 'admin') {
    Alert.alert('Должен остаться хотя бы один администратор!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.editUser(this.state.tmp);
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button3});
}

deleteUser = async(id) => {
  if (this.checkForOnlyAdmin().length === 0) {
    Alert.alert('Нельзя удалить единственного администратора!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.deleteUser(id);
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button3});
}

onPressUser = async (id) => {
    await this.getUserList();
    const currentUser = this.state.userList.filter(item => item.id === id)[0];
    this.setState({loadScreen: {'user': id}, tmp: currentUser});
}

//=====Group section=====

//==Adding group==

addGroup = async () => {
  const {groupName, groupTrainer} = this.state.tmp;
  const trainerId = groupTrainer ? groupTrainer.id : this.state.userList[0].id;
  if (!groupName) {
    Alert.alert('Введите имя!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.addGroup({groupName, trainerId});
    await this.getGroupList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}});
  this.onClickModal();
}

//==Adding student==

addStudent = async (id) => {
  const {studentName} = this.state.tmp;
  if (!studentName) {
    Alert.alert('Введите имя!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.addStudent({id, studentName});
    await this.getStudentList(id);
    this.setState({loading: false})
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}});
  this.onClickModal();
}

//==Editing student==

editStudent = async (id) => {
  const {studentName, groupId} = this.state.tmp;
  if (!studentName) {
    Alert.alert('Введите имя!');
    return;
  }
  const currentGroup = this.state.studentList.filter(item => item.id === id)[0].groupId;
  this.setState({loading: true});
  try {
    await api.editStudent({id, studentName, groupId});
    await this.getStudentList(currentGroup);
    this.setState({loading: false})
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: currentGroup});
}

//==Deleting student==

deleteStudent = async (id) => {
  const {groupId} = this.state.tmp;
  this.setState({loading: true});
  try {
    await api.deleteStudent(id);
    await this.getStudentList(groupId);
    this.setState({loading: false})
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: groupId});
}

//==Show group's students==

getStudentList = async (id) => {
  this.setState({loading: true});
  try {
    const studentList = await api.getStudentList(id);
    this.setState({loading: false, studentList});
  }
  catch {
    this.setState({loading: false, error });
  }
}

//==Delete group==

deleteGroup = async (id) => {
  this.setState({loading: true});
  await this.getStudentList(id);
  const checkForStudents = this.state.studentList.filter(item => item.groupId === id);
  if (checkForStudents.length !== 0) {
    Alert.alert('В группе есть пользователи!');
    return;
  }
  try {
    await api.deleteGroup(id);
    await this.getGroupList();
    this.setState({loading: false})
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button2});
}

editGroup = async () => {
  const {groupId, groupName, trainerId} = this.state.tmp;
  if (!groupName) {
    Alert.alert('Введите имя!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.editGroup({groupId, groupName, trainerId});
    await this.getStudentList(groupId);
    this.setState({loading: false})
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: groupId});
}

onPressGroup = async (id) => {
  await this.getStudentList(id);
  this.setState({loadScreen: id});
}

onPressEditGroup = async (id) => {
  await this.getUserList();
  const [getGroup] = this.state.groupList.filter(item => item.groups_id === id);
  this.setState({loadScreen: {'group': id}, tmp: {'groupId': id, 'groupName': getGroup.groups_name, 'trainerId': getGroup.users_id}})
}

onPressStudent = async (id, name, groupId) => {
  await this.getGroupList();
  this.setState({loadScreen: {'student': id}, tmp: {'studentName': name, 'groupId': groupId}});
}

//=====Main menu actions=====

onPressMenu = async (name) => {
  switch(name) {
    case(menu.button2):
      await this.getGroupList();
      await this.getUserList();
      break;
    case(menu.button3):
      await this.getUserList();
      break;
  }
  this.setState({loadScreen: name, tmp: {}});
  if (this.state.showModal) {
    this.onClickModal();
  }
}

getGroupList = async () => {
  this.setState({loading: true});
  try {
    const groupList = await api.getGroupList();
    this.setState({loading: false, groupList: groupList});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

getUserList = async () => {
  this.setState({loading: true});
  try {
    const userList = await api.getUserList();
    this.setState({loading: false, userList: userList});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

//=====Render functions=====

  renderAuthForm =() => {
    return (
      <AuthForm loginUser={this.loginUser} onEnterField={this.onEnterField}/>
    );
  }

  renderStudentList = (id) => {
    return (
      <StudentList
      deleteGroup={this.deleteGroup}
      onPressEditGroup={this.onPressEditGroup}
      groupId={id}
      studentList={this.state.studentList}
      onClickModal={this.onClickModal}
      onEnterField={this.onEnterField}
      tmp={this.state.tmp}
      display={this.state.showModal}
      addStudent={this.addStudent}
      onPressStudent={this.onPressStudent}
      />
    );
  }

  renderGroupList = () => {
    return(
      <GroupList 
      groupList={this.state.groupList} 
      onClickModal={this.onClickModal} 
      display={this.state.showModal} 
      onEnterField={this.onEnterField} 
      tmp={this.state.tmp}
      userList={this.state.userList}
      getUserList={this.getUserList}
      addGroup={this.addGroup}
      onPressGroup={this.onPressGroup}/>
    );
  }

  renderGroupForm = () => {
   return (
    <GroupForm
    editGroup={this.editGroup}
    tmp={this.state.tmp}
    onEnterField={this.onEnterField}
    userList={this.state.userList}/>
   );
 }
  renderStudentForm = () => {
    return(
      <StudentForm
      studentId={this.state.loadScreen.student}
      editStudent={this.editStudent}
      deleteStudent={this.deleteStudent}
      onEnterField={this.onEnterField}
      tmp={this.state.tmp}
      groupList={this.state.groupList}/>
    );
  }

  renderUserForm = () => {
    return(
      <UserForm 
      tmp={this.state.tmp}
      onEnterField={this.onEnterField}
      editUser={this.editUser}
      deleteUser={this.deleteUser}
      />
    );
  }

  renderUserList = () => {
    return(
      <UserList
      onEnterField={this.onEnterField}
      display={this.state.showModal}
      onClickModal={this.onClickModal}
      tmp={this.state.tmp}
      addUser={this.addUser}
      userList={this.state.userList}
      onPressUser={this.onPressUser}/>
    );
  }

  renderScreen = () => {
    //shitcode need to rewrite ABSOLUTELY!
    if (this.state.loadScreen.student != undefined) {
      return this.renderStudentForm();
    }
    if (this.state.loadScreen.user != undefined) {
      return this.renderUserForm();
    }
    if (this.state.loadScreen.group != undefined) {
      return this.renderGroupForm();
    }
    switch(this.state.loadScreen) {
      case(menu.button1):
        return(
          <HomePage />
        );
      case(menu.button2):
        return this.renderGroupList();
      case(menu.button3):
        return this.renderUserList();
      case(menu.button4):
          return(
            <SetupForm />
          );
      default:
        return this.renderStudentList(this.state.loadScreen);
    }
  }

//==Main render==

  render() {
    if (this.state.auth === 'none') {
      return(this.renderAuthForm());
    }
    return(
      <View style={styles.overwrapper}>
        {this.renderScreen()}
        <Button
          onPress={() => this.setState({auth: 'none', role: 'none', loadScreen: menu.button1})}
          title="Выйти"
          />
        <MainMenu onPressMenu={this.onPressMenu}/>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'flex-start',
  },
  overwrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});