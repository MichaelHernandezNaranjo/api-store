const env = process.env;

const config = {
  db: { /* don’t expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || '127.0.0.1',
    user: env.DB_USER || 'api',
    password: env.DB_PASSWORD || '123456',
    database: env.DB_NAME || 'data',
    port: env.DB_PORT || '3306'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  SecretKey: env.SECRECT_KEY || 'JDIFN3745YY3NI3NIH54Y8HG843H75T3NFJNRGJN4I99ID'
};
module.exports = config;