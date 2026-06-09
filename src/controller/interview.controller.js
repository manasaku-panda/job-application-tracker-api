const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const interviewServices = require('../services/interview.services');


const updateInterview = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const { id } = req.params;
        const data = req.body;
        const result = await interviewServices.updateInterview(userId, id, data);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.INTERVIEW_UPDATED_SUCCESSFULLY, result)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateInterview
}