/**
 * Igor Project V 1 alpha
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
//Import Components
import MainTable from './Src/MainTable.js';
import EditForm from './Src/EditForm.js';
import AddRecordForm from './Src/AddRecordForm.js';
import AuthForm from './Src/AuthForm.js';
import ServerApi from './Src/ServerAPI.js';
import MainMenu from './Src/MainMenu.js';
import HomePage from './Src/HomePage.js';
import GroupList from './Src/GroupList.js';
import UserList from './Src/UserList.js';
//Import Constants
import * as consts from './Src/const.js'

const host = 'http://192.168.17.108:3000';
const token = '123';

const menu = consts.menuButtonsList;

const api = new ServerApi(host, token);

export default class App extends Component {
  state = {
    //user options
    auth: 'Admin',
    role: 'none',
    userList: [],
    tempAuth: {login: null, pass: null},
    //group options
    groupList: [],
    //navigation
    loadScreen: menu.button1,
    addRecord: 'none',
    loading: false,
    showModal: false,
    //data
    data: [],
    tempData: {id: null, name: null, sum: null, text: null},
    trainer: 'В. Куролесов',
    //other
    error: null
  }

  componentDidMount() {
    //this.getData();
  }

//=====State fuctions=====

//==User auth==

onEnterAuth = (data, key) => {
  const tempAuth = this.state.tempAuth;
  tempAuth[key] = data;
  this.setState({tempAuth});
}

loginUser = async () => {
  this.setState({loading: true});
  try {
    const response = await api.authUser(this.state.tempAuth);
    this.setState({loading: false, auth: response.name, role: response.role, tempAuth: {login: null, pass: null}});
  }
  catch(error) {
    this.setState({loading: false, error });
  }
}

//=====Main menu actions=====

onPressMenu = async (name) => {
  switch(name) {
    case(menu.button2):
      await this.getGroupList();
      break;
    case(menu.button3):
      await this.getUserList();
      break;
  }
  this.setState({loadScreen: name});
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

//=====Modal functions=====

  onClickModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

//=====Secondary functions=====

  getRecord = (id) => this.state.data.filter(item => item.id === id);

  clearTmp = () => Object.keys(this.state.tempData).reduce((acc, element) => ({...acc, [element]: null}), {});

//=====Render functions=====

  renderAuthForm =() => {
    return (
      <AuthForm loginUser={this.loginUser} onEnterAuth={this.onEnterAuth}/>
    );
  }

  renderScreen = () => {
    switch(this.state.loadScreen) {
      case(menu.button1):
        return(
          <HomePage />
        );
      case(menu.button2):
      return(
        <GroupList groupList={this.state.groupList} onClickModal={this.onClickModal} display={this.state.showModal}/>
      );
      case(menu.button3):
      return(
        <UserList userList={this.state.userList}/>
      );
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



//NADO VSE PEREPISAT!!!!!!

  async getData() {
    this.setState({loading: true});
    try {
      const getData = await api.getData();
      this.setState({data: getData, tempData: this.clearTmp(), addRecord: 'none', loadScreen: menu.button1})
    }
    catch(error) {
      this.setState({loading: false, error });
    }
 }

  onTouch = (id) => {
    const [data] = this.getRecord(id);
    this.setState({ loadScreen: id, tempData: data });
  }

  onChange = (data, key) => {
    const tempData = this.state.tempData;
    tempData[key] = data
    this.setState({tempData});
  }

  editRecord = async (check) => {
    const temp = this.state.tempData;
    if (check) {
      this.setState({loading: true});
      try {
        await api.patchData(temp);
        await this.getData();
        this.setState({loading: false});
      }
      catch(error) {
        this.setState({loading: false, error });
      }
    }
    this.setState({ loadScreen: 'home', tempData: this.clearTmp()});
  }

  addRecord = async (check) => {
    const {name, sum, text} = this.state.tempData;
    if (check) {
      if (!name) {
        Alert.alert('Введите имя!');
        return;
      }
      this.setState({loading: true});
      try {
        await api.postData({name, sum, text});
        await this.getData();
        this.setState({loading: false});
      }
      catch(error) {
        this.setState({loading: false, error });
      }
    }
    this.setState({tempData: this.clearTmp(), addRecord: 'none'});
  }

  deleteRecord = async (id) => {
    this.setState({loading: true});
    try {
      await api.deleteData(id);
      await this.getData();
      this.setState({loading: false});
    }
    catch(error) {
      this.setState({loading: false, error });
    }
    this.setState({ loadScreen: 'home', tempData: this.clearTmp()});
  }



  renderAddForm = () => {
    return(
      <AddRecordForm temp={this.state.tempData} onChange={this.onChange} addRecord = {this.addRecord}/>
    );

  };

  renderMainTable = () => {
    return (
       <ScrollView style={styles.wrapper} keyboardShouldPersistTaps='never'>
          <MainTable data={this.state.data} onTouch={this.onTouch} trainer={this.state.trainer}/>
          <Button
            onPress={() => this.setState({addRecord: 'active'})}
            title="Добавить запись"
            />
          <Button
            onPress={() => this.setState({auth: 'none', role: 'none'})}
            title="Выйти"
            />
          <Text>Вы авторизованы под {this.state.auth}</Text>
        </ScrollView>
    );
  };

  renderEditForm = () => {
    return (
      <EditForm 
      editRecord={this.editRecord} 
      temp={this.state.tempData}
      onChange={this.onChange}
      deleteRecord={this.deleteRecord}/>
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