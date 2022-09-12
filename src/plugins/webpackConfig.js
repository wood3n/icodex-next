const path = require("path");

module.exports = function () {
  return {
    name: "webpack-config-plugin",
    configureWebpack() {
      return {
        resolve: {
          alias: {
            "@/demo": path.resolve(process.cwd(), "./src/demo"),
            "@/components": path.resolve(process.cwd(), "./src/components"),
          },
          extensions: [".js", ".jsx"],
        },
      };
    },
  };
};
