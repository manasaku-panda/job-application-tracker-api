const { Sequelize, where } = require('sequelize');
const { Interview, Job, sequelize, Company } = require('../models');

const createInterview = async(data) =>{
    return await Interview.create(data);
};

const isUniqueInterview = async(jobId, data) =>{
    return Interview.findOne({
        where:{
            jobId,
            type: data.type,
            roundNumber: data.roundNumber
        }
    })
};

const findinterviewsByJobId = async(jobId) =>{
    return Interview.findAll({
        where:{
            jobId
        }
    })
};

const getInterviewsByJobId = async (jobId) => {
    return Interview.findAll({
        where: { jobId },
        attributes: [
            'id',
            'date',
            'type',
            'status',
            'roundNumber',
            'feedback'
        ],
        order: [
            ['type', 'ASC'],
            ['roundNumber', 'ASC']
        ]
    });
};

const getLastRound = async (jobId, type) => {
    return Interview.findOne({
        where: { jobId, type },
        order: [['roundNumber', 'DESC']],
        attributes: ['roundNumber']
    });
};

const getInterviewById = async(id) =>{
    return Interview.findByPk(id);
} 

const updateInterview = async(interview, data) =>{
    return interview.update(data);
}

const countInterviewByUser = async(userId) =>{
    return Interview.count({
        include:[
            {
                model : Job,
                where : {userId},
                attributes : []
            }
        ]
    })
};

const getStatusCount = async (userId) => {
    return await Interview.findAll({
        attributes: [
            'status',
            [Sequelize.fn('COUNT', Sequelize.col('interviews.id')), 'count']
        ],
        include: [
            {
                model: Job,
                where: { userId },
                attributes: []
            }
        ],
        group: ['interviews.status']
    });
};

const getRecentInterviews = async(userId, limit = 5) =>{
    return Interview.findAll({
        include: [
            {
                model: Job,
                where: {userId},
                attributes: ['companyId'],
                required: true,
                include: [
                    {
                        model: Company,
                        attributes: ['name'],
                        required: true
                    }
                ]
            }
        ],
        order :[ ['id', 'DESC']],
        limit
    })
};

const getMonthlyTrends = async(userId) =>{
    return Interview.findAll({
        attributes: [
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('interviews.date'), '%Y-%m'),'month'],
            [Sequelize.fn('COUNT',Sequelize.col('interviews.id')),'count']
        ],
        include: [
            {
                model: Job,
                where: {userId},
                attributes: []
            }
        ],
        group: ['month'],
        order: [[Sequelize.literal('month'),'ASC']]
    })
};

const getTypeCount = async (userId) => {
    return await Interview.findAll({
        attributes: [
            'type',
            [Sequelize.fn('COUNT', Sequelize.col('interviews.id')), 'count']
        ],
        include: [
            {
                model: Job,
                where: { userId },
                attributes: []
            }
        ],
        group: ['interviews.type']
    });
};

module.exports = {
    createInterview,
    isUniqueInterview,
    findinterviewsByJobId,
    getLastRound,
    getInterviewsByJobId,
    getInterviewById,
    updateInterview,
    countInterviewByUser,
    getStatusCount,
    getRecentInterviews,
    getMonthlyTrends,
    getTypeCount
}