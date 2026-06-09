const { param, body } = require('express-validator');

const deteteNoteValidation = [
    param('id').isInt().withMessage('Invalid note ID must be a integer')
]

module.exports = {
    deteteNoteValidation
};

