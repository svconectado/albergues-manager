<template>
  <header class="wrapper-header">
    <div v-if="user.logged">
      <span>
        {{ user.user.username }}
      </span>
      <button type="button" @click="logoutUser">
        Cerrar sesión
      </button>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.users.user
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'users/logoutUser'
    })
  }
}
</script>

<style lang="scss" scoped></style>
