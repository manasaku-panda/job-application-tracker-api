const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const companyServices = require('../services/company.services');


const createCompany = async (req, res, next) => {
    try{
        const userId = req.user.sub;
        const data = req.body;

        const result = await companyServices.createCompany(userId, data);

        return sendresponse(res, STATUS.CREATED, MESSAGE.COMPANY_CREATED_SUCCESSFULLY, result);
    } catch (error) {
        next(error);
    }
}

const getAllCompanies = async (req, res, next) => {
    try {
        const userId = req.user.sub;

        const { page = 1, limit = 10, name = '', location = '' } = req.query;

        const result = await companyServices.getAllCompanies(userId, {
            page: parseInt(page),
            limit: parseInt(limit),
            name,
            location
        });

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.COMPANY_FETCH_SUCCESSFULLY, result);
    } catch (error) {
        next(error);
    }
};

const updateCompany = async(req, res, next) =>{
    try {
        const { id } = req.params;
        const userId = req.user.sub;

        const data = req.body;

        const result = await companyServices.updateCompany(id, userId, data)

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.COMPANY_UPDATE_SUCCESSFULLY, result);
    } catch (error) {
        next(error);
    }
}

const deleteCompany = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const userId = req.user.sub;

        await companyServices.deleteCompany(id, userId);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.COMPANY_DELETED_SUCCESSFULLY);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany
}