import { createApp } from 'vue'
import App from './App.vue'
// register a component globally:
// not recommended usually better locally
// import Greeting from '@/components/Greeting.vue'

let vm = createApp(App)

// vm.component('Greeting', Greeting)

vm.mount('#app')
