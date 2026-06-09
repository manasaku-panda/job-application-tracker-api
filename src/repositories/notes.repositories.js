const { Note } = require('../models');

const createNotes = async(data)=>{
    return await Note.create(data);
};

const findNoteByJobIdAndType = async(jobId, type)=>{
    return Note.findOne({
        where:{
            type,
            jobId
        }
    })
};

const findNotesByJobId = async(jobId) =>{
    return Note.findAll({
        where:{
            jobId
        }
    })
};

const findNoteById = async(id) =>{
    return Note.findByPk(id);
};

const deleteNote = async(note) =>{
    return await note.destroy();
};


module.exports = {
    createNotes,
    findNoteByJobIdAndType,
    findNotesByJobId,
    findNoteById,
    deleteNote
}