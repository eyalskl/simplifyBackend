const templateService = require('./template.service')
const logger = require('../../services/logger.service')

async function getTemplate(req, res) {
    const template = await templateService.getById(req.params.id)
    res.json(template)
}

async function getTemplates(req, res) {
    const templates = await templateService.query(req.query)
    logger.debug(templates);
    res.json(templates)
}

async function deleteTemplate(req, res) {
    await templateService.remove(req.params.id)
    res.end()
}

async function updateTemplate(req, res) {
    const template = req.body;
    await templateService.update(template)
    res.json(template)
}

async function addTemplate(req, res) {
    const template = req.body;
    await templateService.add(template)
    res.json(template)
}

module.exports = {
    getTemplate,
    getTemplates,
    deleteTemplate,
    updateTemplate,
    addTemplate
}