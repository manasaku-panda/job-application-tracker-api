const { param, body } = require('express-validator');

const validateInterviewUpdate = [
    param('id').isInt({ gt: 0 }).withMessage('Invalid interview ID'),
    body('date').optional().isISO8601().withMessage('Invalid date format'),
    body('status').optional().isIn(['scheduled', 'cleared', 'failed']).withMessage('Invalid status'),
    body('feedback').optional().isString().withMessage('Invalid feedback format')
];

module.exports = { validateInterviewUpdate };