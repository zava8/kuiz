<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import {useQuizStore} from '@/stores/quizStore';

const store = useQuizStore();
const { quizzes } = storeToRefs(store);
const { calculateScore } = store
const selectedOption = ref('');
</script>

<template>
  <div class="question" v-for="(quiz, index) of quizzes.questions.slice(0, 5)" :key="index">
      <b>{{`${index+1}. ${quiz.question}`}}</b>
      <ul>
        <li
          v-for="(option, k, i) in quiz.options"
          :key="i"
        >
          <div>
            <label :for="`question-${index}-option-${k}`" class="label">
              <input
              type="radio"
              :id="`question-${index}-option-${k}`"
              :name="`question-${index}`"
              :value="option"
              :v-model="selectedOption"
              @click="calculateScore(k, quiz.correct_answer)"
            >
              {{ k }}. {{ option }}
            </label>
          </div>
        </li>
      </ul>
  </div>
</template>

<style>
.question {
  margin-block-end: 1em;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-block-start: 0.5em;
}
</style>