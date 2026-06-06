const { STATUS, MESSAGE } = require('../utils/response');
const AppError = require('../utils/apperror');
const jobRepositories = require('../repositories/job.repositories');
const companyRepositories = require('../repositories/company.repositories');
const statusRepositories = require('../repositories/status.repositories');
const noteRepositories = require('../repositories/notes.repositories');
const { sequelize } = require('../models');

const createJob = async (userId, data) => {
    const companyId = data.companyId;
    const title = data.title;

    const isCompanyExist = await companyRepositories.findCompanyById(companyId);

    if (!isCompanyExist) {
        throw new AppError(MESSAGE.COMPANY_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const isOwnerOfCompany = await companyRepositories.findOwnerOfcompany(companyId, userId);

    if (!isOwnerOfCompany) {
        throw new AppError(MESSAGE.NOT_OWNER_OF_COMPANY, STATUS.FORBIDDEN);
    }

    // check duplicate(companyId + userId + title)
    const existingJob = await jobRepositories.jobExist(companyId, userId, title);

    if (existingJob) {
        throw new AppError(MESSAGE.JOB_ALREADY_EXISTS, STATUS.CONFLICT);
    }

    const jobData = {
        ...data,
        userId
    }

    return await jobRepositories.createJob(jobData);
};

const getJob = async (userId, data) => {
    const companyId = data.companyId;

    if (companyId) {
        const isCompanyExist = await companyRepositories.findCompanyById(companyId);

        if (!isCompanyExist) {
            throw new AppError(MESSAGE.COMPANY_NOT_FOUND, STATUS.NOT_FOUND);
        }
    }

    return await jobRepositories.getJob(userId, data);
};

const getJobById = async (userId, jobId) => {
    const job = await jobRepositories.getJobById(userId, jobId);

    if (!job) {
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
    }

    return job;
};

const updateJobById = async (userId, jobId, data) => {
    const t = await sequelize.transaction();
    try {
        const job = await jobRepositories.getJobById(userId, jobId);

        if (!job) {
            throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
        }

        const oldStatus = job.status;

        const updatejob = await jobRepositories.updateJobById(job, data, t);

        if (data.status && data.status != oldStatus) {
            await statusRepositories.createStatusHistory({
                oldStatus: oldStatus,
                newStatus: data.status,
                changedAt: new Date(),
                jobId: jobId
            }, t);
        }
        await t.commit();
        return updatejob;
    } catch (error) {
        await t.rollback();
        throw new AppError(error.MESSAGE, STATUS.SERVER_ERROR);
    }
};

const deleteJobById = async (userId, jobId) => {
    const isJobExist = await jobRepositories.findJobByid(jobId);

    if (!isJobExist) {
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const job = await jobRepositories.deleteJobById(userId, jobId);

    if (!job) {
        throw new AppError(MESSAGE.NOT_OWNER_OF_JOB, STATUS.FORBIDDEN);
    }

    return job;
};

const updateStatusAndStatusHistory = async (userId, jobId, data) => {
    const t = await sequelize.transaction();
    try {
        const job = await jobRepositories.findJobByid(jobId);

        if (!job) {
            throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
        }

        if (job.userId != userId) {
            throw new AppError(MESSAGE.NOT_OWNER_OF_JOB, STATUS.FORBIDDEN);
        }

        const oldstatus = job.status;
        const newstatus = data.status;


        if (newstatus && oldstatus == newstatus) {
            throw new AppError(MESSAGE.JOB_STATUS_NOT_CHANGED, STATUS.CONFLICT);
        }

        const updatejob = await jobRepositories.updateJobById(job, { status: newstatus }, t);

        const statusHistory = await statusRepositories.createStatusHistory({
            oldStatus: oldstatus,
            newStatus: newstatus,
            changedAt: new Date(),
            jobId: jobId
        }, t);

        await t.commit();
        return {
            job: {
                id: job.id,
                status: updatejob.status
            },
            statusHistory: {
                id: statusHistory.id,
                oldStatus: statusHistory.oldStatus,
                newStatus: statusHistory.newStatus,
                changedAt: statusHistory.changedAt,
                jobId: statusHistory.jobId
            }
        }
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const addNotesToTheJob = async (userId, jobId, data) => {
    const job = await jobRepositories.findJobByid(jobId);

    if (!job) {
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
    }

    if (job.userId != userId) {
        throw new AppError(MESSAGE.NOT_OWNER_OF_JOB, STATUS.FORBIDDEN);
    }

    const noteExist = await noteRepositories.findNoteByJobIdAndType(jobId, data.type);

    if(noteExist){
        throw new AppError(MESSAGE.NOTE_ALREADY_EXIST_FOR_THIS_TYPE, STATUS.CONFLICT);
    }

    const note = await noteRepositories.createNotes({
        content: data.content,
        type: data.type,
        jobId: jobId
    });

    return { note : note };
};


const getNotesOfTheJob = async(userId, jobId) =>{
    const job = await jobRepositories.findJobByid(jobId);

    if (!job) {
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
    }

    if (job.userId != userId) {
        throw new AppError(MESSAGE.NOT_OWNER_OF_JOB, STATUS.FORBIDDEN);
    }

    const notes = await noteRepositories.findNotesByJobId(jobId);

    return { notes };
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
};