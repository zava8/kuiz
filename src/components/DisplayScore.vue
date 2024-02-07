<script setup>
  import { computed } from 'vue';
 const props = defineProps({
    score: Number,
    quizLen: Number,
    showModal: Boolean
  });

  const passingScore = 2;

  const displayScore = computed(() => {
    return props.score >= passingScore ? '/complete-icon.jpg' : '/try-again.jpg'
  });
</script>

<template>
  <div class="modal" v-if="showModal">
      <div class="modal-content" v-if="showModal">
        <button class="close" @click="$emit('close-modal')">X</button>
        <div class="result">
          <img :src="displayScore" alt="result icon">
          <h4>{{ props.score >= passingScore ? 'Great Job!' : 'Try again' }}</h4>
          <h2>You scored</h2>
          <h3>{{ score }} / {{ quizLen }}</h3>
        </div>
      </div>
  </div>
</template>

<style scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 1em;
    border: 1px solid #888;
    border-radius: 6px;
    width: 40%;
    animation: view 1.1s forwards linear;
  }

  @keyframes view {
    from {
      transform: translateX(20px);
      opacity: 0;
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  .result :where(h3) {
    font-size: 3rem;
  }
  .close {
    appearance: none;
    border: none;
    background-color: tomato;
    text-align: center;
    padding-inline: 6.9px;
    padding-block: 3.5px;
    align-self: flex-end;
    color: white;
    border-radius: 3px;
    font-size: 18px;
    font-weight: bold;
    transform-origin: bottom;
    transition: color 0.3s linear;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    width: 20%;
  }
</style>