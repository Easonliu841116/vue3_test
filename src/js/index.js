import 'normalize.css'
import '../style/index.sass'
import { ref, createApp } from './vue.common'
import './components/add'

const Todo = {
  template: `
    <div>
      <input v-model="state" />
      <h1 class="test">
        {{ state }}
      </h1>
    </div>
  `,
  setup() {
    const state = ref('')
    return {
      state
    }
  }
}

createApp(Todo)
  .mount('#app')


const Todo2 = {
  template: `
    <div>
      <input v-model="state" />
      <h1 class="test2">
        {{ state }}
      </h1>
    </div>
  `,
  setup() {
    const state = ref('')
    return {
      state
    }
  }
}

createApp(Todo2)
  .mount('#app2')

