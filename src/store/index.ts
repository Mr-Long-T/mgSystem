import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      name: 'Mr.Long'
    }
  }
})

export default store
