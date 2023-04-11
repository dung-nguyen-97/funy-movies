const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
