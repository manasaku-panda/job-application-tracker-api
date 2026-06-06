const router = require('express').Router();

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
 *     description: Update an interview record by its ID
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
 *                 nullable: true
 *                 example: Good problem solving skills
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
 *                 message:
 *                   type: string
 *                   example: Interview updated successfully
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
 *                         type:
 *                           type: string
 *                         status:
 *                           type: string
 *                         roundNumber:
 *                           type: integer
 *                         feedback:
 *                           type: string
 *                         jobId:
 *                           type: integer
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
 *
 *       400:
 *         description: Validation error
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
 *         description: Conflict (Duplicate or invalid state)
 */

router.patch('/:id',(req, res)=>{
    res.send("Interview pathc working...")
});

module.exports = router