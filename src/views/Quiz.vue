<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'
import { useRoute, useRouter } from 'vue-router'
import DisplayScore from '../components/DisplayScore.vue'

const route = useRoute()
const router = useRouter()
const store = useQuizStore()
const { calculateScore, setSelectedIndex } = store
const { score, quizzes, selectedIndex, isFinished, options } = storeToRefs(store)

const questionNo = ref(parseInt(route.params.id))
const quizIndx = ref(quizzes.value.questions.findIndex((item) => item.id === questionNo.value))
const quiz = ref(quizzes.value.questions[quizIndx.value])
const showScoreModal = ref(false)

const selectedOption = ref(options.value[quizIndx.value])

const handleSubmit = () => {
  // what happens when we submit
  isFinished.value = true
  showScoreModal.value = true
}

const showFeedback = computed(() => {
  return (
    isFinished.value &&
    quizzes.value.questions[quizIndx.value].correct_answer !== selectedOption.value
  )
})

const restart = () => {
  router.push({ name: 'quiz', params: { id: 1 } })
  const timer = setTimeout(() => {
    window.location.reload()
  },0)
   timer()

  return () => {
    clearTimeout(timer)
  }
}

watch(
  () => route.params.id,
  (newId) => {
    questionNo.value = newId
  }
)

watch(questionNo, (num) => {
  quiz.value = quizzes.value.questions.find((item) => item.id === num)
})

const quizLength = computed(() => quizzes.value.questions.length)

const previous = computed(() => {
  const currentIndex = quizzes.value.questions.findIndex((item) => item.id === questionNo.value)
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0
  return quizzes.value.questions[previousIndex].id
})

const next = computed(() => {
  const currentIndex = quizzes.value.questions.findIndex((item) => item.id === questionNo.value)
  const nextIndex = currentIndex + 1
  return quizzes.value.questions[nextIndex].id
})
</script>

<template>
  <div class="question-container">
    <b class="progress-indicator">
      Question {{ questionNo }} /
      {{ quizzes.questions.length }}
    </b>
    <b class="question">{{ quiz.question }}</b>
    <!-- display feedback -->
    <transition name="feedback">
      <p v-if="showFeedback" class="feedback-card">
        {{ quiz.feedback }}
      </p>
    </transition>
    <ul>
      <li v-for="(option, k, i) in quiz.options" :key="i">
        <div>
          <label
            :for="`question-${i}-option-${k}`"
            class="label"
            :class="{
              selected: selectedIndex[quizIndx] === i && !isFinished,
              correct: selectedIndex[quizIndx] === i && k === quiz.correct_answer,
              incorrect: selectedIndex[quizIndx] === i && k !== quiz.correct_answer
            }"
            @click="!isFinished && setSelectedIndex(quizIndx, i)"
          >
            <input
              type="radio"
              class="option"
              :id="`question-${i}-option-${k}`"
              :name="`question-option-${i}`"
              :value="k"
              :disabled="isFinished"
              v-model="selectedOption"
              @change="calculateScore(selectedOption, quiz.correct_answer, questionNo - 1)"
            />
            {{ k }}. {{ option }}
          </label>
        </div>
      </li>
    </ul>
    <div class="navigation">
      <div v-show="questionNo != 1">
        <router-link :to="{ name: 'quiz', params: { id: previous } }"> Previous </router-link>
      </div>

      <div v-if="questionNo < quizLength">
        <router-link :to="{ name: 'quiz', params: { id: next } }"> Next </router-link>
      </div>
      <div v-else>
        <button class="submit-btn" type="button" @click="handleSubmit" :disabled="isFinished">
          Submit
        </button>
      </div>
    </div>
  </div>

  <!-- Score board -->
  <DisplayScore
    :show-modal="showScoreModal"
    :score="score"
    :quiz-len="quizLength"
    @close-modal="showScoreModal = !showScoreModal"
  />
  <button v-if="isFinished" @click="restart" class="restart">Restart</button>
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 30px;
  background-color: #ececec;
  border-radius: 8px;
}

.question {
  font-size: 20px;
  margin-block-start: 10px;
  margin-block-end: 10px;
}

.feedback-card {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 6px;
  transition:
    opacity 0.3s,
    transform 0.3s ease-in-out;
}

.feedback-enter-active,
.feedback-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s ease-in-out;
}

.feedback-enter-from,
.feedback-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

input[type='radio'] {
  display: none;
}

ul {
  margin-block-start: 1em;
}

ul li {
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

ul li:hover {
  background-color: #fcfbfb;
}

.label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

.label.selected {
  background-color: rgb(2, 75, 104);
  letter-spacing: 0.2px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-block-start: 0.9em;
}

.navigation :where(a, button) {
  text-decoration: none;
  padding: 10px;
  background-color: #0158b6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.correct {
  background-color: green;
  color: white;
  font-weight: bold;
}

.incorrect {
  background-color: red;
  color: white;
  font-weight: bold;
}

.submit-btn {
  background-color: purple;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.restart {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.restart:hover {
  background-color: #45a049;
}
</style>
