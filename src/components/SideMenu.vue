<template>
    <aside class="side-menu">
      <h2>FUN YOU GET</h2>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: `${subscriptionProgress}%` }"></div>
        <span class="progress-text">{{ Math.round(subscriptionProgress) }}%</span>
      </div>
      <p>{{ subscribedCount }} out of {{ totalSites }} sites subscribed</p>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useSubscriptionStore } from '@/stores/subscriptionStore'
  
  const store = useSubscriptionStore()
  
  const subscriptionProgress = computed(() => store.subscriptionProgress)
  
  const subscribedCount = computed(() => 
    store.subscriptions.filter(sub => sub.subscribed).length
  )
  
  const totalSites = computed(() => store.subscriptions.length)
  </script>
  
  <style scoped lang="scss">
  .side-menu {
    width: 250px;
    background-color: #f0f0f0;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 800px) {
      width: 100%;
      margin-bottom: 40px;
    }
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .progress-container {
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-weight: bold;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
  </style>