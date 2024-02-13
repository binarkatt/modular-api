const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
  testRegex: '.*\\.(test)\\.ts$',
  testEnvironment: 'node',
  modulePaths: ['./'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
