const { StatusCodes } = require("http-status-codes")
const getAccessPayload = require('../../modules/getAccessPayload');
const getRefreshPayload = require('../../modules/getRefreshPayload');
const getRememberPayload = require('../../modules/getRememberPayload');
const jwt = require('jsonwebtoken');
const UserModel = require("../../models/User");

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
        const tokens = await createAndSaveTokens(user);
        return res.status(StatusCodes.OK).json(tokens);    
    }
}

const deleteSession = async (req, res) => {
    const { user } = req.body; 
    await revokeTokens(user);
    return res.status(StatusCodes.OK).send();
}

const createSession = async (req, res) => {
    const { user, rememberMe } = req.body;
    const tokens = await createAndSaveTokens(user, rememberMe);
    return res.status(StatusCodes.CREATED).json(tokens);
}


const createAndSaveTokens = async (user, rememberMe) => {
    const accessPayload = getAccessPayload(user);
    const accessToken = jwt.sign(accessPayload, process.env.ACCESS_SECRET);

    const refreshPayload = getRefreshPayload(user);
    const refreshToken = jwt.sign(refreshPayload, process.env.REFRESH_SECRET);
    
    const rememberPayload = getRememberPayload(user);
    const rememberToken = jwt.sign(rememberPayload, process.env.REMEMBER_SECRET);

    const userID = user._id;
    await UserModel.updateUser(userID, {
        'securityInfo.token': refreshPayload.jti,
        'securityInfo.validator': rememberPayload.validator,
    })

    const tokens = { accessToken, refreshToken, rememberToken };
    if (!rememberMe) delete tokens.rememberToken; 
    return tokens;
}

const revokeTokens = async (user) => {
    UserModel.updateUser(user._id, {
        'securityInfo.token': null,
        'securityInfo.validator': null,    
    });
}

module.exports = {
    getSession,
    updateSession,
    deleteSession,
    createSession,
}