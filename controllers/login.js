const axios = require('axios');
const bcryptjs = require('bcryptjs');
const { api } = require('../setting/api');

const renderPage = async (req, res) => {
    res.render('login');
}

const login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = (await api.get(`/users?phoneNumber=${phoneNumber}`)).data;
    if (!user) {
        return res.redirect('/login');
    }
    
}

module.exports = {
    renderPage,
    login
}