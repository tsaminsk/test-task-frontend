import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { blockLeftData, blockRightData } from '@/mock/data.json'

export const useGlobalStore = defineStore('global', () => {
  const selectedLeftItems = ref([])
  function chooseLeftItem(item) {
    if (item?.id && selectedLeftItems.value.length >= 6) {
      selectedLeftItems.value.shift()
    }
    selectedLeftItems.value.push(item)
  }
  function removeLeftItem(item) {
    if (item?.id >= 0 && selectedLeftItems.value?.length) {
      selectedLeftItems.value = selectedLeftItems.value.filter(({ id }) => id !== item.id)
    }
  }
  const selectedLeftItemsCount = computed(() => selectedLeftItems.value?.length ?? 0)

  const selectedRightItem = ref(null)
  function chooseRightItem(item) {
    selectedRightItem.value = item
  }
  function removeRightItem() {
    selectedRightItem.value = null
  }

  const blockLeftDataCount = computed(() => blockLeftData.length)

  return {
    selectedLeftItems,
    chooseLeftItem,
    selectedRightItem: selectedRightItem,
    chooseRightItem,
    blockLeftData,
    blockRightData,
    removeLeftItem,
    removeRightItem,
    selectedLeftItemsCount,
    blockLeftDataCount,
  }
})
