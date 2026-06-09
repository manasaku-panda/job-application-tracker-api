const { Interview } = require('../models');

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

module.exports = {
    createInterview,
    isUniqueInterview,
    findinterviewsByJobId,
    getLastRound,
    getInterviewsByJobId,
    getInterviewById,
    updateInterview
}