const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    // filterBy.sort = filterBy.sort.toLowerCase();
    // var prop = (filterBy.sort === 'price') ? 'price' : (filterBy.sort === 'name') ? 'name' : 'createdAt';
    // var order = prop === 'createdAt' ? -1 : 1;
    // var sortBy = {
    //     [prop]: order
    // }
    const collection = await dbService.getCollection('template')
    try {
        const templates = await collection.find().toArray();
        return templates
    } catch (err) {
        console.log('ERROR: cannot find templates')
        throw err;
    }
}

async function getById(templateId) {
    const collection = await dbService.getCollection('template')
    try {
        const template = await collection.findOne({ "_id": ObjectId(templateId) })
        return template
    } catch (err) {
        console.log(`ERROR: while finding template ${templateId}`)
        throw err;
    }
}

async function remove(templateId) {
    const collection = await dbService.getCollection('template')
    try {
        await collection.deleteOne({ "_id": ObjectId(templateId) })
    } catch (err) {
        console.log(`ERROR: cannot remove template ${templateId}`)
        throw err;
    }
}

async function update(template) {
    const collection = await dbService.getCollection('template')
    template._id = ObjectId(template._id);
    try {
        await collection.replaceOne({ "_id": template._id }, { $set: template })
        return template
    } catch (err) {
        console.log(`ERROR: cannot update template ${template._id}`)
        throw err;
    }
}

async function add(template) {
    const collection = await dbService.getCollection('template')
    try {
        await collection.insertOne(template);
        return template;
    } catch (err) {
        console.log(`ERROR: cannot insert template`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) criteria.name = { $regex: new RegExp(filterBy.name, 'i') };
    if (filterBy.type !== '') criteria.type = filterBy.type;
    if (filterBy.inStock !== '') criteria.inStock = (filterBy.inStock + '' === 'true') ? true : false;
    return criteria;
}