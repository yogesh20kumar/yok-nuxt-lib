const { resolve, join } = require("path");
const { readdirSync } = require("fs");

export default function (moduleOptions) {
  // Get all options for the module.
  const options = {
    ...moduleOptions,
    ...this.options.yok,
  };

  // Expose the namespace / set a default.
  if (!options.namespace) options.namespace = "yok";
  const { namespace } = options;

  // Add the debug plugin.
  const pluginsToSync = [
    "components/index.js",
    "store/index.js",
    "plugins/index.js",
    "middleware/index.js",
  ];
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options,
    });
  }

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ["plugins", "store", "components/lib"];
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString);
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options,
      });
    }
  }
}

module.exports.meta = require("./package.json");
