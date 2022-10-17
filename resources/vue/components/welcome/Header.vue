<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
        >
          <img
            src="/images/logo.png"
            class="rounded-circle"
            width="64"
            height="64"
          />
        </a>

        <ul
          class="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-right mb-md-0"
        >
          <router-link class="nav-link px-3" :to="{ name: 'Home' }">{{
            $t('router.homepage')
          }}</router-link>
          <router-link
            v-show="!isAuthenticated"
            class="nav-link px-3"
            :to="{ name: 'Login' }"
            >{{ $t('router.login') }}</router-link
          >
          <router-link
            v-show="!isAuthenticated"
            class="nav-link px-3"
            :to="{ name: 'Register' }"
            >{{ $t('router.register') }}</router-link
          >
        </ul>

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="getPathToPhoto"
              alt="mdo"
              class="rounded-circle"
              width="32"
              height="32"
            />
          </a>
          <ul class="dropdown-menu text-small">
            <div v-show="!isAuthenticated">
              <li>
                <router-link class="nav-link px-3" :to="{ name: 'Login' }">{{
                  $t('router.login')
                }}</router-link>
              </li>
              <li>
                <router-link class="nav-link px-3" :to="{ name: 'Register' }">{{
                  $t('router.register')
                }}</router-link>
              </li>
            </div>
            <div v-show="isAuthenticated">
              <CDropdownItem>
                <CIcon icon="cil-house" />
                <router-link :to="{ name: 'Admin' }">
                  {{ $t('router.my-space') }}
                </router-link>
              </CDropdownItem>
              <CDropdownItem @click="logout">
                <CIcon icon="cil-lock-locked" />{{ $t('router.logout') }}
              </CDropdownItem>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('userinfo', ['getPathToPhoto']),
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
}
</script>
<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: brown;
}

.nav-link {
  color: black;
}
</style>
