const querystring = require('querystring');
const { makeRequest } = require('../setting/api');
class UserModel {   
    static getUser(userID) {
        return makeRequest(`/api/v1/users/${userID}`, 'GET')
    }
    static getUsers(queryData) {
        const queryURL = querystring.stringify(queryData);
        return makeRequest(`/api/v1/users?${queryURL}`, 'GET');
    }
    static updateUser(userID, userDataToUpdate) {
        return makeRequest(`/api/v1/users/${userID}`, 'PATCH', userDataToUpdate);
    }
    static createUser(userData) {
        return makeRequest(`/api/v1/users/`, 'POST', userData)
    }
}

module.exports = UserModel;