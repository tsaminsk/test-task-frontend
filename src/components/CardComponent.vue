<script setup>
import { computed } from 'vue'
import ItemComponent from '@/components/ItemComponent.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.every((item) => item?.id && item?.name)
    },
  },
  action: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits({
  choose: (item) => {
    if (!item || typeof item !== 'object' || !item.id) {
      console.warn('Invalid item emitted:', item)
      return false
    }
    return true
  },
})

const getAction = computed(() => (item) => {
  try {
    return !!props.action(item)
  } catch (error) {
    console.error('Error in action function:', error)
    return false
  }
})

const handleItemClick = (item) => {
  emit('choose', item)
}
</script>

<template>
  <div class="card flex-1">
    <ItemComponent
      v-for="item in data"
      :selected="getAction(item)"
      :key="item.id"
      :name="item.name"
      @click="handleItemClick(item)"
    />
  </div>
</template>

<style scoped></style>
