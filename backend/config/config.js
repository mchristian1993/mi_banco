const promise = require('bluebird');
const options = {
  promiseLib: promise,
  query: (e) => {

   console.log(e.query);
  }
};
const { Client } = require('pg')
const connectionData = {

  user: 'postgres',

  host: '127.0.0.1',

  database: 'mi_banco',

  password: 'christian',

  port: 5432,

}

const db= new Client(connectionData)
db.connect()

 module.exports = db;