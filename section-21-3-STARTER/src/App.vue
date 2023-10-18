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

    <app-alert :user="user" />

    <button type="button" ref="btn">Button</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted
} from "vue";
import AppAlert from "@/components/Alert.vue";
import { useNumber } from "@/hooks/number";
import { usePhrase } from "@/hooks/phrase";
// ref for Primitive Values / access though .value
// reacitve for Objects / access directly
// toRefs allows to make property reactive if we use spread operator
// spread operator is not available at reactive so we need toRefs

export default {
  name: "App",
  components: {
    AppAlert,
  },
  setup() {
    const btn = ref(null);

    onBeforeMount(() => {
      console.log("onBeforeMount")
    });
    onMounted(() => {
      console.log("onMounted")

      btn.value.addEventListener('click', () => {
        console.log("btn clicked")
      })
    });

    const user = reactive({
      name: "John",
      age: 20,
    });

    setTimeout(() => {
      user.name = "Luis";
    }, 3000);

    const { num, increment, double } = useNumber();
    const { phrase, reversedPhrase, num: phraseNum } = usePhrase();

    return {
      num,
      increment,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      double,
      user,
      btn,
      phraseNum,
    }
  },
};
</script>
