const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { namespace } = options

export default ({ store }, inject) => {
  inject('myFunction', (string) => console.log('Hello', string))
}
