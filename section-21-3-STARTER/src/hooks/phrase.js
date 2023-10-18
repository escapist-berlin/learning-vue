import { ref, watchEffect, watch } from "vue";

export const usePhrase = () => {
  const phrase = ref("");
  const reversedPhrase = ref("");
  const num = ref("");

  watchEffect(() => {
    reversedPhrase.value = phrase.value.split("").reverse().join("");
  });

  // if we want specifiy what we want to watch
  // watch([phrase], ([newVal, oldVal]) => {
  //   reversedPhrase.value = phrase.value.split("").reverse().join("");
  // });

  return { phrase, reversedPhrase, num }
}