<template>
  <div class="page container login">
    <form class="login__form">
      <div>
        <label for="">Usuario</label>
        <input v-model="username" type="text" class="input-text" />
      </div>
      <div>
        <label for="">Password</label>
        <input v-model="password" type="password" class="input-text" />
      </div>
      <div>
        <span>{{ messageRequest }}</span>
      </div>
      <div>
        <button type="button" class="login-button" @click="login">
          Entrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      username: '',
      password: '',
      messageRequest: ''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user
    })
  },
  mounted() {
    if (this.user.logged) this.$router.push('/dashboard')
  },
  methods: {
    ...mapActions({
      loginUser: 'users/loginUser'
    }),
    login() {
      this.messageRequest = 'Espera...'
      this.loginUser({
        identifier: this.username,
        password: this.password
      })
        .then((res) => {
          this.messageRequest = 'Datos correctos'
          this.$router.push('/dashboard')
        })
        .catch(() => (this.messageRequest = 'Ocurrió un error'))
    }
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  @apply border p-4 mb-16 bg-blue-500;
}
</style>
