const { Job, Company, Note } = require('../models');
const Op = require('sequelize').Op

const createJob = async (data) => {
    return Job.create(data);
}

const jobExist = async (companyId, userId, title) => {
    return Job.findOne({
        where: {
            companyId,
            userId,
            title
        }
    })
};

const getJob = async (userId, { page, limit, status, companyId, priority, search, sortBy, order }) => {

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;

    const where = {
        userId
    }

    if (status) {
        where.status = status;
    }

    if (companyId) {
        where.companyId = companyId
    }

    if (priority) {
        where.priority = priority
    }

    if (search) {
        orConditions  = [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { location: { [Op.like]: `%${search}%` } },
            { source: { [Op.like]: `%${search}%` } },
            { resumeversion: { [Op.like]: `%${search}%` } }
        ]

        if(!isNaN(search)){
            orConditions.push({ salary: Number(search) })
        }

        where[Op.or] = orConditions;
    }

    const orderBy = sortBy ? sortBy : 'createdAt';
    const orderDirection = order ? order : 'DESC';

    const { count, rows } = await Job.findAndCountAll({
        where,
        limit: pageSize,
        offset,
        order: [[orderBy, orderDirection]]
    });

    return {
        jobs: rows,
        pagination: {
            total: count,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(count / pageSize)
        }
    };
};


const getJobById = async(userId, jobId) =>{
    return Job.findOne({
        where:{
            userId,
            id: jobId
        },
        include:[
            {
                model: Company,
                attributes: ['id', 'name', 'location', 'website']
            },
            {
                model: Note,
                attributes: ['id', 'content']
            }
        ]
    })
};

const updateJobById = async(job, data, transaction) =>{
    // const job = await Job.findOne({
    //     where:{
    //         userId,
    //         id: jobId
    //     },
    //     include:[
    //         {
    //             model: Company,
    //             attributes: ['id', 'name', 'location', 'website']
    //         },
    //         {
    //             model: Note,
    //             attributes: ['id', 'content']
    //         }
    //     ],
    //     transaction
    // })

    // if(!job){
    //     return null
    // }

    return job.update(data, { transaction });

};

const deleteJobById = async(userId, jobId) =>{
    const job = await Job.findOne({
        where:{
            userId,
            id: jobId
        }
    })

    if(!job){
        return null
    }

    await job.destroy();

    return job;
}

const findJobByid = async(id) =>{
    return Job.findByPk(id);
}

module.exports = {
    createJob,
    jobExist,
    getJob,
    getJobById,
    updateJobById,
    deleteJobById,
    findJobByid
}