const mysql = require('mysql');
const express = require('express');

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "secret",
  database: "test_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  // 
});

app.post('/', (req, res) => {
  // 
});

app.post('/:id', (req, res) => {
  // 
})

app.listen(3000, () => console.log('express!!!'));