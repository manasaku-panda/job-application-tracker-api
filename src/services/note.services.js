const { STATUS, MESSAGE } = require('../utils/response');
const AppError = require('../utils/apperror');
const noteRepositories = require('../repositories/notes.repositories');
const jobRepositories = require('../repositories/job.repositories');

const deleteNoteById = async(userId, noteId) =>{
    const note = await noteRepositories.findNoteById(noteId);

    if(!note){
        throw new AppError(MESSAGE.NOTE_NOT_FOUND, STATUS.NOT_FOUND)
    }

    const jobId = note.jobId;

    const job = await jobRepositories.findJobByid(jobId);

    if(!job){
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND)
    }

    if(job.userId !== userId){
        throw new AppError(MESSAGE.NOT_OWNER_OF_NOTE, STATUS.FORBIDDEN)
    }

    return await noteRepositories.deleteNote(note);
};

module.exports = {
    deleteNoteById
}