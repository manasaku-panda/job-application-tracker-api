const router = require('express').Router();

const authroute = require('./auth.routes');
const userroute = require('./user.routes');
const jobroute = require('./job.routes');
const companyroute = require('./company.routes');
const interviewroute = require('./interview.routes');
const notesroute = require('./notes.routes');
const dashboardroute = require('./dashboard.routes');

const apiprefix = '/api/v1'

router.use(`${apiprefix}/auth`,authroute);
router.use(`${apiprefix}/users`,userroute);
router.use(`${apiprefix}/jobs`,jobroute);
router.use(`${apiprefix}/companies`,companyroute);
router.use(`${apiprefix}/interviews`,interviewroute);
router.use(`${apiprefix}/notes`,notesroute);
router.use(`${apiprefix}/dashboard`,dashboardroute);

module.exports = router;