<template>
  <Cell
    :isHighlighted="highlighted"
    :isSelected="selected"
    :isHinted="props.hinted"
    :hexValue="props.hexValue"
    @mouseover="() => handleHover(true)"
    @mouseout="() => handleHover(false)"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import {defineProps, defineEmits, ref, computed} from "vue";
import Cell from './Cell.vue';

interface cellProps {
  hexValue: string | number;
  selected?: boolean;
  hinted?: boolean;
}

const props = defineProps<cellProps>();
const emit = defineEmits(['select']);
const highlighted = ref(false);
const selected = computed(() => props.selected || false);

function handleClick() {
  emit('select');
}

function handleHover(value: boolean) {
  highlighted.value = value;
}

</script>