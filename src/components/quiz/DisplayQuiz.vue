<script setup>
import QuizView from './QuizView.vue';

</script>

<template>
  <div class="heading">
    <h1>General Knowledge</h1>
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