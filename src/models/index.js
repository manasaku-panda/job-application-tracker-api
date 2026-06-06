const sequelize = require('../config/db');

const User = require('./user.model')(sequelize);
const Company = require('./company.model')(sequelize);
const Job = require('./job.model')(sequelize);
const Note = require('./note.model')(sequelize);
const Interview = require('./interview.model')(sequelize);
const StatusHistory = require('./statushistory.model')(sequelize);

User.hasMany(Company, {
    foreignKey: 'createdBy'
});
User.hasMany(Job,{
    foreignKey: 'userId'
});


Company.belongsTo(User, {
    foreignKey: 'createdBy'
});
Company.hasMany(Job,{
    foreignKey: 'companyId'
});

Job.belongsTo(Company,{
    foreignKey: 'companyId'
});
Job.belongsTo(User,{
    foreignKey: 'userId'
});
Job.hasMany(Interview,{
    foreignKey: 'jobId'
});
Job.hasMany(Note,{
    foreignKey: 'jobId'
});
Job.hasMany(StatusHistory,{
    foreignKey: 'jobId'
});

Note.belongsTo(Job,{
    foreignKey: 'jobId'
});

Interview.belongsTo(Job,{
    foreignKey:'jobId'
});

StatusHistory.belongsTo(Job,{
    foreignKey: 'jobId'
});

module.exports = {
    sequelize,
    User,
    Company,
    Job,
    Interview,
    Note,
    StatusHistory
};