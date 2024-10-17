<template>
  <div class="home-view">
    <SideMenu />
    <main>
      <div class="wrap">
        <h1>Ok, let’s change your preferences</h1>
        <button 
          @click="showUnsubscribeConfirmation" 
          class="unsubscribe-all"
          :disabled="subscriptionProgress === 0"
        >
          Unsubscribe from all
        </button>
      </div>
      <div class="subscription-grid">
        <SubscriptionBlock 
          v-for="subscription in subscriptions" 
          :key="subscription.site" 
          :site="subscription.site"
        />
      </div>
      <ConfirmationPopup 
        v-if="showConfirmation" 
        :currentPercentage="Math.round(subscriptionProgress)"
        @confirm="handleUnsubscribeAll" 
        @cancel="hideConfirmation"
      />
      <div v-if="showPopup" class="popup">
        Progress change: {{ progressDifference }}%
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import SubscriptionBlock from '@/components/SubscriptionBlock.vue'
import ConfirmationPopup from '@/components/ConfirmationPopup.vue'
import SideMenu from '@/components/SideMenu.vue'

const store = useSubscriptionStore()
const { subscriptions } = store

const showConfirmation = ref(false)
const showPopup = ref(false)
const progressDifference = ref('0')

const subscriptionProgress = computed(() => store.subscriptionProgress)

const showUnsubscribeConfirmation = () => {
  showConfirmation.value = true
}

const hideConfirmation = () => {
  showConfirmation.value = false
}

const handleUnsubscribeAll = () => {
  progressDifference.value = store.unsubscribeAll()
  hideConfirmation()
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 3000)
}
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  height: 100%;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}

main {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  width: 50vw;

  @media screen and (max-width: 800px) {
    width: 85vw;
  }
}

.wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.unsubscribe-all {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #d32f2f;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.subscription-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.popup {
  position: fixed;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  bottom: 20px;
  right: 20px;
}

@media screen and (max-width: 1400px) {
  h1 {
    display: none;
  }
}
</style>