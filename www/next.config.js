const withTypescript = require("@zeit/next-typescript");

module.exports = {
  target: "serverless",
  ...withTypescript(),
};
