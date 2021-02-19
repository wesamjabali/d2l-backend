module.exports = {

  development: {
    client: 'pg',
    connection: "postgres://postgres:postgres@localhost:5432/db_d3l",
    migrations: {
      directory: __dirname + "/database/migrations",
    },
    seeds: {
      directory: __dirname + "/database/seeds",
    },
  },

  production: {
    client: 'pg',
    connection: String(process.env.HEROKU_POSTGRESQL_COPPER_URL) + "?sslmode=require",
    migrations: {
      directory: __dirname + "/database/migrations",
    },
    seeds: {
      directory: __dirname + "/database/seeds",
    },
  }
};
