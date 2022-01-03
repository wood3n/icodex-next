const path = require("path");

module.exports = function () {
  return {
    name: "webpack-config-plugin",
    configureWebpack(config, isServer, utils, content) {
      return {
        resolve: {
          alias: {
            "@": path.resolve(process.cwd(), "./src"),
          },
          extensions: [".js", ".jsx"],
        },
      };
    },
  };
};
