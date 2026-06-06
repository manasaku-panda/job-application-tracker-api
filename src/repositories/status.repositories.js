const { StatusHistory } = require('../models');

const createStatusHistory = async (data, transaction) => {
    return StatusHistory.create(data, {transaction});
};

module.exports = {
    createStatusHistory
}