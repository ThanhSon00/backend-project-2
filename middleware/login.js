const { StatusCodes } = require("http-status-codes")
const { makeRequest } = require("../setting/api")
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const login = async (req, res, next) => {
    const { email, password, credential } = req.body;
    let user;   
    if (email && password) {
        user = await normalLogin(email, password);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Email or password not correct');
        }
    }
    else if (credential) {
        user = await googleLogin(credential);
    }
    req.body.user = user;
    return next();
}

const normalLogin = async (email, password) => {
    let user;
    await makeRequest(`/api/v1/users?email=${email}`, 'GET', null, (err, data) => {
        if (err?.response?.status === StatusCodes.NOT_FOUND) {
            return;
        }
        user = data;
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return;
    return user
}

const googleLogin = async (credential) => {
    const { email, name, picture } = await verify(credential);
    let user;
    try {
        user = await makeRequest(`/api/v1/users?email=${email}`, 'GET');
    } catch (err) {
        user = await makeRequest(`/api/v1/users`, 'POST', {
            email, 
            name, 
            avatar: picture,
            isGoogleUser: true,
        });
    }
    return user;
}

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    return payload;
}

module.exports = login;