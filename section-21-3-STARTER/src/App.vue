<template>
  <div>
    <p>{{ num }}</p>
    <button type="button" @click.pevent="increment">Click me</button>

    <p>{{ name }}</p>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
// ref for Primitive Values / access though .value
// reacitve for Objects / access directly
// toRefs allows to make property reactive if we use spread operator
// spread operator is not available at reactive so we need toRefs

export default {
  name: "App",
  setup() {
    let num = ref(0);

    // console.log(num);

    function increment() {
      num.value++;
    }

    const user = reactive({
      name: "John",
      age: 20,
    });

    setTimeout(() => {
      user.name = "Luis";
    }, 3000);

    return {
      num,
      increment,
      ...toRefs(user),
    }
  },
};
</script>
