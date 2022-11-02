<script>
import { mapStores } from 'pinia'
import { useMainStore } from "~/store/main"
import { defineComponent } from 'vue'

export default defineComponent({
  name: "mainStoreMixin",
  computed: {
    ...mapStores(useMainStore),
  }
})
</script>