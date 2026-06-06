const { STATUS, MESSAGE } = require('../utils/response');
const { hashpassword, verifypassword } = require('../utils/passwordmanager');
const userRepo = require('../repositories/user.repositories');
const { generateToken } = require('../utils/token');
const AppError = require('../utils/apperror');

const register = async (data) => {
    const { name, email, password, role = "user" } = data;

    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
        throw new AppError(MESSAGE.USER_EXISTS, STATUS.CONFLICT);
    }

    const hashPassword = await hashpassword(password);

    const raw_user = await userRepo.createUser({
        name,
        email,
        password: hashPassword,
        role
    });

    const token = generateToken({
        sub: raw_user.id,
        role: raw_user.role
    });

    const user = {
        id: raw_user.id,
        name: raw_user.name,
        email: raw_user.email,
        role: raw_user.role,
        createdAt: raw_user.createdAt,
        updatedAt: raw_user.updatedAt
    };

    return {
        user,
        accessToken: token
    };
};


const login = async (data) => {
    const { email, password } = data;

    const user = await userRepo.findByEmail(email);
    if (!user) {
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    };

    const ispasswordmatch = await verifypassword(password, user.password);

    if (!ispasswordmatch) {
        throw new AppError(MESSAGE.INVALID_PASSWORD, STATUS.BAD_REQUEST)
    };

    const token = generateToken({
        sub: user.id,
        role: user.role
    });

    return {
        token
    };
};

const profile = async (data) => {
    const { sub, role } = data;

    if (!sub || !role) {
        throw new AppError(MESSAGE.INVALID_EXPIRED_TOKEN, STATUS.UNAUTHORIZED);
    };

    const raw_user = await userRepo.findByIdAndRole(sub, role);

    if (!raw_user) {
        throw new AppError(MESSAGE.USER_NOTFOUND, STATUS.NOT_FOUND);
    };

    const user = {
        id: raw_user.id,
        name: raw_user.name,
        email: raw_user.email,
        role: raw_user.role,
        createdAt: raw_user.createdAt,
        updatedAt: raw_user.updatedAt
    };

    return user;
    
};

module.exports = {
    register,
    login,
    profile
}