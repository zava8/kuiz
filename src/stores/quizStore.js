import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import quiz from '../quiz.json'

export const useQuizStore = defineStore('counter', () => {
  const quizzes = ref(quiz);
  const score = ref(0);

  const calculateScore = (answer, correctAnswer) => {
    if (answer === correctAnswer) { 
      score.value+=1;
    } else if (score.value > 0 && answer !== correctAnswer) {
      score.value-=1;
    }
    console.log(answer, correctAnswer)
    return null;
  };

  const displayScore = computed(() => {
    return score.value;
  })

  return { quizzes, score, calculateScore, displayScore }
})
