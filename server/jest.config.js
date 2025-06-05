console.log("jest.config.js loaded");

module.exports = {
  testMatch: ["**/tests/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
};
