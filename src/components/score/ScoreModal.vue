<script setup>
import {useQuizStore} from '@/stores/quizStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const { score } = storeToRefs(store);

</script>

<template>
  <div>
    
  </div>
</template>


<style scoped>
</style>