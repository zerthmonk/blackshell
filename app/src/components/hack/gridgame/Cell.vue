<template>
  <div class="cell" :class="{
    highlighted: props.isHighlighted,
    selected: props.isSelected,
    hinted: props.isHinted
  }">
    <span>{{ props.hexValue }}</span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface cellProps {
  isHighlighted?: boolean;
  isSelected?: boolean;
  isHinted?: boolean;
  hexValue: string | number;
}

const props = defineProps<cellProps>();

</script>

<style scoped lang="scss">
// todo: move colors to variables
.cell {
  display: grid;
  text-align: center;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  aspect-ratio: 1 / 1;
  border: 1px solid transparent;
  background: rgb(15,15,15, .5);

  span {
    user-select: none;
  }
}

.hinted.highlighted {
  border: 1px solid rgba(255,255,255,.5);
  background: rgba(150,150,150,.5)
}

.selected {
  border: 1px dotted rgba(155,155,155,.5);
  background: rgba(150, 150, 150, .5);
}

.hinted {
  background: rgba(75,75,75, .5);
}

.highlighted {
  border: 1px solid rgba(255,255,255,.15);
}
</style>