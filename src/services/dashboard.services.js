const { MESSAGE, STATUS} = require('../utils/response');
const AppError = require('../utils/apperror');
const jobRepositories = require('../repositories/job.repositories');
const userRepositories = require('../repositories/user.repositories');
const interviewRepositories = require('../repositories/interview.repositories');

const getDashboradSummary = async(userId) =>{
    const user = userRepositories.findById(userId);
    if(!user){
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    }

    const totalJobs = await jobRepositories.countJobByUser(userId);

    const totalInterviews = await interviewRepositories.countInterviewByUser(userId);

    const statusRow = await interviewRepositories.getStatusCount(userId);
    const statusCounts = formatStatusCounts(statusRow);

    const recentInterviews = await interviewRepositories.getRecentInterviews(userId);

    return {
        totalJobs,
        totalInterviews,
        statusCounts,
        recentInterviews
    };
}

const formatStatusCounts = (rows) => {
    const statusCounts = {
        scheduled: 0,
        cleared: 0,
        failed: 0
    };

    for (let row of rows) {
        statusCounts[row.status] = Number(row.get('count'));
    }

    return statusCounts;
};

const getDashboardanalytics = async(userId) =>{
    const user = await userRepositories.findById(userId);

    if(!user){
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    }

    const[monthlyRows, statusRows, typeRows] = await Promise.all([
        interviewRepositories.getMonthlyTrends(userId),
        interviewRepositories.getStatusCount(userId),
        interviewRepositories.getTypeCount(userId)
    ]);

    
    return{
        monthlyTrends: formatMonthly(monthlyRows),

        statusCounts: formatCounts(statusRows, 'status', ['scheduled', 'cleared', 'failed']),

        typeCounts: formatCounts(typeRows, 'type', ['hr', 'technical', 'managerial'])
    }
};

const formatMonthly = (rows) => {
    return rows.map(r => ({
        month: r.get('month'),
        count: Number(r.get('count'))
    }));
};

const formatCounts = (rows, keyName, defaultKeys) => {
    const result = {};

    // initialize all keys to 0
    defaultKeys.forEach(k => result[k] = 0);

    for (let row of rows) {
        result[row[keyName]] = Number(row.get('count'));
    }

    return result;
};

module.exports = {
    getDashboradSummary,
    getDashboardanalytics
}