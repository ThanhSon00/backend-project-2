const querystring = require('querystring');
const { makeRequest } = require('../setting/api');
const { StatusCodes } = require('http-status-codes');

class UserModel {
    static getUser(userID) {
        return makeRequest(`/api/v1/users/${userID}`, 'GET')
    }
    
    static async getUsers(queryData) {
        try {
            const queryURL = querystring.stringify(queryData);
            const users = await makeRequest(`/api/v1/users?${queryURL}`, 'GET');
            return users;
        } catch (err) {
            if (err.response?.status === StatusCodes.NOT_FOUND) {
                return [];
            } else throw new Error(err);
        }
    }
    static updateUser(userID, userDataToUpdate) {
        return makeRequest(`/api/v1/users/${userID}`, 'PATCH', userDataToUpdate);
    }
    static createUser(userData) {
        return makeRequest(`/api/v1/users/`, 'POST', userData)
    }
}

module.exports = UserModel;