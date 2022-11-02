<template>
  <div class="account-box" :class="{hacked: account.hacked}">
    <div class="account-title">{{title}}<span>---</span></div>
<!--    <div class="account-controls account-controls_close">-->
<!--      <a class="account-button" ref="close" @click="$emit('closeAccount')">{{labels.close}}</a>-->
<!--    </div>-->
    <div class="account-form">
      <div class="account-header">
        <div class="header__image" :style="userImage"></div>
        <div class="header__info">
          <label class="info__label" for="username">{{labels.boxheader}}</label>
          <div id="username" class="info__username">{{account.username}}</div>
          <label class="info__label" for="account-login">{{labels.password}}</label>
          <input id="account-login" type="password" v-model="inputPassword">
        </div>
      </div>
    </div>
    <div class="account-controls">
      <a v-if="!account.hacked"
         class="account-button" ref="additional" @click="$emit('hackAccount')">{{labels.hack}}</a>
      <span class="compromised" v-if="account.hacked">{{labels.compromised}} : {{account.password}}</span>
      <a class="account-button" ref="login" @click="login()">{{labels.login}}</a>
    </div>
  </div>
</template>

<script>
import networkImage from '~/assets/img/shell.svg'
import mainStoreMixin from "~/components/mixins/mainStoreMixin.vue"

export default {
  name: "AccountBox",
  mixins: [mainStoreMixin],
  emits: ['closeAccount', 'loginAccount', 'hackAccount'],

  props: {
    account: {}
  },

  data: () => ({
    "inputPassword": "*******"
  }),

  computed: {
    labels() {
      if (this.mainStore.config.lang === 'ru') {
        return {
          password: 'пароль',
          boxheader: 'пользователь',
          hack: 'режим отладки',
          login: 'подтвердить',
          close: 'закрыть',
          compromised: 'доступ разрешен'
        }
      } else {
        return {
          password: 'password',
          boxheader: 'user account',
          hack: 'recovery mode',
          login: 'confirm password',
          close: 'close',
          compromised: 'access granted'
        }
      }
    },
    userImage() {
      return {backgroundImage: `url(${networkImage})`, opacity: "0.2"}
    },
    title() {
      const hacked = `/// ${this.account.username} / ${this.labels.compromised} ///`
      const normal = `/// ${this.labels.boxheader} / ${this.account.username} ///`
      const title = this.account.hacked ? hacked : normal
      return title.toLowerCase()
    }
  },

  methods: {
    login() {
      this.$emit("loginAccount", [this.account.username, this.inputPassword])
    }
  }

}
</script>

<style lang="scss" scoped>
.account-form {
  border: 1px dashed rgba($color-white, .3);
  background-color: rgba(255,255,255,.15);
  padding: 3rem 1.75rem;
}

.account-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: .25rem;
  line-height: 1.25rem;
  font-size: 1rem;
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
  border-bottom: 1px solid rgba($color-white, .3);
  color: white;
  outline: none;

  &:focus, &:active, &:hover {
    border: none;
    border-bottom: 1px solid rgba($color-white, .3);
  }
}

.account-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  max-width: calc(100% - 7rem);
  border: 1px solid rgba($color-white, .3);;
  background: #333;
  margin-top: -1.5rem;
  margin-left: auto;
  margin-right: 1.75rem;
}

.account-controls_close {
  width: max-content;
  margin: 0 1.75rem -1.5rem auto;
}

.account-button {
  display: flex;
  align-items: center;
  height: 2em;
  line-height: 2rem;
  margin: .5rem 2rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  padding: 0 1rem;
  cursor: pointer;
}

.hacked {
  color: $color-white;
  .account-form {
    background: rgba(lighten($color-danger, 15%), .1);
    border: 1px dotted $color-white;
  }
  .account-button, .compromised {
    color: lighten($color-danger, 20%);
  }
  .account-title {
    color: lighten($color-danger, 20%);
  }
}

.compromised {
  color: $color-main;
  margin-left: 2rem;
  font-size: 1.15rem;
  line-height: 1.15rem;
}

</style>