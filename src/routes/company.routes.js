const router = require('express').Router();
const companyController = require('../controller/company.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const validate = require('../validations/validate');
const { createCompanyValidation, getCompanyValidation, updateCompanyValidation, deleteCompanyValidation } = require('../validations/company.validation');

router.use(authMiddleware);
// POST /companies
// 1. Get name, location, website from req.body
// 2. Validate input
// 3. Get userId from req.user
// 4. Check duplicate (name + userId)
// 5. Create company
// 6. Return created company

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     description: Create a new company for the logged-in user
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Corp
 *               location:
 *                 type: string
 *                 example: San Francisco
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: https://www.techcorp.com
 *
 *     responses:
 *       201:
 *         description: Company created successfully
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
 *                   example: Company created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     company:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Tech Corp
 *                         location:
 *                           type: string
 *                           example: San Francisco
 *                         website:
 *                           type: string
 *                           example: https://www.techcorp.com
 *                         createdBy:
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
 *       409:
 *         description: Company already exists
 */
router.post('/', createCompanyValidation, validate, companyController.createCompany);

// GET /companies
// 1. Verify token
// 2. Get userId
// 3. Fetch companies where createdBy = userId
// 4. Return list

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     description: Retrieve all companies for the logged-in user
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       - name: name
 *         in: query
 *         schema:
 *           type: string
 *           example: Tech
 *
 *       - name: location
 *         in: query
 *         schema:
 *           type: string
 *           example: Bangalore
 *
 *     responses:
 *       200:
 *         description: Companies fetched successfully
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
 *                   example: Companies fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     companies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           name:
 *                             type: string
 *                             example: Tech Corp
 *                           location:
 *                             type: string
 *                             example: San Francisco
 *                           website:
 *                             type: string
 *                             format: uri
 *                             example: https://www.techcorp.com
 *                           createdBy:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 100
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 10
 *
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
 */
router.get('/', getCompanyValidation, validate, companyController.getAllCompanies);

// PUT /companies/:id
// 1. Get companyId from params
// 2. Validate input
// 3. Check company belongs to user
// 4. Update company
// 5. Return updated data

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     summary: Update company details
 *     description: Update an existing company for the logged-in user
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Company ID
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
 *               name:
 *                 type: string
 *                 example: Tech Corp
 *               location:
 *                 type: string
 *                 example: San Francisco
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: https://www.techcorp.com
 *
 *     responses:
 *       200:
 *         description: Company updated successfully
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
 *                   example: Company updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     company:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         name:
 *                           type: string
 *                           example: Tech Corp
 *                         location:
 *                           type: string
 *                           example: San Francisco
 *                         website:
 *                           type: string
 *                           format: uri
 *                           example: https://www.techcorp.com
 *                         createdBy:
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
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (Not owner of company)
 *
 *       404:
 *         description: Company not found
 */
router.patch('/:id', updateCompanyValidation, validate, companyController.updateCompany);

// DELETE /companies/:id
// 1. Get companyId
// 2. Check ownership
// 3. Delete company
// 4. Return success

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete Company by Company Id
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Company ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 * 
 *     responses:
 *       200:
 *         description: Company deleted successfully
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
 *                   example: Company deleted successfully
 *                 data:
 *                   type: object
 *                   example: null
 *                 error:
 *                   type: object
 *                   example: null
 *
 *       403:
 *         description: Forbidden (You do not own this Company)
 * 
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Company not found
 */

router.delete('/:id', deleteCompanyValidation, validate, companyController.deleteCompany);

module.exports = router;