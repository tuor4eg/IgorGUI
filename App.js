/**
 * Igor Project V 1 alpha
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
// Import Components
import AuthForm from './Src/AuthForm';
import ServerApi from './Src/ServerAPI';
import MainMenu from './Src/MainMenu';
import HomePage from './Src/HomePage';
import GroupList from './Src/GroupList';
import GroupForm from './Src/GroupForm';
import UserList from './Src/UserList';
import StudentList from './Src/StudentList';
import StudentForm from './Src/StudentForm';
import UserForm from './Src/UserForm';
import SetupForm from './Src/SetupForm';
import CashFlowList from './Src/CashFlowList';
import TrainingForm from './Src/TrainingForm';
import CashFlowForm from './Src/CashFlowForm';
// Import Constants
import * as consts from './Src/const';

import styles from './Src/styles';

const host = 'http://192.168.17.108:3000';
const token = '123';

const menu = consts.menuButtonsList;
const { errorCodes } = consts;

const api = new ServerApi(host, token);

export default class App extends Component {
  state = {
    // user options
    auth: 'Admin',
    role: 'admin',
    userList: [],
    // group options
    groupList: [],
    studentList: [],
    // training options
    trainingList: [],
    firstDate: new Date().setHours(0, 0, 0, 0),
    lastDate: new Date().setHours(24, 0, 0, 0),
    // cashflow options
    cashflows: [],
    // navigation
    loadScreen: menu.button1,
    loading: false,
    showModal: false,
    showCalendar: false,
    cashFlowModal: null,
    calendarMarks: {},
    tmp: {},
  };

  componentDidMount() {
    const { firstDate, lastDate } = this.state;
    this.getTrainingList(firstDate, lastDate);
  }

  //= ====State fuctions=====

  onEnterField = (data, key) => {
    const { tmp } = this.state;
    if (tmp[key]) {
      tmp[key] = data;
      this.setState({ tmp });
      return;
    }
    const newTmp = { ...tmp, [key]: data };
    this.setState({ tmp: newTmp });
  };

  onChangeArray = (data, id, key) => {
    const { cashflows } = this.state;
    const [getStudent] = cashflows.filter(item => item.id === id);
    if (key === 'checkbox') {
      cashflows[cashflows.indexOf(getStudent)][key] = data === true ? 1 : 0;
      this.setState({ cashflows });
      return;
    }
    cashflows[cashflows.indexOf(getStudent)][key] = data;
    this.setState({ cashflows });
  };

  onClickModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  onClickCalendar = () => {
    const { showCalendar } = this.state;
    this.setState({ showCalendar: !showCalendar });
  };

  changeDate = date => this.setState(
    {
      firstDate: new Date(date).setHours(0, 0, 0, 0),
      lastDate: new Date(date).setHours(24, 0, 0, 0),
    },
    this.reloadTrainings,
  );

  reloadTrainings = async () => {
    const { firstDate, lastDate } = this.state;
    await this.getTrainingList(firstDate, lastDate);
    this.onClickCalendar();
  };

  makeTwoDigits = digit => (digit.toString().length === 2 ? digit : `0${digit}`);

  //= ====User's section=====

  //= =User auth==

  loginUser = async () => {
    const { tmp } = this.state;
    this.setState({ loading: true });
    try {
      const response = await api.authUser(tmp);
      if (errorCodes[response]) {
        Alert.alert(errorCodes[response]);
        return;
      }
      this.setState({
        loading: false,
        auth: response.name,
        role: response.role,
        tmp: {},
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  getUserList = async () => {
    this.setState({ loading: true });
    try {
      const userList = await api.getUserList();
      this.setState({ loading: false, userList });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  //= =Add user==

  addUser = async () => {
    const { tmp } = this.state;
    const {
      userName, login, role, openPassword,
    } = tmp;
    if (!userName || !login || !openPassword) {
      Alert.alert('Заполните данные!');
      return;
    }
    this.setState({ loading: true });
    try {
      const answer = await api.addUser({
        userName,
        login,
        role,
        openPassword,
      });
      if (answer !== 200) {
        Alert.alert(errorCodes[answer]);
        return;
      }
      await this.getUserList();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {} });
    this.onClickModal();
  };

  editUser = async () => {
    const { tmp } = this.state;
    const {
      name, login, role, openPassword,
    } = tmp;
    if (!name || !login) {
      Alert.alert('Заполните данные!');
      return;
    }
    if (openPassword === '') {
      Alert.alert('Укажите пароль!');
      return;
    }
    this.setState({ loading: true });
    try {
      const answer = await api.editUser(tmp);
      if (answer !== 200) {
        Alert.alert(errorCodes[answer]);
        return;
      }
      await this.getUserList();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: menu.button3 });
  };

  deleteUser = async (id) => {
    this.setState({ loading: true });
    try {
      const answer = await api.deleteUser(id);
      if (answer !== 200) {
        Alert.alert(errorCodes[answer]);
        return;
      }
      await this.getUserList();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: menu.button3 });
  };

  //= ====Group section=====

  getGroupList = async () => {
    this.setState({ loading: true });
    try {
      const groupList = await api.getGroupList();
      this.setState({ loading: false, groupList });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  //= =Adding group==

  addGroup = async () => {
    const { tmp, userList } = this.state;
    const { groupName, groupTrainer } = tmp;
    const trainerId = groupTrainer || userList[0].id;
    if (!groupName) {
      Alert.alert('Введите название!');
      return;
    }
    this.setState({ loading: true });
    try {
      await api.addGroup({ groupName, trainerId });
      await this.getGroupList();
      await this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: menu.button2 });
    this.onClickModal();
  };

  //= =Adding student==

  addStudent = async (groupId) => {
    const { tmp } = this.state;
    const { studentName } = tmp;
    if (!studentName) {
      Alert.alert('Введите имя!');
      return;
    }
    this.setState({ loading: true });
    try {
      await api.addStudent({ groupId, studentName });
      await this.getStudentList(groupId);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {} });
    this.onClickModal();
  };

  //= =Editing student==

  editStudent = async (id) => {
    const { tmp, studentList } = this.state;
    const { studentName, groupId } = tmp;
    if (!studentName) {
      Alert.alert('Введите имя!');
      return;
    }
    const currentGroup = studentList.filter(item => item.id === id)[0].groupId;
    this.setState({ loading: true });
    try {
      await api.editStudent({ id, studentName, groupId });
      await this.getStudentList(currentGroup);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: currentGroup });
  };

  //= =Deleting student==

  deleteStudent = async (id) => {
    const { tmp } = this.state;
    const { groupId } = tmp;
    this.setState({ loading: true });
    try {
      await api.deleteStudent(id);
      await this.getStudentList(groupId);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: groupId });
  };

  //= =Show group's students==

  getStudentList = async (id) => {
    this.setState({ loading: true });
    try {
      const studentList = await api.getStudentList(id);
      this.setState({ loading: false, studentList });
    } catch {
      this.setState({ loading: false });
    }
  };

  //= =Delete group==

  deleteGroup = async (id) => {
    const { studentList } = this.state;
    this.setState({ loading: true });
    await this.getStudentList(id);
    const checkForStudents = studentList.filter(item => item.groupId === id);
    if (checkForStudents.length !== 0) {
      Alert.alert('В группе есть пользователи!');
      return;
    }
    try {
      await api.deleteGroup(id);
      await this.getGroupList();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: menu.button2 });
  };

  editGroup = async () => {
    const { tmp } = this.state;
    const { groupId, groupName, trainerId } = tmp;
    if (!groupName || groupName === '') {
      Alert.alert('Введите имя!');
      return;
    }
    this.setState({ loading: true });
    try {
      await api.editGroup({ groupId, groupName, trainerId });
      await this.getGroupList();
      await this.getStudentList(groupId);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: groupId });
  };

  //= ====Training section=====

  getTrainingList = async (firstDate, lastDate, statement) => {
    this.setState({ loading: true });
    try {
      const unMappedList = await api.getTrainingList(firstDate, lastDate, statement);
      const trainingList = unMappedList.map((item) => {
        const {
          groupId, groupName, trainerId, trainerName, trainingId,
        } = item;
        const trainingDate = new Date(Number(item.trainingDate));
        return {
          groupId,
          groupName,
          trainerId,
          trainerName,
          trainingId,
          trainingDate,
        };
      });
      this.setState({ loading: false, trainingList });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  addTraining = async () => {
    const {
      tmp, userList, groupList, firstDate, lastDate,
    } = this.state;
    const { groupId, trainerId, date } = tmp;
    const getTrainerId = trainerId || userList[0].id;
    const getGroupId = groupId || groupList[0].groups_id;
    const getDate = date || new Date();
    this.setState({ loading: true });
    try {
      await api.addTraining({
        trainerId: getTrainerId,
        groupId: getGroupId,
        date: getDate.getTime(),
      });
      await this.getTrainingList(firstDate, lastDate);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ tmp: {}, loadScreen: menu.button1, showModal: false });
  };

  editTraining = async () => {
    const { tmp, firstDate, lastDate } = this.state;
    const { groupId, trainerId, date } = tmp;
    this.setState({ loading: true });
    try {
      await api.editTraining({ groupId, trainerId, date: date.getTime() });
      await this.returnCashFlows(tmp.id);
      await this.getTrainingList(firstDate, lastDate);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ loadScreen: menu.button1, tmp: {} });
  };

  cancelTraining = async (id) => {
    const { firstDate, lastDate } = this.state;
    this.setState({ loading: true });
    try {
      await api.cancelTraining(id);
      await this.getTrainingList(firstDate, lastDate);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
    this.setState({ loadScreen: menu.button1, tmp: {} });
  };

  getCalendarMarks = async () => {
    this.setState({ loading: true });
    try {
      const calendarMarks = await api.getCalendarMarks();
      this.setState({ loading: false, calendarMarks });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  //= ====Cashflow's section======

  getCashFlows = async (id) => {
    this.setState({ loading: true });
    try {
      const cashflows = await api.getCashFlows(id);
      this.setState({ loading: false, cashflows });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  returnCashFlows = async (id) => {
    const { cashflows } = this.state;
    this.setState({ loading: true });
    try {
      await api.returnCashFlows(cashflows, id);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  addCashFlow = () => {
    console.log(this.state.tmp);
  };

  editCashFlow = () => {
    console.log('kek');
  };

  cancelCashFlowChanges = async (trainingId) => {
    await this.getCashFlows(trainingId);
    this.onPressTraining(trainingId);
  };

  //= ====Pressing section=====

  onPressGroup = async (id) => {
    await this.getStudentList(id);
    this.setState({ loadScreen: id, showModal: true });
  };

  onPressAddGroup = async () => {
    const { userList } = this.state;
    await this.getUserList();
    const trainerId = userList[0].id;
    this.setState({
      loadScreen: { group: 'new' },
      showModal: true,
      tmp: { trainerId, groupId: 'new' },
    });
  };

  onPressAddUser = async () => {
    this.setState({
      loadScreen: { user: 'new' },
      showModal: true,
      tmp: { id: 'new' },
    });
  };

  cancelAddGroup = id => (id === 'new'
    ? this.setState({ tmp: {}, loadScreen: menu.button2, showModal: false })
    : this.setState({ tmp: {}, loadScreen: id, showModal: false }));

  cancelAddUser = () => {
    this.setState({ tmp: {}, loadScreen: menu.button3, showModal: false });
  };

  onPressEditGroup = async (id) => {
    const { groupList } = this.state;
    await this.getUserList();
    const [getGroup] = groupList.filter(item => item.groupId === id);
    this.setState({
      loadScreen: { group: id },
      tmp: {
        groupId: id,
        groupName: getGroup.groupName,
        trainerId: getGroup.userId,
      },
      showModal: true,
    });
  };

  onPressUser = async (id) => {
    const { userList } = this.state;
    await this.getUserList();
    const [currentUser] = userList.filter(item => item.id === id);
    this.setState({ loadScreen: { user: id }, tmp: currentUser, showModal: true });
  };

  onPressStudent = async (id, name, groupId) => {
    await this.getGroupList();
    this.setState({
      loadScreen: { student: id },
      tmp: { studentName: name, groupId, id },
    });
  };

  onPressAddStudent = async (groupId) => {
    this.setState({
      loadScreen: { student: 'new' },
      showModal: true,
      tmp: { id: 'new', groupId },
    });
  };

  cancelAddStudent = (groupId) => {
    this.setState({ tmp: {}, loadScreen: groupId });
  };

  onPressTraining = async (trainingId) => {
    const { trainingList } = this.state;
    const [getTraining] = trainingList.filter(item => item.trainingId === trainingId);
    const {
      trainingDate, groupName, trainerId, trainerName, groupId,
    } = getTraining;
    await this.getUserList();
    await this.getCashFlows(trainingId);
    this.setState({
      loadScreen: { cashflows: trainingId },
      showModal: true,
      tmp: {
        trainingId,
        groupId,
        trainerId,
        trainerName,
        groupName,
        date: new Date(trainingDate),
      },
    });
  };

  onPressCashFlow = (cashflow) => {
    const { cashflows, tmp } = this.state;
    const { cashId, studentId, studentName } = cashflow;
    if (!cashId) {
      return this.setState({
        loadScreen: { singleCash: 'new' },
        tmp: {
          ...tmp,
          studentId,
          studentName,
          cashId: 'new',
        },
      });
    }
    const [getCashFlow] = cashflows.filter(item => item.cashId === cashId);
    const { sum, notice, checkbox } = getCashFlow;
    return this.setState({
      loadScreen: { singleCash: cashId },
      showModal: true,
      tmp: {
        ...tmp,
        sum,
        notice,
        checkbox,
        studentId,
        studentName,
        cashId,
      },
    });
  };

  onPressAddTraining = async () => {
    await this.getUserList();
    await this.getGroupList();
    const { userList, groupList } = this.state;
    const trainerId = userList[0].id;
    const { groupId } = groupList[0];
    this.setState({
      loadScreen: { training: 'new' },
      showModal: true,
      tmp: { trainingId: 'new', groupId, trainerId },
    });
  };

  onPressEditTraining = async (id) => {
    await this.getUserList();
    await this.getGroupList();
    const { trainingList } = this.state;
    const [getTraining] = trainingList.filter(item => item.trainingId === id);
    const { groupId, trainerId, trainingDate } = getTraining;
    this.setState({
      loadScreen: { training: id },
      showModal: true,
      tmp: {
        id,
        groupId,
        trainerId,
        trainingDate,
      },
    });
  };

  cancelAddTraining = () => {
    this.setState({ tmp: {}, loadScreen: menu.button1, showModal: false });
  };

  onPressExit = () => {
    this.setState({ auth: 'none', role: 'none', loadScreen: menu.button1 });
  };

  //= ====Main menu actions=====

  onPressMenu = async (name) => {
    const {
      firstDate, lastDate, showCalendar, showModal,
    } = this.state;
    switch (name) {
      case menu.button1:
        this.getTrainingList(firstDate, lastDate);
        break;
      case menu.button2:
        await this.getGroupList();
        await this.getUserList();
        break;
      case menu.button3:
        await this.getUserList();
        break;
      default:
        break;
    }
    this.setState({ loadScreen: name, tmp: {} });
    if (showModal) {
      this.onClickModal();
    }
    if (showCalendar) {
      this.onClickCalendar();
    }
  };

  //= ====Render functions=====

  renderAuthForm = () => <AuthForm loginUser={this.loginUser} onEnterField={this.onEnterField} />;

  renderStudentList = (id) => {
    const { studentList, showModal, tmp } = this.state;
    return (
      <StudentList
        deleteGroup={this.deleteGroup}
        onPressMenu={this.onPressMenu}
        onPressEditGroup={this.onPressEditGroup}
        groupId={id}
        studentList={studentList}
        onClickModal={this.onClickModal}
        onEnterField={this.onEnterField}
        tmp={tmp}
        display={showModal}
        addStudent={this.addStudent}
        onPressStudent={this.onPressStudent}
        onPressAddStudent={this.onPressAddStudent}
      />
    );
  };

  renderGroupList = () => {
    const {
      groupList, tmp, userList, loading,
    } = this.state;
    return (
      <GroupList
        groupList={groupList}
        onEnterField={this.onEnterField}
        tmp={tmp}
        userList={userList}
        getUserList={this.getUserList}
        onPressAddGroup={this.onPressAddGroup}
        onPressGroup={this.onPressGroup}
        getGroupList={this.getGroupList}
        loading={loading}
      />
    );
  };

  renderGroupForm = () => {
    const { tmp, userList } = this.state;
    return (
      <GroupForm
        addGroup={this.addGroup}
        cancelAddGroup={this.cancelAddGroup}
        editGroup={this.editGroup}
        tmp={tmp}
        onEnterField={this.onEnterField}
        userList={userList}
      />
    );
  };

  renderStudentForm = () => {
    const { tmp, groupList } = this.state;
    return (
      <StudentForm
        editStudent={this.editStudent}
        addStudent={this.addStudent}
        deleteStudent={this.deleteStudent}
        onEnterField={this.onEnterField}
        tmp={tmp}
        groupList={groupList}
        cancelAddStudent={this.cancelAddStudent}
      />
    );
  };

  renderUserForm = () => {
    const { tmp } = this.state;
    return (
      <UserForm
        tmp={tmp}
        onEnterField={this.onEnterField}
        editUser={this.editUser}
        deleteUser={this.deleteUser}
        addUser={this.addUser}
        cancelAddUser={this.cancelAddUser}
      />
    );
  };

  renderUserList = () => {
    const { showModal, tmp, userList } = this.state;
    return (
      <UserList
        onEnterField={this.onEnterField}
        display={showModal}
        onClickModal={this.onClickModal}
        tmp={tmp}
        addUser={this.addUser}
        userList={userList}
        onPressUser={this.onPressUser}
        onPressAddUser={this.onPressAddUser}
      />
    );
  };

  renderHomePage = () => {
    const {
      firstDate,
      lastDate,
      showModal,
      showCalendar,
      calendarMarks,
      trainingList,
      userList,
      groupList,
      tmp,
    } = this.state;
    return (
      <HomePage
        firstDate={firstDate}
        lastDate={lastDate}
        display={showModal}
        showCalendar={showCalendar}
        calendarMarks={calendarMarks}
        getCalendarMarks={this.getCalendarMarks}
        changeDate={this.changeDate}
        onClickModal={this.onClickModal}
        onClickCalendar={this.onClickCalendar}
        trainingList={trainingList}
        tmp={tmp}
        onEnterField={this.onEnterField}
        userList={userList}
        groupList={groupList}
        getGroupList={this.getGroupList}
        getUserList={this.getUserList}
        getTrainingList={this.getTrainingList}
        onPressAddTraining={this.onPressAddTraining}
        onPressTraining={this.onPressTraining}
      />
    );
  };

  renderCashFlowList = () => {
    const {
      cashflows, showModal, userList, tmp, cashFlowModal,
    } = this.state;
    return (
      <CashFlowList
        cashflows={cashflows}
        onClickModal={this.onClickModal}
        display={showModal}
        editTraining={this.editTraining}
        cancelTraining={this.cancelTraining}
        userList={userList}
        onChangeArray={this.onChangeArray}
        tmp={tmp}
        onEnterField={this.onEnterField}
        onPressMenu={this.onPressMenu}
        cashFlowModal={cashFlowModal}
        onPressCashFlow={this.onPressCashFlow}
        onPressEditTraining={this.onPressEditTraining}
      />
    );
  };

  renderTrainingForm = () => {
    const { tmp, groupList, userList } = this.state;
    return (
      <TrainingForm
        tmp={tmp}
        onEnterField={this.onEnterField}
        addTraining={this.addTraining}
        editTraining={this.editTraining}
        groupList={groupList}
        userList={userList}
        cancelTraining={this.cancelTraining}
        cancelAddTraining={this.cancelAddTraining}
      />
    );
  };

  renderCashFlowForm = () => {
    const { tmp } = this.state;
    return (
      <CashFlowForm
        tmp={tmp}
        onEnterField={this.onEnterField}
        addCashFlow={this.addCashFlow}
        editCashFlow={this.editCashFlow}
        cancelCashFlowChanges={this.cancelCashFlowChanges}
      />
    );
  };

  renderScreen = () => {
    // shitcode need to rewrite ABSOLUTELY!
    const { loadScreen } = this.state;
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
    if (loadScreen.singleCash) {
      return this.renderCashFlowForm();
    }
    switch (loadScreen) {
      case menu.button1:
        return this.renderHomePage();
      case menu.button2:
        return this.renderGroupList();
      case menu.button3:
        return this.renderUserList();
      case menu.button4:
        return <SetupForm onPressExit={this.onPressExit} />;
      default:
        return this.renderStudentList(loadScreen);
    }
  };

  //= =Main render==

  render() {
    const { auth, showModal, loadScreen } = this.state;
    if (auth === 'none') {
      return this.renderAuthForm();
    }
    const hideMenu = showModal ? null : (
      <MainMenu onPressMenu={this.onPressMenu} button={loadScreen} />
    );
    return (
      <View style={styles.overWrapper}>
        {this.renderScreen()}
        {hideMenu}
      </View>
    );
  }
}
