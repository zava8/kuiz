import { ref } from 'vue'
import { defineStore } from 'pinia'
import data from '../quiz.json'

export const useQuizStore = defineStore('quiz', () => {
  const quizzes = ref(data);
  const score = ref(0);
  const selectedIndex = ref({});


  const setSelectedIndex = (quizIndx, index) => {
    selectedIndex.value[quizIndx] = index;
  }
  

  const calculateScore = (answer, correctAnswer, index) => {
    index = parseInt(index);

    if (answer === correctAnswer) {
      score.value++;
      quizzes.value.questions[index].is_checked = true;
    } else {
      // check if user has previously answered this question
        if (quizzes.value.questions[index].is_checked) {
          score.value--;
          quizzes.value.questions[index].is_checked = false;
        }
      }
    }

  return { 
    quizzes,
    score,
    selectedIndex,
    setSelectedIndex,
    calculateScore 
  }
})
