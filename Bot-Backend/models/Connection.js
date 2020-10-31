const {PG_MAX_POOL_CLIENTS,
  PG_IDLE_TIMEOUT_MILLIS,
  PG_CONN_TIMEOUT_MILLIS} = require("./../config/config");

const {Pool} = require("pg");

const dbconfig = {
  max: PG_MAX_POOL_CLIENTS,
  idleTimeoutMillis: PG_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis: PG_CONN_TIMEOUT_MILLIS,
  ssl: true,
};

const pool = new Pool(dbconfig);

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
