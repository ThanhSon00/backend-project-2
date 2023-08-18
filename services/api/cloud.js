const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const UserModel = require('../../models/User');

const uploadFile = async (req, res) => {
    const { user } = req.body;
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => { if (result) resolve(result); else reject(error) });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
    }

    const result = await streamUpload(req);
    // Check if the Cloudinary upload was successful
    if (!result || !result.secure_url) {
        throw new Error("Error uploading the file to Cloudinary.");
    }
    const updatedData = { 'normalInfo.avatar': result.secure_url };
    const updatedUser = await UserModel.updateUser(user._id, updatedData);
    return res.status(StatusCodes.CREATED).json(updatedUser);
}

module.exports = {
    uploadFile,
}