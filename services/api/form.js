const { StatusCodes } = require("http-status-codes");
const ejs = require('ejs');

const createForm = async (req, res) => {
    const { tokenURL } = req.body;
    const resetPwdForm = await renderFileAsync("./views/request-reset-password.ejs", { tokenURL });
    return res.status(StatusCodes.CREATED).send(resetPwdForm);
}

const renderFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, data, (error, renderedHtml) => {
            if (error) {
                reject(error);
            } else {
                resolve(renderedHtml);
            }
        });
    });
}

module.exports = {
    createForm
};