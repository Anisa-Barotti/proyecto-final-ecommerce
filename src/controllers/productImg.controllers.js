const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const productImg = await ProductImg.findAll()
    return res.json(productImg)
});

const create = catchError(async(req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await ProductImg.create({ url, publicId: public_id });
    return res.status(201).json(image);
});

module.exports = {
    getAll,
    create
}