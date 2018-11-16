/**
 * Connection's API to server
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

const query = {
    user: {
        auth: '/user/auth',
        list: '/user/list'
    },
    group: {
        list: '/group/list',
        add: '/group/add'
    },
    getData: '/data',
    postData: '/data/post',
    patchData: '/data/patch/',
    deleteData: '/data/delete/'
}

export default class ServerApi {
    constructor(host, token) {
        this.host = host;
        this.token = token;
    }

//=====User's section=====

    async authUser(user) {
        const res = await fetch(`${this.host}${query.user.auth}`, {
            method: 'POST',
            headers: {
              'token': this.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const [response] = await res.json();
        return response;
    }

    async getUserList() {
        const res = await fetch(`${this.host}${query.user.list}`, {
            method: 'GET',
            headers: {
              'token': this.token,
            },
        });
        const userList = await res.json();
        return userList;
    }

//=====Group's section=====

//==Get list of groups==

    async getGroupList() {
        const res = await fetch(`${this.host}${query.group.list}`, {
            method: 'GET',
            headers: {
              'token': this.token,
            },
        });
        const groupList = await res.json();
        return groupList;
    }

//==Add group to database==

    async addGroup(data) {
        const res = await fetch(`${this.host}${query.group.add}`, {
            method: 'POST',
            headers: {
              'token': this.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
           });
        const answer = await res.text();
        return answer;
    }

//==Show group's students==

    async getStudentList(id) {
        const res = await fetch(`${this.host}${query.group.list}/${id}`, {
            method: 'GET',
            headers: {
              'token': this.token,
            },
        });
        const studentList = await res.json();
        return studentList;
    }

//==Add student into group==

async addStudent(data) {
    const res = await fetch(`${this.host}${query.group.add}/${data.id}`, {
        method: 'POST',
        headers: {
          'token': this.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
       });
    const answer = await res.text();
    return answer;
}

//NADO VSE PEREPISAT!!!!!!!!!!!!!!!!!!!!!!

    async getData() {
        const res = await fetch(`${this.host}${query.getData}`, {
            method: 'GET',
            headers: {
              'token': this.token
            }
          });
        const getData = await res.json();
        return getData;
    }

    async postData(data) {
        const res = await fetch(`${this.host}${query.postData}`, {
            method: 'POST',
            headers: {
              'token': this.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
           });
        const answer = await res.text();
        return answer;
    }

    async patchData(data) {
        const res = await fetch(`${this.host}${query.patchData}${data.id}`, {
            method: 'PATCH',
            headers: {
              'token': this.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
           });
        const answer = await res.text();
        return answer;
    }

    async deleteData(id) {
        const res = await fetch(`${this.host}${query.deleteData}${id}`, {
            method: 'DELETE',
            headers: {
              'token': this.token
            }
           });
        const answer = await res.text();
        return answer;
    }
}