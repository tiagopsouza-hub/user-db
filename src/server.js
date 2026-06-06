import express from 'express';
import mysql from 'mysql2/promise';

const port = 3000;
const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'user_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// C
app.post('/users', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const apelido = req.body.apelido ?? null;

    const result = await pool.query(
        'INSERT INTO user (nome, email, cpf, apelido) VALUES(?,?,?,?);',
        [nome, email, cpf, apelido]
    );

    res.status(201).json({msg: "Usuário criado com sucesso"});
})

// R
app.get('/users', async (req, res) => {
    const rows = await pool.query('SELECT * FROM user;');
    res.status(200).json(rows[0]);
})

// U
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const apelido = req.body.apelido ?? null;

    const update = await pool.query('UPDATE user SET nome = ?, email = ?, cpf = ?, apelido = ? WHERE id = ?;',
        [nome,email,cpf,apelido, id]
    );
    res.status(200).json({msg: "Usuário atualizado com sucesso!"})
})

// D
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('DELETE FROM user WHERE id = ?;',
        [id]
    );
    res.status(200).json({msg: "Usuário apagado com sucesso!"});
})

app.listen(port, () => {
    console.log("Servidor Rodando na porta " + port);
})