const unitTestConfig = require('./jest.config.js');

process.env.TZ = 'Asia/Tokyo';

/** @type {import('jest').Config} */
module.exports = {
  ...unitTestConfig,
  displayName: 'snapshot',
  testMatch: ['<rootDir>/**/*.snapspec.(tsx|ts)'],
  collectCoverage: false,
};
