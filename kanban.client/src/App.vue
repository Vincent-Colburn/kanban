<template>
  <header>
    <Navbar />
  </header>
  <main class="background">
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <span>Made with</span> <img src="./assets/img/logo.png" class="logo" alt="oops"> <span>by CodeWorks</span>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.logo {
  max-height: 25px;
}
.background{
  background-image: url("https://images.unsplash.com/photo-1460602594182-8568137446ce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80");
}

</style>
