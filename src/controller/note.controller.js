const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const noteServices = require('../services/note.services');

const deleteNoteById = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const { id } = req.params;

        await noteServices.deleteNoteById(userId, id);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.NOTE_DELETED_SUCCESSFULLY);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteNoteById
}