<template>
  <div>
    <p>{{ num }}</p>
    <p>{{ double }}</p>
    <button type="button" @click.pevent="increment">Click me</button>

    <p>{{ name }}</p>

    <p>
      <input type="text" v-model="phrase"/>
    </p>
    <p>{{ reversedPhrase }}</p>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect, watch, computed } from "vue";
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

    const double = computed(() => {
      return num.value * 2;
    })

    const user = reactive({
      name: "John",
      age: 20,
    });

    setTimeout(() => {
      user.name = "Luis";
    }, 3000);

    const phrase = ref("");
    const reversedPhrase = ref("");

    watchEffect(() => {
      reversedPhrase.value = phrase.value.split("").reverse().join("");
    });

    // if we want specifiy what we want to watch
    // watch([phrase], ([newVal, oldVal]) => {
    //   reversedPhrase.value = phrase.value.split("").reverse().join("");
    // });

    return {
      num,
      increment,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      double,
    }
  },
};
</script>
