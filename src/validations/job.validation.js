const { body, param, query } = require('express-validator');

const createJobValidation = [
    body('title').notEmpty().withMessage('Title is required'),

    body('companyId').isInt().withMessage('companyId is required'),

    body('description').optional().isString().withMessage('description must be a string'),

    body('salary').optional().isInt().withMessage('salary must be a Integer'),

    body('location').optional().notEmpty().withMessage('Location is required'),

    body('status').optional().isIn(['applied', 'interview', 'rejected', 'selected']).withMessage('Enter a valid status'),

    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Enter a valid priority (low, medium, high)'),

    body('source').optional().isString().withMessage('source must be a string'),

    body('resumeVersion').optional().isString().withMessage('resumeVersion must be a string'),

    body('appliedDate').optional().isISO8601().withMessage('appliedDate must be a Date-time format (e.g., YYYY-MM-DDTHH:mm:ss:ssZ)'),

    body('followUpDate').optional().isISO8601().withMessage('followUpDate must be a Date-time format (e.g., YYYY-MM-DDTHH:mm:ss:ssZ)')
];

const getJobValidation = [
    query('page').optional().isInt().withMessage('Page must be an integer'),

    query('limit').optional().isInt().withMessage('Limit must be an integer'),

    query('status')
        .optional()
        .isIn(['applied', 'interview', 'rejected', 'selected'])
        .withMessage('Enter a valid status'),

    query('companyId')
        .optional()
        .isInt()
        .withMessage('companyId must be an integer'),

    query('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Enter a valid priority'),

    query('order')
        .optional()
        .isIn(['ASC', 'DESC'])
        .withMessage('Enter a valid order'),
    
    query('sortBy')
        .optional()
        .isIn(['createdAt', 'appliedDate', 'followUpDate','priority', 'status', 'companyId', 'title', 'salary'])
        .withMessage('Enter a valid sortBy field')
];

const getJobByIdValidation = [
    param('id').isInt().withMessage('Job ID must be an integer')
]

const updateJobByIdValidation = [
    param('id').isInt().withMessage('Job ID must be an integer'),

    body('title').optional().notEmpty().withMessage('title can not be empty'),

    body('description').optional().isString().withMessage('description must be a string'),

    body('salary').optional().isInt().withMessage('salary must be a Integer'),

    body('location').optional().isString().withMessage('Location must be a string'),

    body('status').optional().isIn(['applied', 'interview', 'rejected', 'selected']).withMessage('Enter a valid status'),

    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Enter a valid priority (low, medium, high)'),

    body('source').optional().isString().withMessage('source must be a string'),

    body('resumeVersion').optional().isString().withMessage('resumeVersion must be a string'),

    body('appliedDate').optional().isISO8601().withMessage('appliedDate must be a Date-time format (e.g., YYYY-MM-DDTHH:mm:ss:ssZ)'),

    body('followUpDate').optional().isISO8601().withMessage('followUpDate must be a Date-time format (e.g., YYYY-MM-DDTHH:mm:ss:ssZ)')
]

const deleteJobByIdValidation = [
    param('id').isInt().withMessage('Job ID must be an integer')
]

const updateJobStatusAndStatusHistoryValidation = [
    param('id').isInt().withMessage('Job ID must be an integer'),

    body('status').isIn(['applied', 'interview', 'rejected', 'selected']).withMessage('Invalid status value')
]

const addNotesToTheJobValidation = [
    param('id').isInt().withMessage('Job ID must be an integer'),
    
    body('content').isString().withMessage('Content must be a string'),

    body('type').isIn(['general', 'interview', 'hr']).withMessage('Enter a valid type (general, interview, hr)')
]

const getNotesOfTheJobValidation = [
    param('id').isInt().withMessage('Job ID must be an integer'),
]

module.exports = {
    createJobValidation,
    getJobValidation,
    getJobByIdValidation,
    updateJobByIdValidation,
    deleteJobByIdValidation,
    updateJobStatusAndStatusHistoryValidation,
    addNotesToTheJobValidation,
    getNotesOfTheJobValidation
}