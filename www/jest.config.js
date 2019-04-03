// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  preset: "ts-jest/presets/js-with-ts",
  // testEnvironment: "browser",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  setupTestFrameworkScriptFile: require.resolve("./jest.setup.js"),
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
};
