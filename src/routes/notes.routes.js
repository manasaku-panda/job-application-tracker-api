const router = require('express').Router();
const noteValidation = require('../validations/note.validation');
const validate = require('../validations/validate');
const { authMiddleware } = require('../middleware/auth.middleware');
const noteController = require('../controller/note.controller');

router.use(authMiddleware);
// DELETE /notes/:id
// 1. Get noteId
// 2. Fetch note → get jobId
// 3. Check job ownership
// 4. Delete note
// 5. Return success


/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     description: Delete a specific note by its ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Note ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 * 
 *     responses:
 *       200:
 *         description: Note deleted successfully
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
 *                   example: Note deleted successfully
 * 
 *                 error:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (User does not own this note)
 *
 *       404:
 *         description: Note not found or Job not found
 */

router.delete('/:id', noteValidation.deteteNoteValidation, validate, noteController.deleteNoteById);

module.exports = router;