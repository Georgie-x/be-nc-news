const { fetchUsers, fetchUser } = require("../models/users-model")

const getUsers = async (req, res, next) => {
    try {
        const users = await fetchUsers()
        return res.status(200).send({ users })
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const {username} = req.params
        const user = await fetchUser(username)
        return res.status(200).send({ user })
    } catch (err) {
        next(err)
    }
}

module.exports = { getUsers, getUser}