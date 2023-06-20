const { StatusCodes } = require("http-status-codes")
const { makeRequest, originURL } = require("../setting/api")
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const doLogin = async (req, res, next) => {
    const { email, password, credential, name, selector } = req.body;
    let user;   
    if (email && password) {
        user = await normalLogin(email, password);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Email or password not correct');
        }
    }
    if (credential) {
        user = await googleLogin(credential);
        if (!user) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).send('This email has been used for another account');
        }
    }
    if (name && selector) {
        user = await facebookLogin(name, selector);
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send('Unexpected Error');
        }
    }
    req.body.user = user;
    return next();
}

const normalLogin = async (email, password) => {
    let user;
    await makeRequest(`/api/v1/users?email=${email}`, 'GET', null, (err, data) => {
        if (err?.response?.status === StatusCodes.NOT_FOUND) return;
        user = data;
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return;
    if (user.isGoogleUser) return; 
    return user
}

const googleLogin = async (credential) => {
    const { email, name, picture } = await verify(credential);
    let user;
    try {
        user = await makeRequest(`/api/v1/users?email=${email}`, 'GET');
        if (!user.isGoogleUser) return;
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

const facebookLogin = async (name, selector) => {
    let user;
    try {
        user = await makeRequest(`/api/v1/users?selector=${selector}`);
    } catch (err) {
        user = await makeRequest(`/api/v1/users`, 'POST', {
            name,
            selector,
            isFacebookUser: true,
        });
    }
    return user;
}

module.exports = doLogin;