<template>
  <h3>Hey!</h3>
  <greeting :age="age"/>
  <user :age="age"/>
</template>

<script>
// register a component locally
import Greeting from './components/Greeting.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    Greeting,
    User
  },
  data() {
    return {
      age: 20
    }
  }
}
</script>