const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const usercontroler = require('../controller/user.controller');
// Apply auth middleware to all routes in this router
router.use(authMiddleware);

// GET /users (admin only)
// 1. Verify token
// 2. Check role = admin
// 3. Fetch all users
// 4. Return list

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       role:
 *                         type: string
 *                         example: user
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 error:
 *                   type: string
 *                   example: null
 *
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *                 data:
 *                   type: object
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not an admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access denied
 *                 data:
 *                   type: object
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Forbidden
 */
router.get('/', usercontroler.getAllUsers);

// DELETE /users/:id
// 1. Verify token
// 2. Check role = admin
// 3. Get userId from params
// 4. Delete user from DB
// 5. Return success

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User deleted successfully
 *                 data:              
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       403:
 *         description: Forbidden (Not an admin)
 *       404:
 *         description: User not found
 */
router.delete('/:id', usercontroler.deleteUser);

module.exports = router