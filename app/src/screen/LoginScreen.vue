<template>
  <div class="login-wrapper">
    <p class="blackshell-label">{{userHeader}}</p>
    <div class="users">
      <div class="user-list">
        <AccountRow v-for="(account, index) in userList"
                    :username="account.username"
                    @click="setSelectedAccount(index)"
        ></AccountRow>
      </div>
    </div>
    <div class="account">
      <AccountBox v-if="selectedAccount.username"
                  class="account__single" :account="selectedAccount"></AccountBox>
    </div>
    <background :theme="mainStore.colorTheme"></background>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Background from "@/components/basic/Background.vue"
  import Console from "@/components/console/Console.vue"
  import mainStoreMixin from "@/components/mixins/mainStoreMixin.vue"
  import AccountRow from "@/components/users/AccountRow.vue"
  import AccountBox from "@/components/users/AccountBox.vue"

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
        this.selectedAccount = this.userList[index];
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
  padding-top: 1rem;
}

.blackshell-label {
  width: 100%;
}

.users {
  min-width: 400px;
  padding-right: 1rem;
  border-right: 1px solid $main-opaque;
}

.user-list {
  padding: 1rem;
}

.account {
  display: flex;
  padding-top: 1rem;
  margin: auto;
  align-items: flex-start;
}

.account__single {
  height: max-content;
}

</style>