const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

routes(app)


app.listen(5000, console.log("listening port with 5000 port"))