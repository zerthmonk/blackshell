<template>
  <div class="console">
    <div class="console-hist" ref="history">
      <Stdout v-for="(std, index) in stdout" :message="std"></Stdout>
    </div>
    <div class="console-stdin">
      <span class="prompt">{{prompt}}</span>
      <input ref="stdin"
             class="input-console"
             type="text"
             v-model="stdin"
             @keyup.enter="execute"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { mapStores } from 'pinia'
import { useShellStore } from "@/store/shell"

import Stdout from "@/components/console/Stdout.vue"

export default defineComponent({
  name: "Console",
  components: {
    Stdout,
  },

  data: () => ({
    stdin: '',
    prompt: 'user@terminal#',
    history: [''],
    stdout: [],
    locked: false,
    commands: [],
    events: []
  }),

  computed: {
    ...mapStores(useShellStore),
  },

  methods: {
    execute(event) {
      if (event.target.value === '') return
      const value = event.target.value
      this.shellStore.consoleEvents.push({"content": value})
      this.stdin = ''
      this.scroll()
    },
    scroll() {
      this.$refs.history.scrollTop = this.$refs.history.scrollHeight
    },
  },

  created() {
    this.shellStore.$subscribe((mutation, state) => {
      this.events = state.consoleEvents
    })

    watch(
      () => {return this.events},
      (newVal) => {
        this.stdout = newVal
        this.scroll()
      },
      {
        deep: true
      }
    )
  },

  mounted() {
    this.$refs.stdin.focus()
  },

  activated() {
    this.scroll()
  }

})
</script>

<style lang="scss" scoped>
@import '@/assets/style/main.scss';
@import '@/assets/style/typer.scss';

$console-font-size: 1.75rem;
$stdin-bottom-margin: .5rem;

.console {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  margin: 24px;
}

.console-stdin {
  margin: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: .75rem;
  margin-right: 2.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  //background: rgba(0, 0, 0, 0.2);
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  .prompt {
    font-size: 1.75rem;
    line-height: $console-font-size;
  }

  .input-console {
    width: 100%;
    height: $console-font-size;
    font-size: $console-font-size;
    font-family: $main-font, monospace;
    color: $main-green;
    background: none;
    border: 0;
    border-radius: 0;
    &:focus, &:active {
      outline: none;
    }
  }
}

.console-hist {
  height: 100%;
  margin: $stdin-bottom-margin;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-left: .75rem;
  padding-bottom: $console-font-size + $stdin-bottom-margin;

  :first-child {
    margin-top: auto;
  }
}

</style>