const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const sexo = req.body.sexo;
  const cargo = req.body.cargo;
  const pais = req.body.pais;

  db.query(
    "INSERT INTO empleados(nombre, edad, sexo, cargo, pais) VALUES (?, ?, ?, ?, ?)",
    [nombre, edad, sexo, cargo, pais],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const sexo = req.body.sexo;
  const cargo = req.body.cargo;
  const pais = req.body.pais;

  db.query(
    "UPDATE empleados SET nombre=?, edad=?, sexo=?, cargo=?, pais=? WHERE id=?",
    [nombre, edad, sexo, cargo, pais, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
 

  db.query(
    "DELETE from empleados WHERE id=?",id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
