const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getTemplate, getTemplates, deleteTemplate, updateTemplate, addTemplate } = require('./template.controller')
const router = express.Router()

router.get('/', getTemplates);
router.get('/:id', getTemplate);
router.post('/', addTemplate);
router.put('/:id', updateTemplate)
router.delete('/:id', deleteTemplate)
// router.put('/:id', requireAuth, requireAdmin, updateTemplate)
// router.delete('/:id', requireAuth, requireAdmin, deleteTemplate)

module.exports = router