<template>
  <Cell
    :class="{pointed: props.hinted, disabled: disabled}"
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
const disabled = computed(() => props.selected && props.hinted);

function handleClick() {
  emit('select');
}

function handleHover(value: boolean): void {
  highlighted.value = value;
}

</script>
<style scoped lang="scss">
.pointed {
  cursor: pointer;
}

.disabled {
  cursor: auto;
  pointer-events: none;
  background: rgba(0,0,0,.1);
  color: rgba(0,0,0,.25);
}
</style>