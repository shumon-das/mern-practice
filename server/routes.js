const users = require('./Controllers/userController')
const admin = require('./Controllers/adminController')

function routes(app){

    // users
    app.get('/', users.home)
    app.get('/users', users.allUsers)
    app.get('/user/:id', users.singleUser)
    app.get('/usersbyids', users.usersByIds)
    app.post('/users', users.insertNewUser)
    app.put('/user', users.updateUserById)
    app.delete('/user/:id', users.deleteUserById)

    // admin
    app.get('/admin/', admin.home)

}


module.exports = routes


