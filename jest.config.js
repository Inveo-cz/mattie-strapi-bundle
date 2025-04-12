'use strict';

module.exports = {
  name: 'Mattie strapi bundle Tests',
  testMatch: ['<rootDir>/**/*.spec.unit.js', '<rootDir>/**/*.test.unit.js'],
  modulePathIgnorePatterns: ['.cache'],
  transform: {},
  testTimeout: 7000,
  setupFilesAfterEnv: ['<rootDir>/test/unit.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.js', 'example/**/*.js'],
  coveragePathIgnorePatterns: ['build', '.cache', 'admin'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 90,
      lines: 80,
      statements: 80,
    },
  },
};
