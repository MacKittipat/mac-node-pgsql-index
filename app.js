const { Pool, Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "mactest",
  password: "password",
  port: 5432,
});

client.connect();
run();

async function run() {
  let text;
  for (let i = 0; i < 100000; i++) {
    text = `INSERT INTO users VALUES('{ "name": "${uuidv4()}", "lastname": "${uuidv4()}", "address": { "street" : "${uuidv4()}", "province": "${uuidv4()}" } }')`;
    let res = await client.query(text);
    console.log(res);
  }
}
