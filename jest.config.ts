export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch:["**/**/*.test.ts"],
    verbose: true,
    forceExit:true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    // clearMocks:true,
  };
  // jest.config.js


