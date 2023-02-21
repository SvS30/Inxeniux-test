const User = require('../models/User')

const index = async (req, res) => {
    let users = await User.find({ deleted_at: false }).catch((error) => res.status(500).json({ code: 'NOK', error }))
    res.status(200).json({ code: 'OK', users })
}

const store = async (req, res) => {
    const user = new User(req.body)
    await user.save()
        .then(savedDoc => { return res.status(201).json({ code: 'OK', message: `The ${savedDoc.name} user was saved successfully` }) })
        .catch(error => { return res.status(400).json({ code: 'NOK', error }) })
}

const show = async (req, res) => {
    const user = await User.findById(req.params['id']).catch((error) => { res.status(404).json({ code: 'NOK', error }) })
    res.status(200).json({ code: 'OK', user })
}

const update = async (req, res) => {
    const userToUpdate = await User.findByIdAndUpdate(req.params['id'], req.body)
        .catch(error => res.status(400).json({ code: 'NOK', error }))
    res.status(200).json({ code: 'OK', message: `The ${userToUpdate.name} was updated successfully` })
}

const destroy = async (req, res) => {
    const personToDelete = await User.findByIdAndUpdate(req.params['id'], { deleted_at: true })
        .catch(error => res.status(500).json({ code: 'NOK', error }))
    res.status(200).json({ code: 'OK', message: `The ${personToDelete.name} was deleted successfully` })
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}