const { body, param, query } = require('express-validator');

const createCompanyValidation = [
    body('name').notEmpty().withMessage('Name is required'),

    body('location').notEmpty().withMessage('Location is required'),

    body('website').optional().isURL().withMessage('Website must be a valid URL')
];

const getCompanyValidation = [
    query('page').optional().isInt().withMessage('Page must be an integer'),

    query('limit').optional().isInt().withMessage('Limit must be an integer'),

    query('name')
        .optional()
        .matches(/^[a-zA-Z\s-]+$/)
        .withMessage('name must contain only letters, spaces, and hyphens'),

    query('location')
        .optional()
        .matches(/^[a-zA-Z\s-]+$/)
        .withMessage('location must contain only letters, spaces, and hyphens')
];

const updateCompanyValidation = [
    param('id').isInt().withMessage('Id must be an integer'),

    body('name').notEmpty().withMessage('Name is required'),

    body('location').notEmpty().withMessage('Location is required'),

    body('website').optional().isURL().withMessage('Website must be a valid URL')
]

const deleteCompanyValidation = [
    param('id').isInt().withMessage('Id must be an integer')
]
module.exports = {
    createCompanyValidation,
    getCompanyValidation,
    updateCompanyValidation,
    deleteCompanyValidation
}