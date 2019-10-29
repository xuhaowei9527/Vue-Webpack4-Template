module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  clearMocks: true,
  coverageDirectory: "coverage",
  // testEnvironment: "node",
  // collectCoverage: true
  // collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
  // coverageReporters: ["html", "text-summary"]
};
