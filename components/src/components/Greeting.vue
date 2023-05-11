<template>
  <p>{{ msg }}</p>
</template>

<script>
export default {
  name: 'Greeting',
  data() {
    return {
      msg: "Hello World! I'm the Greeting Component!",
    }
  },
}
</script>