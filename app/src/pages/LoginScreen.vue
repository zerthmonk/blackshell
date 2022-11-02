<template>
  <div class="login-wrapper">
    <p class="blackshell-hdr">{{userHeader}}</p>
    <div class="users">
      <div class="user-list">
        <AccountRow v-for="(account, index) in userList"
                    :account="account"
                    @click="setSelectedAccount(index)"
        ></AccountRow>
      </div>
    </div>
    <div class="account">
      <AccountBox v-if="selectedAccount.username"
                  class="account__single"
                  :account="selectedAccount"
                  @hack-account="hackAccount"
                  @close-account="closeAccount"
                  @login-account="loginAccount"
      ></AccountBox>
    </div>
    <background :theme="mainStore.colorTheme"></background>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Background from "~/components/basic/Background.vue"
import Console from "~/components/console/Console.vue"
import mainStoreMixin from "~/components/mixins/mainStoreMixin.vue"
import AccountRow from "~/components/users/AccountRow.vue"
import AccountBox from "~/components/users/AccountBox.vue"

export default defineComponent({

  name: "MenuScreen",
  mixins: [mainStoreMixin],
  components: {
    AccountBox,
    Background,
    Console,
    AccountRow
  },

  data: () => ({
    selectedAccount: {}
  }),

  computed: {
    userHeader() {
      return this.mainStore.labels.login
    },
    userList() {
      return this.mainStore.users
    }
  },

  methods: {
    setSelectedAccount(index) {
      this.selectedAccount = this.selectedAccount === this.userList[index] ? {} : this.userList[index]
    },
    closeAccount() {
      this.selectedAccount = {}
    },
    hackAccount() {
      if (this.selectedAccount.hackable) {
        const idx = this.userList.findIndex(u => u.username === this.selectedAccount.username)
        this.mainStore.setHacked(idx)
      }
    },
    loginAccount(data) {
      this.mainStore.checkPassword(...data)
    }
  }

})

</script>

<style lang="scss" scoped>

.login-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 4rem;
  padding-top: 2rem;
}

.users {
  min-width: 400px;
  padding-right: 1rem;
  border-left: 1px solid rgba($color-white, .3);
}

.user-list {
  padding: 1rem;
  padding-left: 2rem;
}

.account {
  display: flex;
  margin: auto;
  align-items: flex-start;
}

.account__single {
  height: max-content;
}

</style>