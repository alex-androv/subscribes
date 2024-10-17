import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import subscribeDataImport from '@/data/subscribe.json'

interface Subscription {
  site: string
  subscribed: boolean
}

export const useSubscriptionStore = defineStore('subscription', () => {
  const subscriptions = ref<Subscription[]>(subscribeDataImport as Subscription[])
  
  const subscriptionProgress = computed(() => {
    const totalSites = subscriptions.value.length
    const subscribedSites = subscriptions.value.filter(sub => sub.subscribed).length
    return (subscribedSites / totalSites) * 100
  })

  let oldProgress = subscriptionProgress.value

  const toggleSubscription = (site: string) => {
    oldProgress = subscriptionProgress.value
    const subscription = subscriptions.value.find(sub => sub.site === site)
    if (subscription) {
      subscription.subscribed = !subscription.subscribed
    }
    logCurrentState()
    return calculateProgressDifference()
  }

  const unsubscribeAll = () => {
    oldProgress = subscriptionProgress.value
    subscriptions.value.forEach(sub => sub.subscribed = false)
    logCurrentState()
    return calculateProgressDifference()
  }

  const logCurrentState = () => {
    console.log(JSON.stringify(subscriptions.value, null, 2))
  }

  const calculateProgressDifference = () => {
    const newProgress = subscriptionProgress.value
    const difference = newProgress - oldProgress
    return difference.toFixed(2)
  }

  const getCurrentState = () => {
    return JSON.stringify(subscriptions.value)
  }

  return {
    subscriptions,
    toggleSubscription,
    unsubscribeAll,
    subscriptionProgress,
    getCurrentState,
  }
})