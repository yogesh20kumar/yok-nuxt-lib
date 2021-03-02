import * as helpers from "./helpers/index.js";
// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`);
// extract the namespace from the options
const { namespace } = options;
// create the plugin
export default ({ store }, inject) => {
  // get a reference to the vuex store's state
  const { state } = store;
  // inject an object of functions into the app
  inject(namespace, {
    sidebar() {
      return helpers.sidebar({ state, namespace });
    },
    lock() {
      return helpers.lock({ state, namespace });
    },
    setSidebar(adjustment) {
      return helpers.setSidebar({
        state,
        store,
        namespace,
        adjustment,
      });
    },
    setLock(adjustment) {
      return helpers.setLock({
        state,
        store,
        namespace,
        adjustment,
      });
    },
  });
};
