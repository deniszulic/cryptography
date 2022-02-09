import bcrypt, { hash } from "bcrypt";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kriptografija",
  password: "admin",
  port: 5432,
});
const createdata = async (request, response) => {
  const { id } = request.body;
  const { encrypt } = request.body;
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(encrypt, salt);
  pool.query(
    "INSERT INTO form (id, encrypt) VALUES ($1, $2) RETURNING id",
    [id, hash],
    (error, results) => {
      try {
        response.status(201).send(`Added with ID: ${results.rows[0].id}`);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const checkdata = async (request, response) => {
  const { id, encrypt } = request.body;
  pool.query(
    "SELECT id, encrypt FROM form WHERE id=$1",
    [id],
    (error, results) => {
      try {
        bcrypt
          .compare(encrypt, results.rows[0].encrypt)
          .then(function (result) {
            if (result && results.rows[0].encrypt) {
              delete results.rows[0].encrypt;
              response.status(200).json(results.rows);
            } else {
              throw new Error("Error");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  );
};

module.exports = {
  createdata,
  checkdata
};
