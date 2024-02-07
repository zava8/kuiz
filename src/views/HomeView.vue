<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <h2>Welcome to Quizzy</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id cupiditate animi quisquam molestiae eum, itaque pariatur quaerat, illo voluptatibus sint velit possimus odio enim nisi sit. Provident, cumque non?
    </p>
    <router-link to="/question/1">
      Start Quiz
    </router-link>
  </div>
</template>