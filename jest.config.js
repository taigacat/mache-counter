process.env.TZ = 'Asia/Tokyo';

/** @type {import('jest').Config} */
module.exports = {
  displayName: 'unit',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transformIgnorePatterns: ['/node_modules/.*'],
  testMatch: ['<rootDir>/**/*.spec.(tsx|ts)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/node_modules/jest-css-modules',
    '^src/(.+)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  snapshotResolver: '<rootDir>/jest-snapshot-resolver.js',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/*.spec.{ts,tsx,js,jsx}',
    '!**/*.snapspec.{ts,tsx,js,jsx}',
    '!**/assets/**',
  ],
  coverageDirectory: './reports/coverage',
  reporters: ['default'],
  coverageReporters: ['text', 'html', 'text-summary', 'lcov'],
  verbose: false,
};
