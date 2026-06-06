const { body, param} = require('express-validator');

const registervalidation = [
    body('name').notEmpty().withMessage('Name is require'),

    body('email').isEmail().withMessage('Valid email require'),

    body('password').isLength({min: 6, max: 12}).withMessage('Password must be at within 6 to 12 characters'),

    body('role').optional().isIn(['admin', 'user']).withMessage('Role must be either admin or user')
];

const loginvalidation = [
    body('email').isEmail().withMessage('Valid email require'),

    body('password').isLength({min: 6, max: 12}).withMessage('Password must be at within 6 to 12 characters')
];

module.exports = {
    registervalidation,
    loginvalidation
}
