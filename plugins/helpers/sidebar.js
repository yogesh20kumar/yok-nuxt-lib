// plugins/helpers/counter.js
// functions to get, adjust and log the counter in the store
// the store module in question will be created with the namespace
// module option as it's name

// mini function to handle if no store, or no store module
// with our namespace exists
const storeModuleExists = ({ state, namespace }) => {
  if (!state || !state[namespace]) {
    console.error(`${namespace} nuxt module error: store not initialized`);
    return false;
  } else {
    return true;
  }
};

// function to return the current value of the count
export const sidebar = ({ state, namespace }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined;
  // return the counter vale from the store
  return state[namespace].sidebar;
};

// function to return the current value of the count
export const lock = ({ state, namespace }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined;
  // return the counter vale from the store
  return state[namespace].lock;
};

// functions to adjust the counter
export const setSidebar = ({ state, store, namespace, adjustment }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined;
  // adjust the value of the counter using a store mutation
  return store.commit(`${namespace}/setSidebar`, adjustment);
};

// functions to adjust the counter
export const setLock = ({ state, store, namespace, adjustment }) => {
  // handle no store:
  if (!storeModuleExists({ state, namespace })) return undefined;
  // adjust the value of the counter using a store mutation
  return store.commit(`${namespace}/setLock`, adjustment);
};
