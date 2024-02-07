import { ref } from 'vue'
import { defineStore } from 'pinia'
import data from '../quiz.json'

export const useQuizStore = defineStore('quiz', () => {
  const quizzes = ref(data);
  const score = ref(0);
  const selectedIndex = ref({});
  const isFinished = ref(false);
  const options = ref({});


  const setSelectedIndex = (quizIndx, index) => {
    selectedIndex.value[quizIndx] = index;
  }
  

  const calculateScore = (answer, correctAnswer, index) => {
    index = parseInt(index);

    // track selected options 
    options.value[index] = answer;

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
    isFinished,
    options,
    calculateScore 
  }
})
