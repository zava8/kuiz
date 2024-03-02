<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container">
    <div>
      <h2>मuलटiपलe choice kueसटioन मcक kuiz मe यuमहaरa सवagतम</h2>
      <p>zava8.github.io ztr8</p>
    </div>
    <div>
      <router-link to="/question/1" class="start">अao kuiz सhuरu करe</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  gap: 1em;
}

p {
  width: 70%;
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
