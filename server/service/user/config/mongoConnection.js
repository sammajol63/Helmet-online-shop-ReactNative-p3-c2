const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb+srv://samuel96silalahi:5J1DNuNrn1GLfzWI@cluster0.ym7mn9p.mongodb.net/test"; // ini dibuat ke mongo atlas
let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    // client.db("nama-database-yang-akan-digunakan")
    const database = client.db("User");

    // Nilai variable global yang akan diset
    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;
module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
