const{ Company } = require('../models');
const Op = require('sequelize').Op

const companyExists = async(name, userId) => {
    return Company.findOne({
        where: {
            name: name,
            createdBy: userId
        }
    })
};

const createCompany = async (data) => {
    return Company.create(data);
};


const getAllCompanies = async (userId, { page, limit, name, location }) => {
    const offset = (page - 1) * limit;

    const whereClause = {
        createdBy : userId
    }

    if(name){
        whereClause.name = {[Op.like]: `%${name}%`}
    }

    if(location){
        whereClause.location = {[Op.like]: `%${location}%`}
    }

    const { count, rows } = await Company.findAndCountAll({
        where: whereClause,
        limit,
        offset
    });

    return {
        companies : rows,
        pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        }
    };
};

const findCompanyById = async(companyId) =>{
    return Company.findByPk(companyId);
};

const findOwnerOfcompany = async(companyId, userId) =>{
    return Company.findOne({
        where:{
            id: companyId,
            createdBy: userId
        }
    })
};

const updateCompany = async(companyId, userId, data) =>{
    const company = await Company.findOne({
        where:{
            id: companyId,
            createdBy: userId
        }
    });

    if(!company){
        return null
    }

    await company.update(data);

    return company
}; 

const deleteCompany = async(companyId) =>{
    return Company.destroy({
        where:{
            id: companyId
        }
    })
};

module.exports = {
    companyExists,
    createCompany,
    getAllCompanies,
    findCompanyById,
    updateCompany,
    findOwnerOfcompany,
    deleteCompany
}