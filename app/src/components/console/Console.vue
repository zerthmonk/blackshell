<template>
  <div class="console">
    <div class="console__history" ref="history">
      <Stdout v-for="(message, index) in data.stdout"
              :content="message"
              :timestamp="2314124"
              :isResponse="false"
              ></Stdout>
      <!-- <Stdout v-for="({timestamp, message, response}, index) in data.stdout"
              :content="message"
              :timestamp="timestamp"
              :isResponse="response"
              ></Stdout> -->
    </div>
    <div class="console__stdin">
      <span class="prompt">user#> </span>
      <input class="console__input"
             ref="input"
             type="text"
             v-model="data.stdin"
             @keyup.enter="execute"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import Stdout from "~/components/console/Stdout.vue";

const input = ref(null);
const history = ref(null);

const data = reactive({
  stdin: '',
  prompt: '$>',
  history: [],
  stdout: [],
  locked: false,
})

function execute() {
  data.history = [...data.history, data.stdin];
  data.stdout = [...data.stdout, data.stdin];
  data.stdin = '';
}

watch(() => data.history, () => {
  console.log('watch')
  history.value.scrollTo({top: history.value.scrollHeight})
}, {flush: 'post'})

onMounted(() => {
  input.value.focus();
})

</script>

<style lang="scss" scoped>
@import '~/assets/style/main.scss';
@import '~/assets/style/typer.scss';

$console-font-size: 1.75rem;
// $stdin-bottom-margin: .5rem;

.console {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.console__stdin {
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  gap: 1rem;
  border-top: 2px dotted rgba(255, 255, 255, 0.3);

  .prompt {
    font-size: 1.75rem;
    line-height: $console-font-size;
  }

  .console__input {
    height: $console-font-size;
    font-size: $console-font-size;
    font-family: $main-font, monospace;
    color: rgba($color-main, .8);
    background: none;
    border: 0;
    border-radius: 0;
    &:focus, &:active {
      outline: none;
    }
  }
}

.console__history {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}

</style>