
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'react-node'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const users = {}

// select all users
users.selectAllUsers = (response) => {
    con.query("SELECT * FROM `users`", (getUsersErr, getUsersRes) => {
        if(!getUsersErr){
            response.send(getUsersRes)
        }else{
            response.status(400).send(getUsersErr)
        }
    })
}


// select an single user
users.selectAnUserById = (id, response) => {
    if(id){
        con.query("SELECT * FROM `users` WHERE id = ?", id, (getUserErr, getUserRes) => {
            if(!getUserErr){
                response.send(getUserRes)
            }else{
                response.status(400).send(getUserErr)
            }
        })
    }else{
        response.status(400).send({error: "Bad Request there is no have specific user id in your request. you must have to provide it"})
    }    
}


// select multiple users by there ids
users.selectMultipleUsersByIds = (request, response) => {
    let ids = request.headers['ids']
    if(ids){
        const reqIds = request.headers['ids'].split(',');
        const ids = [...reqIds]
        con.query("SELECT * FROM `users` WHERE id IN (?)",[ids], (getUsersErr, getUsersRes) => {
            if(!getUsersErr){
                response.send(getUsersRes)
            }else{
                response.status(400).send(getUsersErr)
            }
        })
    }else{
        response.status(400).send({error: "Bad Request there is no have specific users ids in your request. you must have to provide it"})
    }    
}


// insert new user into db
users.insertNewUser = (request, response) => {
    let first_name = typeof(request.body.first_name) === 'string'
                        && request.body.first_name
                        ?  request.body.first_name
                        :  false; 

    let last_name = typeof(request.body.last_name) === 'string'
                        && request.body.last_name
                        ?  request.body.last_name
                        :  false;                       
   
    let username = typeof(request.body.username) === 'string'
                        && request.body.username
                        ?  request.body.username
                        :  false;
    
    let role = typeof(request.body.role) === 'string'
                        && request.body.role
                        ?  request.body.role
                        :  false; 
                        
    let category = typeof(request.body.category) === 'string'
                        && request.body.category
                        ?  request.body.category
                        :  false; 
                        
    let country = typeof(request.body.country) === 'string'
                        && request.body.country
                        ?  request.body.country
                        :  false;                  

    if(username && role){
        newUser = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            role: role,
            category: category,
            country: country
        }
        
        con.query("INSERT INTO `users` set ?", newUser, (createErr, createRes) => {
            if(!createErr) {
              response.status(201)
                 .send({message: "User  "+  newUser.username + " created successfully with ID: " + createRes.insertId});
            }else{
              response.status(400)
                 .send("Bad Request " + createErr);
            }
        }) 
    }else{
        response.status(400).send({error: "Bad Request at least username and user role you have to provide"})
    }    
}


// update specific user info
users.updateUserById = (request, response) => {
    const id = typeof(request.body.id) === 'string'
                 && request.body.id 
                 ?  parseInt(request.body.id) 
                 :  false; 
    if(id){
        let first_name = typeof(request.body.first_name) === 'string'
                 && request.body.first_name
                 ?  request.body.first_name
                 :  false; 
                
        let last_name = typeof(request.body.last_name) === 'string'
                 && request.body.last_name
                 ?  request.body.last_name
                 :  false;   

        let username = typeof(request.body.username) === 'string'
                 && request.body.username
                 ?  request.body.username
                 :  false;         

        let role = typeof(request.body.role) === 'string'
                 && request.body.role
                 ?  request.body.role
                 :  false;  
                 
        let category = typeof(request.body.category) === 'string'
                 && request.body.category
                 ?  request.body.category
                 :  false; 
                 
        let country = typeof(request.body.country) === 'string'
                 && request.body.country
                 ?  request.body.country
                 :  false;   

        let updatedAt = new Date()
    
        con.query("UPDATE `users` SET first_name=?, last_name=?, username=?, role=?, category=?, country=?, update_at=? WHERE id = ?", 
                [first_name, last_name, username, role, category, country, updatedAt, id], (updateErr, updateRes) => 
                {
                    if(!updateErr) {
                    response.status(200)
                        .send({message: "Updated user "+ username + " info successfully"});
                    }else{
                    response.status(400)
                        .send("Bad Request " + updateErr);
                    }
        })  

    }else{
        response.status("400").send("Bad Request you must have to give an user id")
    }
}


// delete an user
users.deleteUserById = (id, response) => {
    con.query("SELECT id FROM `users` WHERE id = ?", id, (getUserErr, getUserRes) => {
        if(!getUserErr){
            let dbId = getUserRes.length
            if(dbId === 1){
                con.query("DELETE FROM `users` WHERE id = ?", id, (deleteUserErr, deleteUserRes) => {
                    if(!deleteUserErr){
                        response.status(200)
                           .send("Id : " + id + " user is just deleted now")
                    }else{
                        response.status(400)
                           .send(deleteUserErr)
                    }
                })
            }else{
                response.status(400).send({error: "Sorry requested id: "+id+" is not exist in our db"})
            }
        }
    })
}

// // delete multiple users by ids
// app.deleteMultipleUsersByIds("/users", (req, res) => {
//     const reqIds = req.body.ids.split(",")
//     const ids = [...reqIds]
//     con.query("DELETE FROM `users` WHERE id IN (?)", [ids], (deleteUsersErr, deleteUsersRes) => {
//         if(!deleteUsersErr){
//             console.log(deleteUsersRes)
//             res.status(200)
//                .send("Id : " + [ids] + " users is just deleted now")
//         }else{
//             res.status(400)
//                .send(deleteUsersErr)
//         }
//     })
// })

module.exports = users;