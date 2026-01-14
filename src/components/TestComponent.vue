<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/global'
import CardComponent from './CardComponent.vue'
import ItemComponent from '@/components/ItemComponent.vue'

const globalStore = useGlobalStore()

const {
  blockLeftData,
  blockRightData,
  chooseLeftItem,
  chooseRightItem,
  removeLeftItem,
  removeRightItem,
} = globalStore

const selectedLeftItems = computed(() => globalStore.selectedLeftItems)
const selectedRightItem = computed(() => globalStore.selectedRightItem)

const selected = computed(
  () => `${globalStore.selectedLeftItemsCount}/${globalStore.blockLeftDataCount}`,
)
</script>

<template>
  <div class="container flex-1 column">
    <div class="row row--1 justify-between">
      <!-- выбранные вещи из вещей пользователя -->
      <div class="card card--200">
        <ItemComponent
          v-for="(item, index) in selectedLeftItems"
          class="item--active"
          :name="item.name"
          :key="index"
        >
          <span class="item__close" @click="removeLeftItem(item)"></span>
        </ItemComponent>
        <div class="card__footer">
          <b>selected: {{ selected }}</b>
        </div>
      </div>
      <div class="card card--200">
        <!-- выбранная вещь из вещей на выбор -->
        <ItemComponent
          v-if="selectedRightItem?.id"
          class="item--active"
          :name="selectedRightItem.name"
        >
          <span class="item__close" @click="removeRightItem"></span>
        </ItemComponent>
      </div>
    </div>
    <div class="row justify-between flex-1">
      <!-- things at the user (вещи у пользователя) -->
      <CardComponent
        :data="blockLeftData"
        :action="(item) => selectedLeftItems.find(({ id }) => id === item.id)"
        @choose="chooseLeftItem"
      >
      </CardComponent>
      <!-- things to choose from (вещи на выбор) -->
      <CardComponent
        :data="blockRightData"
        :action="(item) => selectedRightItem?.id === item.id"
        @choose="chooseRightItem"
      ></CardComponent>
    </div>
  </div>
</template>

<style scoped>
.row--1 {
  min-height: 210px;
}
</style>
