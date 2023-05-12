<template>
  <button type="button" @click="age++">Update Age</button>
  <p>The user is {{ age }} years old</p>
</template>

<script>
export default {
  name: "User",
  props: ["age"],
}
</script>