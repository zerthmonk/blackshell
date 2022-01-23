<template>
  <div class="konsole">
    <div class="konsole-hist" ref="history">
      <Stdout v-for="(std, index) in stdout" :message="std"></Stdout>
    </div>
    <div class="konsole-stdin">
      <span class="prompt">{{prompt}}</span>
      <input ref="stdin"
             type="text"
             v-model="stdin"
             @keyup.enter="execute"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Stdout from "@/components/console/Stdout.vue"

export default defineComponent({
  name: "Console",
  components: {
    Stdout,
  },

  data: () => ({
    stdin: {
      type: String,
      default: ''
    },
    prompt: {
      type: String,
      default: '$>',
    },
    history: {
      type: Array,
      default: [''],
    },
    stdout: {
      type: Array,
      default: [],
    },
    locked: {
      type: Boolean,
      default: false,
    },
    commands: {
      type: Array,
      default: []
    }
  }),

  methods: {
    execute(event) {
      if (event.target.value === '') return
      this.stdin = ''

      const value = event.target.value;
      const cleaned = value.replace(/\s+/g, '').toUpperCase();

      // if (this.commands.includes(cleaned)) {
      //   this.$socket.emit("user-input", {"action": cleaned, "success": true});
      // }
      // this.$socket.emit("console", {"message": value})
      // todo:
      //  - нужно сделать эмит в локальную шину, из которой можно опционально слать аксиосом события вовне
      //  - а если стэндалон режим - то писать локально куда-нибудь
      this.stdout.push({"content": value})
      this.scroll()
    },
    scroll() {
      this.$refs.history.scrollTop = this.$refs.history.scrollHeight
    },
  },

  created() {
    this.$store.watch(
        () => {return this.$store.state.eventList},
        (newVal) => {
          this.stdout = newVal
          this.scroll()
        },
        {
          deep: true
        })
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

.konsole-stdin {

  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.2);
  padding: .25rem .5rem;

  .prompt {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  input {
    width: 100%;
    height: 1.75rem;
    font-size: 1.25rem;
    font-family: "VT220", monospace;
    border: 0;
    border-radius: 0;
    color: $main-green;
    background: none;
    caret-shape: block;

    &:focus, &:active {
      outline: none;
    }
  }
}

.konsole-hist {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 71vh;
  display: flex;
  flex-direction: column;
  padding-left: .75rem;
  padding-bottom: 1.15rem;
}
</style>