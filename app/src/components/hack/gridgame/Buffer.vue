<template>
  <div class="trace-solution">
    <RandomizeText>
      <span>{{label}}</span>
    </RandomizeText>
    <Cell v-for="value in buffer"
      :hexValue="value"
      />
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed} from "vue";
import Cell from "./Cell";

interface bufferProps {
  label: string;
  tries: number;
  selected: string[];
}

const props = defineProps<bufferProps>();
const buffer = computed(() => Array.from('tries').map(idx => props.selected[idx] || '--'));

</script>

<style lang="scss">
</style>