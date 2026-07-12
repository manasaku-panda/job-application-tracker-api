const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const dashboardController = require('../services/dashboard.services');

const getDashboradSummary = async(req, res, next) =>{
    try {
        const userId = req.user.sub;

        const result = await dashboardController.getDashboradSummary(userId);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.DASHBOARD_SUMMARY_RETRIVE_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

const getDashboardanalytics = async(req, res, next) =>{
    try {
        const userId = req.user.sub;
        const result = await dashboardController.getDashboardanalytics(userId);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.ANALYSIS_DATA_RETRIVE_SUCCESSFULLY, result);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getDashboradSummary,
    getDashboardanalytics
}