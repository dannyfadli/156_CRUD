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
  db.query = ('SELECT * from biodata', (err, results) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Error executing query');
        return;
    }
    res.json(results);
  });
}); 


app.post('/api/mahasiswa', (req, res) => {
    const { nama, alamat, agama} = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({ message : "nama, alamat, agama are required"});
    }
    db.query(
        'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)',
        [nama, alamat, agama],
        (err, result) => { 
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database Error" });
            }
            res.status(201).json({ message: "User Created Succesfully" });
        }
    );
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const UserId = req.params.id;
    const { nama, alamat, agama} = req.body;
    db.query(
        'UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?',
        [nama, alamat, agama, UserId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database Error" });
            }
            res.status(200).json({ message: "User Updated Succesfully" });
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const UserId = req.params.id;
    db.query('DELETE FROM biodata WHERE id = ?', [UserId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.status(200).json({ message: "User Deleted Succesfully" });
    });
});