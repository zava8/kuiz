<script setup>
import QuizView from './Quiz.vue';
import { useQuizStore } from '@/stores/quizStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const { score } = storeToRefs(store);

</script>

<template>
  <div class="heading">
    <h1>General Knowledge</h1>
    <b>Score {{score}}</b>
    <button class :disabled="isActive">Submit</button>
  </div>
  <div>
    <QuizView/>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin-block-end: 1em;
}
</style>