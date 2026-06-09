const router = require('express').Router();
const interviewValidation = require('../validations/interview.validation');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../validations/validate');
const interviewController = require('../controller/interview.controller');

router.use(authMiddleware);
// PUT /interviews/:id
// 1. Get interviewId
// 2. Validate input
// 3. Fetch interview → get jobId
// 4. Check ownership
// 5. Update interview
// 6. Return updated data

/**
 * @swagger
 * /interviews/{id}:
 *   patch:
 *     summary: Update interview
 *     description: Update allowed fields (date, status, feedback) of an interview by ID
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Interview ID
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
 *             additionalProperties: false
 *             minProperties: 1
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-01-25T10:00:00Z
 *
 *               status:
 *                 type: string
 *                 enum: [scheduled, cleared, failed]
 *                 example: cleared
 *
 *               feedback:
 *                 type: string
 *                 nullable: true
 *                 example: Strong problem solving skills
 *
 *     responses:
 *       200:
 *         description: Interview updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Interview updated successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *
 *                     date:
 *                       type: string
 *                       format: date-time
 *
 *                     type:
 *                       type: string
 *                       example: technical
 *
 *                     status:
 *                       type: string
 *                       example: cleared
 *
 *                     roundNumber:
 *                       type: integer
 *                       example: 2
 *
 *                     feedback:
 *                       type: string
 *                       nullable: true
 *
 *                     jobId:
 *                       type: integer
 *                       example: 1
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *
 *       400:
 *         description: Validation error (invalid fields or no valid fields provided)
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (User does not own this interview)
 *
 *       404:
 *         description: Interview not found
 *
 *       409:
 *         description: Conflict (Interview is already finalized and cannot be updated)
 */

router.patch('/:id',interviewValidation.validateInterviewUpdate, validate, interviewController.updateInterview);

module.exports = router