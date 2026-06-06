const { validationResult } = require('express-validator');
const {STATUS, MESSAGE, sendresponse} = require('../utils/response');

const validate = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const errors = error.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return sendresponse(res, STATUS.BAD_REQUEST, MESSAGE.VALIDATION_ERROR, null, errors);
    }

    next();
};

module.exports = validate