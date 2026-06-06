const { User } = require('../models');
const Op = require('sequelize').Op;

const findByEmail = async(email)=>{
    return User.findOne({where : {email}});
};

const createUser = async(data) =>{
    return User.create(data);
};

const findByIdAndRole = async(id, role) =>{
    return User.findOne({
        where: {
            [Op.and]:[
                {id : id},
                {role: role}
            ]
        }
    });
};

const getAllUsers = async()=>{
    return User.findAll({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: {
            role: 'user'
        }
    })
};

const deleteUser = async(id) =>{
    return User.destroy({
        where: {
            id: id
        }
    });
};

const findById = async(id) =>{
    return User.findByPk(id);
}
module.exports = {
    findByEmail,
    createUser,
    findByIdAndRole,
    getAllUsers,
    deleteUser,
    findById
};