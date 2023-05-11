<template>
  <greeting/>
</template>

<script>
// register a component locally
import Greeting from './components/Greeting.vue'

export default {
  name: 'App',
  components: {
    Greeting
  },
}
</script>
