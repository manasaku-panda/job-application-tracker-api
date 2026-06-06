const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const jobServices = require('../services/job.services');

const createJob = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const data = req.body;

        const result = await jobServices.createJob(userId, data);

        return sendresponse(res, STATUS.CREATED, MESSAGE.JOB_CREATED_SUCCESSFULLY, result)
    } catch (error) {
        next(error)
    }
};

const getJob = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const data = req.query;

        const result = await jobServices.getJob(userId, data);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.JOBS_FETCHED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const getJobById = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const { id } = req.params;

        const result = await jobServices.getJobById(userId, id);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.JOBS_FETCHED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const updateJobById = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const { id } = req.params;
        const data = req.body;

        const result = await jobServices.updateJobById(userId, id, data);  

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.JOB_UPDATED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const deleteJobById = async( req, res, next) =>{
    try{
        const userId = req.user.sub;
        const { id } = req.params;

        await jobServices.deleteJobById(userId, id);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.JOB_DELETED_SUCCESSFULLY);
    } catch(error){
        next(error)
    }
};

const updateStatusAndStatusHistory = async(req, res, next)=>{
    try {
        const userId = req.user.sub;
        const { id } = req.params;

        const data = req.body;

        const result = await jobServices.updateStatusAndStatusHistory(userId, id, data);

        return sendresponse(res,STATUS.SUCCESS, MESSAGE.JOB_STATUS_UPDATED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const addNotesToTheJob = async(req, res, next)=>{
    try {
        const userId = req.user.sub;
        const { id } = req.params;

        const data = req.body;

        const result = await jobServices.addNotesToTheJob(userId, id, data);

        return sendresponse(res, STATUS.CREATED, MESSAGE.NOTE_ADDED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const getNotesOfTheJob = async(req, res, next) =>{
    try {
        const userId = req.user.sub;
        const { id } = req.params;

        const result = await jobServices.getNotesOfTheJob(userId, id);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.NOTE_FETCHED_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createJob,
    getJob,
    getJobById,
    updateJobById,
    deleteJobById,
    updateStatusAndStatusHistory,
    addNotesToTheJob,
    getNotesOfTheJob
}