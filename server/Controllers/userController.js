const userModel = require('../Models/Users/Users')

const users = {}

users.home = (req, res) => {
    res.send("Home Page")
}

users.allUsers = (req, res) => {
    userModel.selectAllUsers(res)
}

users.singleUser = (req, res) => {
    let id = req.params.id
    userModel.selectAnUserById(id, res)
}

users.usersByIds = (req, res) => { 
    userModel.selectMultipleUsersByIds(req, res)
}

users.insertNewUser = (req, res) => {  
    userModel.insertNewUser(req, res) 
}

users.updateUserById = (req, res) => {
    userModel.updateUserById(req, res)
}

users.deleteUserById = (req, res) => {
    let id = req.params.id
    userModel.deleteUserById(id, res)
}

module.exports = users