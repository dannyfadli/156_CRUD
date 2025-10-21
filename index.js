const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '15975321dny',
  database: 'mahasiswa',
  port: 3309
});  

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', + err.stack);
    return;
  }
    console.log('Conection successful!');    
});

app.get('/api/mahasiswa', (req, res) => {
  db.query = 'SELECT * from biodata'; (err, results) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Error executing query');
        return;
    }
    res.json(results);
  };
}); 
