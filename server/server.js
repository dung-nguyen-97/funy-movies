const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: '3306',
  password: 'root',
})

db.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

// start server
const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
