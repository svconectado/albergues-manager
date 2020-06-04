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
export default {
  components: {},
  data() {
    return {
      username: '',
      password: '',
      messageRequest: ''
    }
  },
  methods: {
    login() {
      const data = {
        identifier: this.username,
        password: this.password
      }
      this.messageRequest = 'Espera...'
      this.$axios
        .post('auth/local', data)
        .then((res) => {
          this.messageRequest = 'Datos correctos'
          this.$axios.setToken(res.data.jwt, 'Bearer')
          this.$router.push('/')
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
