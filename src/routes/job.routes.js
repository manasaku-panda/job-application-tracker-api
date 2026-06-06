const router = require('express').Router();
const jobController = require('../controller/job.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../validations/validate');
const jobValidation = require('../validations/job.validation');

router.use(authMiddleware);
// POST /jobs
// 1. Get job data from req.body
// 2. Validate:
//    - title required
//    - companyId exists
// 3. Get userId from token
// 4. Check company belongs to user
// 5. Create job with userId + companyId
// 6. Return job

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job application
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - companyId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Backend Developer
 *               description:
 *                 type: string
 *                 example: Node.js + Sequelize role
 *               salary:
 *                 type: integer
 *                 example: 1200000
 *               location:
 *                 type: string
 *                 example: Bangalore
 *               status:
 *                 type: string
 *                 enum: [applied, interview, rejected, selected]
 *                 default: applied
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *               source:
 *                 type: string
 *                 example: LinkedIn
 *               resumeVersion:
 *                 type: string
 *                 example: v2
 *               appliedDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-20T10:00:00Z
 *               followUpDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-25T10:00:00Z
 *               companyId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     salary:
 *                       type: integer
 *                     location:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: applied
 *                     priority:
 *                       type: string
 *                       example: medium
 *                     source:
 *                       type: string
 *                     resumeVersion:
 *                       type: string
 *                     appliedDate:
 *                       type: string
 *                       format: date-time
 *                     followUpDate:
 *                       type: string
 *                       format: date-time
 *                     companyId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Missing/Invalid token)
 *       403:
 *         description: Forbidden (Company does not belong to user)
 *       404:
 *         description: Company not found
 *       409:
 *         description: Job already exists
 */

router.post('/', jobValidation.createJobValidation, validate, jobController.createJob);

// GET /jobs
// 1. Get query params:
//    - page, limit
//    - status, companyId
//    - search
// 2. Get userId
// 3. Build filter object
// 4. Query DB with:
//    - where conditions
//    - pagination
//    - sorting
// 5. Return jobs + metadata

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all job applications (with pagination, filters, search)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - name: limit
 *         in: query
 *         description: Number of records per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       - name: status
 *         in: query
 *         description: Filter by job status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [applied, interview, rejected, selected]
 *           example: applied
 *
 *       - name: companyId
 *         in: query
 *         description: Filter by company ID
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - name: priority
 *         in: query
 *         description: Filter by priority
 *         required: false
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *           example: high
 *
 *       - name: search
 *         in: query
 *         description: Search by job title or description
 *         required: false
 *         schema:
 *           type: string
 *           example: backend
 *
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by
 *         required: false
 *         schema:
 *           type: string
 *           example: createdAt
 *
 *       - name: order
 *         in: query
 *         description: Sort order (ASC or DESC)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: DESC
 *
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Jobs fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                           status:
 *                             type: string
 *                           priority:
 *                             type: string
 *                           companyId:
 *                             type: integer
 *                           userId:
 *                             type: integer
 *                           description:
 *                             type: string
 *                           salary:
 *                             type: integer
 *                           location:
 *                             type: string
 *                           source:
 *                             type: string
 *                           resumeVersion:
 *                             type: string
 *                           appliedDate:
 *                             type: string
 *                             format: date-time
 *                           followUpDate:
 *                             type: string
 *                             format: date-time
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 50
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized (Missing/Invalid token)
 *       404:
 *         description: Company not found
 */

router.get('/', jobValidation.getJobValidation, validate, jobController.getJob);

// GET /jobs/:id
// 1. Get jobId from params
// 2. Get userId
// 3. Fetch job
// 4. Check ownership
// 5. Include:
//    - company
//    - notes
// 6. Return job details

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get single job details
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Job fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     job:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                         status:
 *                           type: string
 *                         priority:
 *                           type: string
 *                         companyId:
 *                           type: integer
 *                         userId:
 *                           type: integer
 *
 *                         company:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *
 *                         notes:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               content:
 *                                 type: string
 *
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Job not found
 */

router.get('/:id', jobValidation.getJobByIdValidation, validate, jobController.getJobById);

// PUT /jobs/:id
// 1. Get jobId
// 2. Validate input
// 3. Check ownership
// 4. Update job
// 5. Return updated job

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update Job (All fields)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - companyId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Backend Developer
 *               description:
 *                 type: string
 *                 example: Node.js + Sequelize role
 *               salary:
 *                 type: integer
 *                 example: 1200000
 *               location:
 *                 type: string
 *                 example: Bangalore
 *               status:
 *                 type: string
 *                 enum: [applied, interview, rejected, selected]
 *                 default: applied
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *               source:
 *                 type: string
 *                 example: LinkedIn
 *               resumeVersion:
 *                 type: string
 *                 example: v2
 *               appliedDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-20T10:00:00Z
 *               followUpDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-25T10:00:00Z
 * 
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     job:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                         status:
 *                           type: string
 *                         priority:
 *                           type: string
 *                         companyId:
 *                           type: integer
 *                         userId:
 *                           type: integer
 *
 *                         company:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *
 *                         notes:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               content:
 *                                 type: string
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Validation error
 * 
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Job not found
 */
router.put('/:id', jobValidation.updateJobByIdValidation, validate, jobController.updateJobById);

// DELETE /jobs/:id
// 1. Get jobId
// 2. Check ownership
// 3. Delete job
// 4. Return success

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete Job by Job Id
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 * 
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job deleted successfully
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       403:
 *         description: Forbidden (You do not own this job)
 * 
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Job not found
 */
router.delete('/:id', jobValidation.deleteJobByIdValidation, validate, jobController.deleteJobById);

// PATCH /jobs/:id/status
// 1. Get jobId + newStatus
// 2. Validate status enum
// 3. Fetch job
// 4. Check ownership
// 5. Store oldStatus
// 6. Update job status
// 7. Insert into status_history:
//    - oldStatus
//    - newStatus
// 8. Return updated job

/**
 * @swagger
 * /jobs/{id}/status:
 *   patch:
 *     summary: Update job status and track history
 *     description: Updates the status of a job and stores the change in status history
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [applied, interview, rejected, selected]
 *                 example: interview
 *
 *     responses:
 *       200:
 *         description: Job status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job status updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     job:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         status:
 *                           type: string
 *                           example: interview
 *
 *                     statusHistory:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         oldStatus:
 *                           type: string
 *                           example: applied
 *                         newStatus:
 *                           type: string
 *                           example: interview
 *                         changedAt:
 *                           type: string
 *                           format: date-time
 *                         jobId:
 *                           type: integer
 *                           example: 1
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Invalid status value
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of job)
 *
 *       404:
 *         description: Job not found
 * 
 *       409:
 *         description: Job status not changed
 */
router.patch('/:id/status', jobValidation.updateJobStatusAndStatusHistoryValidation, validate, jobController.updateStatusAndStatusHistory);

// POST /jobs/:jobId/notes
// 1. Get jobId + content
// 2. Validate input
// 3. Check job ownership
// 4. Create note
// 5. Return note

/**
 * @swagger
 * /jobs/{id}/notes:
 *   post:
 *     summary: Add note to a job
 *     description: Create a new note for a specific job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Interview completed, waiting for HR feedback
 *               type:
 *                 type: string
 *                 enum: [general, interview, hr]
 *                 example: interview
 *
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Note created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     note:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         content:
 *                           type: string
 *                           example: Interview completed, waiting for HR feedback
 *                         type:
 *                           type: string
 *                           example: interview
 *                         jobId:
 *                           type: integer
 *                           example: 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of job)
 *
 *       404:
 *         description: Job not found
 * 
 *       409:
 *         description: Note already exist for this type you can update the note for this type
 */
router.post('/:id/notes', jobValidation.addNotesToTheJobValidation, validate, jobController.addNotesToTheJob);

// GET /jobs/:id/notes
// 1. Get jobId
// 2. Check ownership
// 3. Fetch notes
// 4. Return list

/**
 * @swagger
 * /jobs/{id}/notes:
 *   get:
 *     summary: Get notes for a job
 *     description: Retrieve all notes for a specific job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notes fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     notes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           content:
 *                             type: string
 *                             example: Interview completed
 *                           type:
 *                             type: string
 *                             example: interview
 *                           jobId:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of job)
 *
 *       404:
 *         description: Job not found
 */
router.get('/:id/notes', jobValidation.getNotesOfTheJobValidation, validate, jobController.getNotesOfTheJob);


// POST /jobs/:jobId/interviews
// 1. Get jobId + interview data
// 2. Validate input
// 3. Check job ownership
// 4. Create interview
// 5. Return interview

/**
 * @swagger
 * /jobs/{jobId}/interviews:
 *   post:
 *     summary: Add interview to a job
 *     description: Create a new interview record for a specific job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: jobId
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - type
 *               - status
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-25T10:00:00Z
 *
 *               type:
 *                 type: string
 *                 enum: [technical, hr, managerial]
 *                 example: technical
 *
 *               status:
 *                 type: string
 *                 enum: [scheduled, cleared, failed]
 *                 example: scheduled
 *
 *               roundNumber:
 *                 type: integer
 *                 example: 1
 *
 *               feedback:
 *                 type: string
 *                 example: Good problem solving skills
 *
 *     responses:
 *       201:
 *         description: Interview created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Interview created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     interview:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: 2026-01-25T10:00:00Z
 *                         type:
 *                           type: string
 *                           example: technical
 *                         status:
 *                           type: string
 *                           example: scheduled
 *                         roundNumber:
 *                           type: integer
 *                           example: 1
 *                         feedback:
 *                           type: string
 *                           example: Good problem solving skills
 *                         jobId:
 *                           type: integer
 *                           example: 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of job)
 *
 *       404:
 *         description: Job not found
 */

router.post('/:jobId/interviews',(req, res)=>{
    res.send("Post Job Interviews..");
});

// GET /jobs/:jobId/interviews
// 1. Get jobId
// 2. Check ownership
// 3. Fetch interviews
// 4. Return list

/**
 * @swagger
 * /jobs/{jobId}/interviews:
 *   get:
 *     summary: Get interviews for a job
 *     description: Retrieve all interviews for a specific job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: jobId
 *         in: path
 *         description: Job ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Interviews fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Interviews fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     interviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-01-25T10:00:00Z
 *                           type:
 *                             type: string
 *                             example: technical
 *                           status:
 *                             type: string
 *                             example: scheduled
 *                           roundNumber:
 *                             type: integer
 *                             example: 1
 *                           feedback:
 *                             type: string
 *                             example: Good problem solving skills
 *                           jobId:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of job)
 *
 *       404:
 *         description: Job not found
 */
router.get('/:jobId/interviews',(req, res)=>{
    res.send("Get Job Interviews..");
});

module.exports = router