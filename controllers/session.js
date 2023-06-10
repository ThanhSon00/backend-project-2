const { StatusCodes } = require("http-status-codes")
const { makeRequest } = require("../setting/api")
const getAccessPayload = require('../modules/getAccessPayload');
const getRefreshPayload = require('../modules/getRefreshPayload');
const getRememberPayload = require('../modules/getRememberPayload');
const filterObject = require('../modules/filterObject');
const jwt = require('jsonwebtoken');

const getSession = async (req, res) => {
    const { user } = req.body;
    return res.status(StatusCodes.OK).json(user);
}

const updateSession = async (req, res) => {
    const { rememberToken, refreshToken, user } = req.body;
    // If user login without "remember me" button checked
    if (refreshToken) {
        const accessPayload = getAccessPayload(user);
        const accessToken = jwt.sign(accessPayload, process.env.ACCESS_SECRET);
        return res.status(StatusCodes.OK).json({ accessToken });    
    }
    // If user login with "remember me" button checked
    if (rememberToken) {
        user.rememberMe = true;
        const tokens = await generateTokens(user);
        return res.status(StatusCodes.OK).json(tokens);    
    }
}

const deleteSession = async (req, res) => {
    const { user } = req.body; 
    await makeRequest(`/api/v1/users/${user._id}`, 'PATCH', {
        token: null,
        validator: null,
    });
    return res.status(StatusCodes.OK).send();
}

const createSession = async (req, res) => {
    const { user, rememberMe } = req.body;
    user.rememberMe = rememberMe;
    const tokens = await generateTokens(user);
    return res.status(StatusCodes.CREATED).json(tokens);
}


const generateTokens = async (user) => {
    const filteredUser = filterObject(user, ['_id', 'email', 'name', 'avatar', 'title', 'selector']);
    const accessPayload = getAccessPayload(filteredUser);
    const accessToken = jwt.sign(accessPayload, process.env.ACCESS_SECRET);

    const refreshPayload = getRefreshPayload(filteredUser);
    const refreshToken = jwt.sign(refreshPayload, process.env.REFRESH_SECRET);
    
    const rememberPayload = getRememberPayload(filteredUser);
    const rememberToken = jwt.sign(rememberPayload, process.env.REMEMBER_SECRET);

    await makeRequest(`/api/v1/users/${filteredUser._id}`, 'PATCH', {
        token: refreshPayload.jti,
        validator: rememberPayload.validator,
    })
    if (user.rememberMe) return { accessToken, refreshToken, rememberToken }
    return { accessToken, refreshToken }
}

module.exports = {
    getSession,
    updateSession,
    deleteSession,
    createSession,
}