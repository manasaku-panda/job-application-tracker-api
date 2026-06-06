const AppError = require('../utils/apperror');
const { STATUS, MESSAGE } = require('../utils/response');
const userRepositories = require('../repositories/user.repositories');

const getAllUsers = async (data) => {
    const { role } = data;

    if (role !== 'admin') {
        throw new AppError(MESSAGE.NOT_AUTHORIZED, STATUS.FORBIDDEN);
    }

    const users = await userRepositories.getAllUsers();

    return users;
};

const deleteUser = async (userId, data) => {
    const { role } = data;

    if (role !== 'admin') {
        throw new AppError(MESSAGE.NOT_AUTHORIZED, STATUS.FORBIDDEN);
    }

    if (data.sub === userId) {
        throw new AppError(MESSAGE.ADMIN_CANNOT_DELETED_THEMSELVES, STATUS.BAD_REQUEST);
    }

    const isUserExist = await userRepositories.findByIdAndRole(userId, 'user');

    if (!isUserExist) {
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    }

    const deleted = await userRepositories.deleteUser(userId);

    return deleted;
};

module.exports = {
    getAllUsers,
    deleteUser
}