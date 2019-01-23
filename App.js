/**
 * Igor Project V 1 alpha
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View, Alert, TouchableHighlight, Text } from 'react-native';
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
import UserFormCreate from './Src/UserFormCreate.js';
import SetupForm from './Src/SetupForm.js';
import CashFlowList from './Src/CashFlowList.js';
import TrainingForm from './Src/TrainingForm.js';
//Import Constants
import * as consts from './Src/const.js';

const host = 'http://192.168.17.108:3000';
const token = '123';

const menu = consts.menuButtonsList;
const errorCodes = consts.errorCodes;
const colors = consts.colors;

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
    //training options
    trainingList: [],
    firstDate: new Date().setHours(0, 0, 0, 0),
    lastDate: new Date().setHours(24, 0, 0, 0),
    //cashflow options
    cashflows: [],
    //navigation
    loadScreen: menu.button1,
    button: menu.button1,
    loading: false,
    showModal: false,
    showCalendar: false,
    calendarMarks: {},
    //data
    data: [],
    tmp: {},
    //other
    error: null
  }

  componentDidMount() {
    this.getTrainingList(this.state.firstDate, this.state.lastDate);
  }

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

onChangeArray = (data, id, key) => {
  const cashflows = this.state.cashflows;
  const [getStudent] = cashflows.filter(item => item.id === id);
  cashflows[cashflows.indexOf(getStudent)][key] = key === 'checkbox' ? data === true ? 1 : 0 : data;
  this.setState({cashflows});
}

onClickModal = () => this.setState({showModal: !this.state.showModal});

onClickCalendar = () => this.setState({showCalendar: !this.state.showCalendar});

changeDate = (date) => this.setState({firstDate: new Date(date).setHours(0, 0, 0, 0), lastDate: new Date(date).setHours(24, 0, 0, 0)});

makeTwoDigits = digit => digit.toString().length === 2 ? digit : `0${digit}`;

//=====User's section=====

//==User auth==

loginUser = async () => {
  this.setState({loading: true});
  try {
    const response = await api.authUser(this.state.tmp);
    if (errorCodes[response]) {
      Alert.alert(errorCodes[response]);
    return;
    }
    this.setState({loading: false, auth: response.name, role: response.role, tmp: {}});
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

//==Add user==

addUser = async() => {
  const {userName, login, role, openPassword} = this.state.tmp;
  if (!userName || !login || !openPassword) {
    Alert.alert('Заполните данные!');
    return;
  }
  this.setState({loading: true});
  try {
    const answer = await api.addUser({userName, login, role, openPassword});
    if (answer !== 200) {
      Alert.alert(errorCodes[answer]);
      return;
    }
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}});
  this.onClickModal();
}

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
  this.setState({loading: true});
  try {
    const answer = await api.editUser(this.state.tmp);
    if (answer !== 200) {
      Alert.alert(errorCodes[answer]);
      return;
    }
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button3});
}

deleteUser = async(id) => {
  this.setState({loading: true});
  try {
    const answer = await api.deleteUser(id);
    if (answer !== 200) {
      Alert.alert(errorCodes[answer]);
      return;
    }
    await this.getUserList();
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button3});
}

//=====Group section=====

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

//==Adding group==

addGroup = async () => {
  const {groupName, groupTrainer} = this.state.tmp;
  const trainerId = groupTrainer ? groupTrainer : this.state.userList[0].id;
  if (!groupName) {
    Alert.alert('Введите название!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.addGroup({groupName, trainerId});
    await this.getGroupList();
    await this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button2});
  this.onClickModal();
}

//==Adding student==

addStudent = async (groupId) => {
  const {studentName} = this.state.tmp;
  if (!studentName) {
    Alert.alert('Введите имя!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.addStudent({groupId, studentName});
    await this.getStudentList(groupId);
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
  if (!groupName || groupName === '') {
    Alert.alert('Введите имя!');
    return;
  }
  this.setState({loading: true});
  try {
    await api.editGroup({groupId, groupName, trainerId});
    await this.getGroupList();
    await this.getStudentList(groupId);
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: groupId});
}

//=====Training section=====

getTrainingList = async(firstDate, lastDate, statement) => {
  this.setState({loading: true});
  try {
    const unMappedList = await api.getTrainingList(firstDate, lastDate, statement);
    const trainingList = unMappedList.map(item => {
      item.training_date = new Date(item.training_date);
      return item;
    });
    this.setState({loading: false, trainingList});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

addTraining =  async() => {
  const tmp = this.state.tmp;
  const {groupId, trainerId, date} = tmp;
  const getTrainerId = trainerId ? trainerId : this.state.userList[0].id;
  const getGroupId = groupId ? groupId : this.state.groupList[0].groups_id;
  const getDate = date ? date : new Date();
  this.setState({loading: true});
  try {
    await api.addTraining({'trainerId': getTrainerId, 'groupId': getGroupId, 'date': getDate.getTime()});
    await this.getTrainingList(this.state.firstDate, this.state.lastDate);
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({tmp: {}, loadScreen: menu.button1, showModal: false});
}

editTraining = async () => {
  const {groupId, trainerId, date} = this.state.tmp;
  this.setState({loading: true});
  try {
    await api.editTraining ({groupId, trainerId, 'date': date.getTime()});
    await this.returnCashFlows(this.state.tmp.id);
    await this.getTrainingList(this.state.firstDate, this.state.lastDate);
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({loadScreen: menu.button1, tmp: {}});
}

cancelTraining = async (id) => {
  this.setState({loading: true});
  try {
    await api.cancelTraining(id);
    await this.getTrainingList(this.state.firstDate, this.state.lastDate);
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
  this.setState({loadScreen: menu.button1, tmp: {}});
}

getCalendarMarks = async() => {
  this.setState({loading: true});
  try{
    const calendarMarks = await api.getCalendarMarks();
    this.setState({loading: false, calendarMarks});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

//=====Cashflow's section======

getCashFlows = async (id) => {
  this.setState({loading: true});
  try {
    const cashflows = await api.getCashFlows(id);
    this.setState({loading: false, cashflows});
  }
  catch(error) {
    this.setState({loading: false, error});
  }
}

returnCashFlows = async(id) => {
  this.setState({loading: true});
  try {
    await api.returnCashFlows(this.state.cashflows, id);
    this.setState({loading: false});
  }
  catch(error) {
    this.setState({loading: false, error});
  }
}

//=====Pressing section=====

onPressGroup = async (id) => {
  await this.getStudentList(id);
  this.setState({loadScreen: id});
}

onPressAddGroup = async () => {
  await this.getUserList();
  const trainerId = this.state.userList[0].id
  this.setState({loadScreen: {'group': 'new'}, showModal: true, tmp:{trainerId, 'groupId': 'new'}});
}

onPressAddUser = async () => {
  this.setState({loadScreen: {'user': 'new'}, showModal: true, tmp: {'id': 'new'}});
}

cancelAddGroup = (id) => {
  return id === 'new' ? this.setState({tmp: {}, loadScreen: menu.button2, showModal: false}) : this.setState({tmp: {}, loadScreen: id, showModal: false});
}

cancelAddUser = () => {
  this.setState({tmp: {}, loadScreen: menu.button3, showModal: false});
}

onPressEditGroup = async (id) => {
  await this.getUserList();
  const [getGroup] = this.state.groupList.filter(item => item.groups_id === id);
  this.setState({loadScreen: {'group': id}, tmp: {'groupId': id, 'groupName': getGroup.groups_name, 'trainerId': getGroup.users_id}, showModal: true})
}

onPressUser = async (id) => {
  await this.getUserList();
  const currentUser = this.state.userList.filter(item => item.id === id)[0];
  this.setState({loadScreen: {'user': id}, tmp: currentUser});
}

onPressStudent = async (id, name, groupId) => {
  await this.getGroupList();
  this.setState({loadScreen: {'student': id}, tmp: {'studentName': name, groupId, id}});
}

onPressAddStudent = async (groupId) => {
  this.setState({loadScreen: {'student': 'new'}, showModal: true, tmp: {'id': 'new', groupId}});
}

cancelAddStudent = (groupId) => {
  this.setState({tmp: {}, loadScreen: groupId, showModal: false});
}

onPressTraining = async (id) => {
  const [getTraining] = this.state.trainingList.filter(item => item.training_id === id);
  const {training_date, group_name, trainer_id, trainer_name, groups_id} = getTraining;
  await this.getUserList();
  await this.getCashFlows(id);
  this.setState({loadScreen: {'cashflows': id}, tmp: {
    'id': id,
    'groupId': groups_id, 
    'trainerId': trainer_id, 
    'trainerName': trainer_name, 
    'groupName': group_name,
    'date': new Date(training_date),
    'cashflows': []
  }});
}

onPressAddTraining = async () => {
  await this.getUserList();
  await this.getGroupList();
  const trainerId = this.state.userList[0].id;
  const groupId = this.state.groupList[0].id;
  this.setState({loadScreen: {'training': 'new'}, showModal: true, tmp: {'id': 'new', groupId, trainerId}});
}

cancelAddTraining = () => {
  this.setState({tmp: {}, loadScreen: menu.button1, showModal: false});
}

onPressExit = () => {
  this.setState({auth: 'none', role: 'none'});
}

//=====Main menu actions=====

onPressMenu = async (name) => {
  switch(name) {
    case(menu.button1):
    this.getTrainingList(this.state.firstDate, this.state.lastDate);
    case(menu.button2):
      await this.getGroupList();
      await this.getUserList();
      break;
    case(menu.button3):
      await this.getUserList();
      break;
  }
  this.setState({loadScreen: name, button: name, tmp: {}});
  if (this.state.showModal) {
    this.onClickModal();
  }
  if (this.state.showCalendar) {
    this.onClickCalendar();
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
      onPressMenu={this.onPressMenu}
      onPressEditGroup={this.onPressEditGroup}
      groupId={id}
      studentList={this.state.studentList}
      onClickModal={this.onClickModal}
      onEnterField={this.onEnterField}
      tmp={this.state.tmp}
      display={this.state.showModal}
      addStudent={this.addStudent}
      onPressStudent={this.onPressStudent}
      onPressAddStudent={this.onPressAddStudent}
      />
    );
  }

  renderGroupList = () => {
    return(
      <GroupList 
      groupList={this.state.groupList}
      onEnterField={this.onEnterField} 
      tmp={this.state.tmp}
      userList={this.state.userList}
      getUserList={this.getUserList}
      onPressAddGroup={this.onPressAddGroup}
      onPressGroup={this.onPressGroup}
      getGroupList={this.getGroupList}
      loading={this.state.loading}/>
    );
  }

  renderGroupForm = () => {
   return (
    <GroupForm
    addGroup={this.addGroup}
    cancelAddGroup={this.cancelAddGroup}
    editGroup={this.editGroup}
    tmp={this.state.tmp}
    onEnterField={this.onEnterField}
    userList={this.state.userList}
    />
   );
  };

  renderUserFormCreate = () => {
    return(
      <UserFormCreate
      onEnterField={this.onEnterField} 
      tmp={this.state.tmp}
      userList={this.state.userList}
      addUser={this.addUser}
      cancelAddUser={this.cancelAddUser}
      />
    );
  }

  renderStudentForm = () => {
    return(
      <StudentForm
      editStudent={this.editStudent}
      addStudent={this.addStudent}
      deleteStudent={this.deleteStudent}
      onEnterField={this.onEnterField}
      tmp={this.state.tmp}
      groupList={this.state.groupList}
      cancelAddStudent={this.cancelAddStudent}
      />
    );
  }

  renderUserForm = () => {
    return(
      <UserForm 
      tmp={this.state.tmp}
      onEnterField={this.onEnterField}
      editUser={this.editUser}
      deleteUser={this.deleteUser}
      addUser={this.addUser}
      cancelAddUser={this.cancelAddUser}
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
      onPressUser={this.onPressUser}
      onPressAddUser={this.onPressAddUser}/>
    );
  }

  renderHomePage = () => {
    return (
      <HomePage
      firstDate={this.state.firstDate}
      lastDate={this.state.lastDate}
      display={this.state.showModal}
      showCalendar={this.state.showCalendar}
      calendarMarks={this.state.calendarMarks}
      getCalendarMarks={this.getCalendarMarks}
      changeDate={this.changeDate}
      onClickModal={this.onClickModal}
      onClickCalendar={this.onClickCalendar}
      trainingList={this.state.trainingList}
      tmp={this.state.tmp}
      onEnterField={this.onEnterField}
      userList={this.state.userList}
      groupList={this.state.groupList}
      getGroupList={this.getGroupList}
      getUserList={this.getUserList}
      getTrainingList={this.getTrainingList}
      onPressAddTraining={this.onPressAddTraining}
      onPressTraining={this.onPressTraining}/>
    );
  }

  renderCashFlowList = () => {
    return (
      <CashFlowList
      cashflows={this.state.cashflows}
      onClickModal={this.onClickModal}
      display={this.state.showModal}
      editTraining={this.editTraining}
      cancelTraining={this.cancelTraining}
      userList={this.state.userList}
      onChangeArray={this.onChangeArray}
      tmp={this.state.tmp}
      onEnterField={this.onEnterField}
      onPressMenu={this.onPressMenu}
      />
    );
  }

  renderTrainingForm = () => {
    return(
      <TrainingForm
      tmp={this.state.tmp}
      onEnterField={this.onEnterField}
      addTraining={this.addTraining}
      editTraining={this.editTraining}
      groupList={this.state.groupList}
      userList={this.state.userList}
      cancelTraining={this.cancelTraining}
      cancelAddTraining={this.cancelAddTraining}
      />
    );
  }

  renderScreen = () => {
    //shitcode need to rewrite ABSOLUTELY!
    const loadScreen = this.state.loadScreen;
    if (loadScreen.student) {
      return this.renderStudentForm();
    }
    if (loadScreen.user) {
      return this.renderUserForm();
    }
    if (loadScreen.group) {
      return this.renderGroupForm();
    }
    if (loadScreen.cashflows) {
      return this.renderCashFlowList();
    }
    if (loadScreen.training) {
      return this.renderTrainingForm();
    }
    switch(loadScreen) {
      case(menu.button1):
        return this.renderHomePage();
      case(menu.button2):
        return this.renderGroupList();
      case(menu.button3):
        return this.renderUserList();
      case(menu.button4):
          return(
            <SetupForm 
            onPressExit={this.onPressExit}/>
          );
      default:
        return this.renderStudentList(loadScreen);
    }
  }

//==Main render==

  render() {
    if (this.state.auth === 'none') {
      return(this.renderAuthForm());
    }
    const hideMenu = this.state.showModal ? null : <MainMenu onPressMenu={this.onPressMenu} button={this.state.button}/>;
    return(
      <View style={styles.overwrapper}>
        {this.renderScreen()}
        {hideMenu}
      </View>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  overwrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});