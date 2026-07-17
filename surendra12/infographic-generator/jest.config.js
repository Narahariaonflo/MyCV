/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // covered by integration + manual
  ],
  coverageDirectory: 'coverage',
  verbose: true,
};
