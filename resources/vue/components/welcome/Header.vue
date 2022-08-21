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
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-right mb-md-0"
        >
          <router-link class="nav-link px-2 link-dark" :to="{ name: 'home' }"
            >HomePage</router-link
          >
          <router-link class="nav-link px-2 link-dark" :to="{ name: 'login' }"
            >Sing in</router-link
          >
          <router-link
            class="nav-link px-2 link-dark"
            :to="{ name: 'register' }"
            >Sing up</router-link
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
              src="https://github.com/mdo.png"
              alt="mdo"
              class="rounded-circle"
              width="32"
              height="32"
            />
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  //
}
</script>
