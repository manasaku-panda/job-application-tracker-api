const router = require('express').Router();

// GET /dashboard
// 1. Get userId
// 2. Query:
//    - total jobs count
//    - count by status
// 3. Return summary

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     description: Retrieve a summary of the user's job applications
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalJobs:
 *                       type: integer
 *                       example: 5
 *                     byStatus:
 *                       type: object
 *                       additionalProperties:
 *                         type: integer
 *                       example:
 *                         applied: 2
 *                         interview: 1
 *                         rejected: 2
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *
 *       401:
 *         description: Unauthorized
 */

router.get('/',( req, res )=>{
    res.send("dashboard working..")
});

// GET /dashboard/analytics
// 1. Get userId
// 2. Aggregate:
//    - jobs per company
//    - monthly applications
// 3. Return analytics data

/**
 * @swagger
 * /dashboard/analytics:
 *   get:
 *     summary: Get analytics data
 *     description: Retrieve analytics data for the user's job applications
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobsPerCompany:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company:
 *                             type: string
 *                             example: Company A
 *                           count:
 *                             type: integer
 *                             example: 2
 *
 *                     monthlyApplications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             example: 2026-01
 *                           count:
 *                             type: integer
 *                             example: 2
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *
 *       401:
 *         description: Unauthorized
 */

router.get('/analytics',( req, res )=>{
    res.send("analytics working..")
});

module.exports = router