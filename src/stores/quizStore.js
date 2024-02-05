import { ref } from 'vue'
import { defineStore } from 'pinia'
import data from '../quiz.json'

export const useQuizStore = defineStore('quiz', () => {
  const quizzes = ref(data);
  const score = ref(0);
  const selectedIndex = ref({});


  const setSelectedIndex = (quizIndx, index) => {
    selectedIndex.value[quizIndx] = index;
    console.log(selectedIndex.value)
  }
  

  const calculateScore = (answer, correctAnswer, index) => {
    index = parseInt(index);

    if (!quizzes.value.questions[index].is_checked) { 
      // console.log(answer, correctAnswer, index)
      if (answer === correctAnswer) {
        score.value++;
      }
    } else if (quizzes.value.questions[index].is_checked) {

        if(answer === correctAnswer) {
            return;
        } else {
            quizzes.value.questions[index].is_checked
           score.value-=1;
         }
      }
    
    return null;
  };

  return { 
    quizzes,
    score,
    selectedIndex,
    setSelectedIndex,
    calculateScore 
  }
})
