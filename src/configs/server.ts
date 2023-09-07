export default {
  PORT: 3000,
  address: '0.0.0.0',
  cors: { origin: true, methods: ['GET'] },
  validationPipe: { whitelist: true, transform: true },
  mongoOpts: {
    uri: 'mongodb://mongo_user:mongo_user@localhost:27017/?authMechanism=DEFAULT',
    dbName: 'sfxdx',
  },
};
