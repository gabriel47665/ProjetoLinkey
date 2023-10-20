const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "123",
  database: "linkey",
});

pool.connect();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/usuarios", async (req, res) => {
  const resultado = await pool.query("select * from usuario");

  res.send(resultado.rows);
});

app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;

    const senhaEncriptada = await bcrypt.hash(usuario.senha, 12);

    await pool.query(
      `insert into usuario values(default, '${usuario.nome}', '${usuario.email}', '${senhaEncriptada}','${usuario.username}')`
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const usuario = req.body;
    console.log(usuario);

    const resultado = await pool.query(`select * from usuario where email = '${usuario.email}'`);
    const usuarioBanco = resultado.rows[0];

    if (resultado.rows.length > 0 && bcrypt.compareSync(usuario.senha, usuarioBanco.senha)) {
      res.send({
        token: jwt.sign({ id: usuarioBanco.id }, "macacobanana", {
          expiresIn: "10m",
        }),
        usuario: {
          id: usuarioBanco.id,
          nome: usuarioBanco.nome,
          email: usuarioBanco.email
        }
      });
    } else {
      res.status(401).send({ error: "Usuário ou Senha Inválido!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(8080);
