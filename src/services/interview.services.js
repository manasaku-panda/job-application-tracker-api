const { STATUS, MESSAGE } = require('../utils/response');
const AppError = require('../utils/apperror');
const interviewRepositories = require('../repositories/interview.repositories');
const jobRepositories = require('../repositories/job.repositories');

const updateInterview = async (userId, InterviewId, data) => {
    const interview = await interviewRepositories.getInterviewById(InterviewId);

    if (!interview) {
        throw new AppError(MESSAGE.INTERVIEW_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const jobId = interview.jobId;

    const job = await jobRepositories.findJobByid(jobId);

    if (!job) {
        throw new AppError(MESSAGE.JOB_NOT_FOUND, STATUS.NOT_FOUND);
    }

    if (userId != job.userId) {
        throw new AppError(MESSAGE.NOT_OWNER_OF_INTERVIEW, STATUS.FORBIDDEN);
    }

    if (interview.status === 'failed') {
        throw new AppError(MESSAGE.INTERVIEW_ALREADY_FINALIZED, STATUS.CONFLICT);
    }

    const updates = {};

    if (data.date !== undefined) updates.date = data.date;
    if (data.status !== undefined) updates.status = data.status;
    if (data.feedback !== undefined) updates.feedback = data.feedback;

    if (Object.keys(updates).length === 0) {
        throw new AppError(MESSAGE.NO_UPDATE_FIELDS, STATUS.BAD_REQUEST);
    }

    const updatedInterview = await interviewRepositories.updateInterview(interview, updates);

    return updatedInterview;
};

module.exports = {
    updateInterview
}