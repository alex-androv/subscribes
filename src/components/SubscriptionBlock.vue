<template>
    <div class="subscription-block" :class="{ 'subscribed': isSubscribed }">
      <h3>{{ site }}</h3>
      <label class="switch">
        <input type="checkbox" :checked="isSubscribed" @change="handleToggle">
        <span class="slider"></span>
      </label>
      <div v-if="showPopup" class="popup">
        Progress change: {{ progressDifference }}%
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useSubscriptionStore } from '@/stores/subscriptionStore'
  
  const props = defineProps<{
    site: string
  }>()
  
  const store = useSubscriptionStore()
  
  const isSubscribed = computed(() => 
    store.subscriptions.find(sub => sub.site === props.site)?.subscribed || false
  )
  
  const showPopup = ref(false)
  const progressDifference = ref('0')
  
  const handleToggle = () => {
    progressDifference.value = store.toggleSubscription(props.site)
    showPopup.value = true
    setTimeout(() => {
      showPopup.value = false
    }, 3000)
  }
  </script>
  
  <style scoped lang="scss">
  .subscription-block {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  
    &.subscribed {
      background-color: #e6f7ff;
    }
  
    h3 {
      margin: 0;
    }
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
  
      &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
    }
  
    input:checked + .slider {
      background-color: #2196F3;
    }
  
    input:checked + .slider:before {
      transform: translateX(26px);
    }
  }
  
  .popup {
    position: absolute;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
  </style>