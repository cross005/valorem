const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './handlers',
    testRegex: ['_test.ts$'],
    testTimeout: 30000
};
