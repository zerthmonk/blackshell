<template>
  <div class="account-box">
    <div class="account-form">
      <div class="account-header">
        <div class="header__image" :style="userImage"></div>
        <div class="header__info">
          <label class="info__label" for="username">{{labels.boxheader}}</label>
          <div id="username" class="info__username">{{account.username}}</div>
          <label class="info__label" for="account-login">{{labels.password}}</label>
          <input id="account-login" type="password" value="*****">
        </div>
      </div>
    </div>
    <div class="account-controls">
      <a class="account-button" ref="additional" href="#">{{labels.hack}}</a>
      <a class="account-button" ref="login" href="#">{{labels.login}}</a>
    </div>
  </div>
</template>

<script>
import networkImage from '@/assets/img/network.svg'
import mainStoreMixin from "@/components/mixins/mainStoreMixin.vue"

export default {
  name: "AccountBox",

  mixins: [mainStoreMixin],

  props: {
    account: {}
  },

  computed: {
    labels() {
      if (this.mainStore.config.lang === 'ru') {
        return {
          password: 'пароль',
          boxheader: 'авторизация пользователя ...',
          hack: 'запуск диагностики',
          login: 'подтвердить'
        }
      } else {
        return {
          password: 'password',
          boxheader: 'user authorizing...',
          hack: 'run recovery mode',
          login: 'confirm password',
        }
      }
    },
    userImage() {
      return {backgroundImage: `url(${networkImage})`}
    }
  }
}
</script>

<style lang="scss" scoped>
.account-form {
  border: 1px solid $main-opaque;
  background-color: rgba(255,255,255,.15);
  padding: 3rem 1.75rem;
}

.account-header {
  display: flex;
  margin-bottom: 1rem;
}

.header__image {
  width: 10rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: .8;
}

.header__info {
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info__username {
  width: 100%;
  text-align: left;
  font-size: 2rem;
  margin: 0 auto 1rem 0;
  text-transform: uppercase;
}

.info__label {
  display: block;
  font-size: 1rem;
  letter-spacing: 1px;
}

input {
  padding: 8px 8px 0 0;
  height: 2rem;
  font-size: 2rem;
  background: none;
  border: none;
  border-bottom: 1px solid $main-opaque;
  color: white;
  outline: none;

  &:focus, &:active, &:hover {
    border: none;
    border-bottom: 1px solid $main-opaque;
  }
}

label {
  font-size: 1rem;
  margin-right: 1rem;
}

.account-controls {
  height: 3rem;
  max-width: calc(100% - 7rem);
  border: 1px solid $main-opaque;;
  background: #333;
  margin-top: -1.5rem;
  margin-left: auto;
  margin-right: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.account-button {
  display: flex;
  align-items: center;
  height: 2em;
  line-height: 2rem;
  margin: .5rem 2rem;
  font-size: 1.25rem;
  text-transform: uppercase;
}

</style>