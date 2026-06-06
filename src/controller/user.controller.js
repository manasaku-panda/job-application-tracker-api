const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const userServices = require('../services/user.services');

const getAllUsers = async(req, res, next)=>{
    try{
        const data = req.user;

        const result = await userServices.getAllUsers(data);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.USER_LISTING_FETCH_SUCCESSFULLY, result);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async(req, res, next) =>{
    try {
        const data = req.user;
        const userId = req.params.id;

        if(!userId) {
            return sendresponse(res, STATUS.BAD_REQUEST, MESSAGE.NO_ID);
        }

        const deleted = await userServices.deleteUser(userId, data);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.USER_DELETED_SUCCESSFULLY, {id: userId});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    deleteUser
}