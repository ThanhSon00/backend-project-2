const { makeRequest } = require('../setting/api')
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require("google-auth-library");
const UserModel = require('../models/User');
const client = new OAuth2Client(process.env.CLIENT_ID);

class AuthService {
    static async doLogin(req) {
        const { email, password, credential, name, selector } = req.body;
        let user;   
        if (email && password) {
            user = await this.#normalLogin(email, password);
        }
        if (credential) {
            user = await this.#googleLogin(credential);
        }
        if (name && selector) {
            user = await this.#facebookLogin(name, selector);
        }
        return user;    
    }
    static async #normalLogin(email, password) {
        const users = await UserModel.getUsers({ 'normalInfo.email': email });
        const user = users[0];
        if (!user) return;
        const match = await bcrypt.compare(password, user.securityInfo.password);
        if (!match) return;
        if (user.socialConnectInfo.isGoogleUser) return;
        return user;
    }

    static async #googleLogin(credential) {
        const { email, name, picture } = await this.#verify(credential);
        let user;
        try {
            const users = await UserModel.getUsers({ 'normalInfo.email': email });
            user = users[0];
            if (!user.socialConnectInfo.isGoogleUser) return;
        } catch (err) {
            user = await UserModel.createUser({
                email, 
                name, 
                avatar: picture,
                isGoogleUser: true,
            })
        }
        return user;    
    }

    static async #verify(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        return payload;    
    }

    static async #facebookLogin(name, selector) {
        let user;
        try {
            const users = await makeRequest(`/api/v1/users?selector=${selector}`);
            user = users[0];
        } catch (err) {
            user = await makeRequest(`/api/v1/users`, 'POST', {
                name,
                selector,
                isFacebookUser: true,
            });
        }
        return user;    
    }
}

module.exports = AuthService;