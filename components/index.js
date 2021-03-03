import Vue from 'vue'
import * as components from './lib'

// Get options passed from module.js
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

for (const name in components) {
  const component = components[name]
  Vue.component(component.name, {
    // Extend the original component
    extends: component,
    // Add a _yokOptions prop to gain access to the options in the component
    props: {
      _yokOptions: {
        type: Object,
        default: () => ({ ...options }),
      },
    },
  })
}
