/**
 * Connection's API to server
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

const query = {
    user: {
        authUser: '/login',
    },
    group: {
        getGroupList: '/groups'
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
        const res = await fetch(`${this.host}${query.user.authUser}`, {
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

//=====Group's section=====

    async getGroupList() {
        const res = await fetch(`${this.host}${query.group.getGroupList}`, {
            method: 'GET',
            headers: {
              'token': this.token,
            },
        });
        const groupList = await res.json();
        return groupList;
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