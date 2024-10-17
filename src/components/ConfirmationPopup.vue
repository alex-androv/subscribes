<template>
    <div @click.self="$emit('cancel')" class="popup-overlay">
      <div class="popup-content">
        <button @click="$emit('cancel')" class="close-btn" aria-label="Close">&times;</button>
        <h2>{{ currentPercentage > 0 ? 'Are you sure? ' : 'Nothing Selected' }}</h2>
        <p v-if="currentPercentage > 0">
          Please confirm that you want to unsubscribe from all and lose {{ currentPercentage }}% fun.
        </p>
        <p v-else>
          You are not currently subscribed to any sites.
        </p>
        <div class="button-group">
          <button 
            v-if="currentPercentage > 0" 
            @click="$emit('confirm')" 
            class="confirm-btn"
          >
            Yes, unsubscribe all
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    currentPercentage: number
  }>()
  
  defineEmits(['confirm', 'cancel'])
  </script>
  
  <style scoped lang="scss">
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    position: relative;
    max-width: 80%;
    width: 400px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #888;
    transition: color 0.3s ease;
  
    &:hover {
      color: #333;
    }
  }
  
  h2 {
    margin-top: 0;
  }
  
  .button-group {
    margin-top: 20px;
  }
  
  .confirm-btn {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
    &:hover {
      background-color: #d32f2f;
    }
  }
  </style>