const { STATUS, MESSAGE } = require('../utils/response');
const companyRepositories = require('../repositories/company.repositories');
const userRepositories = require('../repositories/user.repositories');
const AppError = require('../utils/apperror');

const createCompany = async (userId, data) => {
    // 1. Get name, location, website from data
    const {name , location, website = null} = data;

    // 2. Validate input
    if(!name || !location) {
        throw new AppError(MESSAGE.NAME_LOCATION_REQUIRED, STATUS.BAD_REQUEST);
    }

    // check duplicate(name + userId)
    const existingCompany = await companyRepositories.companyExists(name, userId);

    if(existingCompany) {
        throw new AppError(MESSAGE.COMPANY_ALREADY_EXISTS, STATUS.CONFLICT);
    }

    // 3. Create company
    const companyData = {
        name,
        location,
        website,
        createdBy: userId
    };

    return companyRepositories.createCompany(companyData);
}

const getAllCompanies = async (userId, query) => {
    const isuserExist = await userRepositories.findById(userId);

    if (!isuserExist) {
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    }

    return companyRepositories.getAllCompanies(userId, query);
}

const updateCompany = async(id, userId, data) =>{
    const isCompanyExist = await companyRepositories.findCompanyById(id)

    if(!isCompanyExist){
        throw new AppError(MESSAGE.COMPANY_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const isOwnerOfCompany = await companyRepositories.findOwnerOfcompany(id, userId)

    if(!isOwnerOfCompany){
        throw new AppError(MESSAGE.NOT_OWNER_OF_COMPANY, STATUS.FORBIDDEN);
    }

    return companyRepositories.updateCompany(id, userId, data);
}

const deleteCompany = async(id, userId)=>{
    const isCompanyExist = await companyRepositories.findCompanyById(id)

    if(!isCompanyExist){
        throw new AppError(MESSAGE.COMPANY_NOT_FOUND, STATUS.NOT_FOUND);
    }

    const isOwnerOfCompany = await companyRepositories.findOwnerOfcompany(id, userId)

    if(!isOwnerOfCompany){
        throw new AppError(MESSAGE.NOT_OWNER_OF_COMPANY, STATUS.FORBIDDEN);
    }

    return companyRepositories.deleteCompany(id);

}
module.exports = {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany
}