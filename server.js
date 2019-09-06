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

// /users GET Listado de recursos
// /users POST Creando un recurso
// /users/:id GET Solicitando 1 recurso
// /users/:id DELETE Eliminando 1 recurso
// /users/:id PUT Modificar el elemento


app.get('/users', (req, res) => {
  // "SELECT * FROM users";
  con.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    return res.json(result);
  })
});

app.post('/users', (req, res) => {
  const data = req.body;
  // "INSERT INTO users (username, first_name, last_name) values (...)"
  con.query(`INSERT INTO users (username, first_name, last_name) 
    values ('${data.username}', '${data.first_name}', '${data.last_name}')`,
    (err, result) => {
      if (err) throw err;
      return res.json(data);
    }
  )
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  con.query(`DELETE from users where id=${userId}`, (err, result) => {
    if (err) throw err;
    return res.status(204).end();
  });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  con.query(`UPDATE users SET 
    username='${data.username}',
    first_name='${data.first_name}',
    last_name='${data.last_name}'
    WHERE id=${userId}`, (err, result) => {
      if (err) throw err;
      return res.json(data);
    })
})

app.listen(3000, () => console.log('express!!!'));