const { makeRequest } = require('../setting/api')

class SessionService {
    static createSession(user, rememberMe) {
        return makeRequest(`/api/v1/sessions`, `POST`, { user, rememberMe });
    }

    static validateSession(accessToken) {
        return makeRequest(`/api/v1/sessions/${accessToken}`, `GET`, null, (err, user) => {
            if (err) return;
            return user;
        });     
    }

    static refreshSession(rememberToken, refreshToken) {
        return makeRequest(`/api/v1/sessions`, 'PATCH', { rememberToken, refreshToken }, (err, newTokens) => {
            if (err) return;
            return newTokens;
        })
    }

    static revokeSession(accessToken) {
        return makeRequest(`/api/v1/sessions/${accessToken}`, `DELETE`);
    }
}

module.exports = SessionService;