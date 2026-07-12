const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const dashboardController = require('../controller/dashboard.controller');

router.use(authMiddleware);
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
 *     description: Retrieve an overview of jobs, interviews, and recent activity for the logged-in user
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
 *
 *                 message:
 *                   type: string
 *                   example: Dashboard summary fetched successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalJobs:
 *                       type: integer
 *                       example: 12
 *
 *                     totalInterviews:
 *                       type: integer
 *                       example: 34
 *
 *                     statusCounts:
 *                       type: object
 *                       properties:
 *                         scheduled:
 *                           type: integer
 *                           example: 10
 *                         cleared:
 *                           type: integer
 *                           example: 15
 *                         failed:
 *                           type: integer
 *                           example: 9
 *
 *                     recentInterviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *
 *                           company:
 *                             type: string
 *                             example: Google
 *
 *                           role:
 *                             type: string
 *                             example: SDE
 *
 *                           type:
 *                             type: string
 *                             example: technical
 *
 *                           status:
 *                             type: string
 *                             example: scheduled
 *
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-01-25T10:00:00Z
 *
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: User not found
 */
router.get('/', dashboardController.getDashboradSummary);

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
 *     description: Retrieve interview analytics including monthly trends, status distribution, and interview types
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
 *
 *                 message:
 *                   type: string
 *                   example: Analytics data fetched successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *
 *                     monthlyTrends:
 *                       type: array
 *                       description: Number of interviews per month
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             example: 2026-01
 *                           count:
 *                             type: integer
 *                             example: 5
 *
 *                     statusCounts:
 *                       type: object
 *                       description: Distribution of interview statuses
 *                       properties:
 *                         scheduled:
 *                           type: integer
 *                           example: 3
 *                         cleared:
 *                           type: integer
 *                           example: 7
 *                         failed:
 *                           type: integer
 *                           example: 2
 *
 *                     typeCounts:
 *                       type: object
 *                       description: Distribution of interview types
 *                       properties:
 *                         hr:
 *                           type: integer
 *                           example: 4
 *                         technical:
 *                           type: integer
 *                           example: 6
 *                         managerial:
 *                           type: integer
 *                           example: 2
 *
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: User not found
 */

router.get('/analytics', dashboardController.getDashboardanalytics);

module.exports = router