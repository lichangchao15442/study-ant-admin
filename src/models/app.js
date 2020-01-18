import store from "store"


export default {
  namespace: 'app',
  state: {
    theme: store.get("theme") || 'light',
    collapsed: store.get("collapsed") || false
  }
}
