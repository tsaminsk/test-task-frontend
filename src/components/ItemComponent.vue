<script setup>
import { defineProps } from 'vue'

const { name, selected } = defineProps({
  name: {
    type: String,
    default: '',
  },
  selected: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="item" :class="{ 'item--selected': selected }">
    <span>{{ name }}</span>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';

.item {
  width: 70px;
  height: 70px;
  padding: 0.3rem;
  border: 2px solid $Gray1Color;
  text-align: center;
  line-height: 54px;
  cursor: pointer;
  background-color: #eeeeeecc;

  &--selected {
    pointer-events: none;
    opacity: 0.6;
  }

  &__close {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 10px;
    height: 10px;
    transition: opacity 0.3s ease-in-out;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 1px;
      background-color: $RedColor;
      transform: translate3d(-3px, 3px, 0) rotate(45deg);
      transform-origin: center;
    }

    &:after {
      transform: translate3d(-3px, 3px, 0) rotate(-45deg);
    }
  }

  &--active {
    position: relative;
    cursor: auto;

    &:hover .item__close {
      opacity: 1;
      pointer-events: auto;
      cursor: pointer;
    }
  }
}
</style>
