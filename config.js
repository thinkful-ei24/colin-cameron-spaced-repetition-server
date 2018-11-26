'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
  process.env.DATABASE_URL || 'mongodb://dev:password123@ds149382.mlab.com:49382/spaced-repetition',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://dev:password123@ds125851.mlab.com:25851/spaced-repetition-test'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
