const { makeRequest } = require("../setting/api");

class FormService {
    static async createForm(tokenURL) {
        const form = await makeRequest(`/api/v1/forms`, `POST`, {
            tokenURL: tokenURL
        });
        return form;
    }
}

module.exports = FormService;