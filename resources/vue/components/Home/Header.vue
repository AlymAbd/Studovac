<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="chocofamily" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem v-if="isAuthenticated">
          <router-link class="nav-link" :to="{ name: 'HomeAdmin' }"
            >Админка</router-link
          >
        </CNavItem>
        <CNavItem v-if="isAuthenticated">
          <a class="nav-link" href="#" @click="logout">Выйти</a>
        </CNavItem>
        <CNavItem v-if="!isAuthenticated">
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Вход</router-link
          >
        </CNavItem>
        <CNavItem v-if="!isAuthenticated">
          <router-link class="nav-link" :to="{ name: 'Register' }"
            >Регистрация</router-link
          >
        </CNavItem>
        <CNavItem v-if="!isAuthenticated">
          <router-link class="nav-link" :to="{ name: 'Restore Password' }"
            >Восстановить пароль</router-link
          >
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav v-if="isAuthenticated">
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppHeaderDropdownAccnt from '@/components/App/AppHeaderDropdownAccnt'
import { mapGetters } from 'vuex'
import { chocofamily } from '@/assets/brand/chocofamily'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderDropdownAccnt,
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {
          this.$router.push({ name: 'Home' })
        })
    },
  },
  setup() {
    return {
      chocofamily,
    }
  },
}
</script>
