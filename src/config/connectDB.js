import mysql from "mysql2/promise";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "test",
// });

console.log("Creating connection pool ...");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
});

export default pool;
