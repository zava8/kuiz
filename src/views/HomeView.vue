<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container">
    <div>
      <h2>Welcome to Quizzy</h2>
      <p>
        This is a demo quiz app bulit with VueJS
      </p>
    </div>
    <div>
      <router-link to="/question/1" class="start">
        Start Quiz
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: grid;
    gap: 1em;
  }

  p {
    width: 40%;
    color: white;
    margin: 0 auto;
  }
  .start {
    display: inline-block;
    background-color: skyblue;
    padding: 0.6em;
    text-decoration: none;
    font-weight: bold;
    color: black;
    border-radius: 0.6px;
  }
</style>