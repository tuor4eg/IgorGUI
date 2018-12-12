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
        list: '/user/list',
        add: '/user/add',
        edit: '/user'
    },
    group: {
        list: '/group/list',
        add: '/group/add',
        edit: '/group'
    },
    student: {
        add: '/student/add',
        edit: '/student'
    },
    training: {
        list: '/training/list',
        add: '/training/add',
        edit: '/training'
    }
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
        const response = await res.json();
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

    async addUser(data) {
        const res = await fetch(`${this.host}${query.user.add}`, {
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

    async editUser(data) {
        const res = await fetch(`${this.host}${query.user.edit}/${data.id}`, {
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

    async deleteUser(id) {
        const res = await fetch(`${this.host}${query.user.edit}/${id}`, {
            method: 'DELETE',
            headers: {
            'token': this.token
            }
        });
        const answer = await res.text();
        return answer;
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

    async editGroup(data) {
        const res = await fetch(`${this.host}${query.group.edit}/${data.groupId}`, {
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


    async deleteGroup(id) {
        const res = await fetch(`${this.host}${query.group.edit}/${id}`, {
            method: 'DELETE',
            headers: {
            'token': this.token
            }
        });
        const answer = await res.text();
        return answer;
    }

//=====Student's section=====

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
        const res = await fetch(`${this.host}${query.student.add}/${data.id}`, {
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

//==Edit student==

    async editStudent(data) {
        const res = await fetch(`${this.host}${query.student.edit}/${data.id}`, {
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

//==Delete student==

    async deleteStudent(id) {
        const res = await fetch(`${this.host}${query.student.edit}/${id}`, {
            method: 'DELETE',
            headers: {
            'token': this.token
            }
        });
        const answer = await res.text();
        return answer;
    }

//=====Training sectios=====

    async getTrainingList(date) {
        const res = await fetch(`${this.host}${query.training.list}`, {
            method: 'GET',
            headers: {
                'token': this.token,
            },
        });
        const trainingList = await res.json();
        return trainingList;
    }

    async addTraining(data) {
        const res = await fetch(`${this.host}${query.training.add}`, {
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

    async editTraining(data) {
        const {groupId, date, trainerId} = data;
        const res = await fetch(`${this.host}${query.training.edit}/${data.id}`, {
            method: 'PATCH',
            headers: {
            'token': this.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({groupId, trainerId, 'date': date.toString()})
        });
        const answer = await res.text();
        return answer;
    }

    async cancelTraining(id) {
        const res = await fetch(`${this.host}${query.training.edit}/${id}`, {
            method: 'DELETE',
            headers: {
            'token': this.token
            }
        });
        const answer = await res.text();
        return answer;
    }

}