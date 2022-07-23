<template>
  <div class="ui menu">
    <div class="ui container">
      <a data-v-115fd1f0="" class="header item" href="/home">
        <img src="/images/logo.png" class="logo" />
        Studovac
      </a>
      <router-link class="item" :to="{name: 'home'}">Home</router-link>
      <div role="listbox" tabindex="0" class="simple ui item dropdown">
        <div role="alert" aria-live="polite" class="text">Dropdown</div>
        <i aria-hidden="true" class="dropdown icon"></i>
        <span class="sizer"></span>
        <div tabindex="-1" class="menu transition">
          <a role="option" class="item" href="#">Link Item</a>
          <a role="option" class="item" href="#">Link Item</a>
          <div role="option" class="divider"></div>
          <div class="header">Header Item</div>
          <div role="option" class="item">
            <i class="dropdown icon"></i> Submenu
            <div tabindex="-1" class="simple menu transition">
              <a role="option" class="item" href="#">Link Item</a>
              <a role="option" class="item" href="#">Link Item</a>
            </div>
          </div>
          <a role="option" class="item" href="#">Link Item</a>
        </div>
      </div>
      <div class="right menu">
        <div class="item">
          <div class="ui action left icon input" placeholder="Submit">
            <input type="text" placeholder="Submit">
            <i class="search icon"></i>
            <button role="button" class="ui button">Submit</button>
          </div>
        </div>
        <router-link class="item" :to="{name: 'login'}">Sing in</router-link>
        <router-link class="item" :to="{name: 'register'}">Sing up</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //
}
</script>
