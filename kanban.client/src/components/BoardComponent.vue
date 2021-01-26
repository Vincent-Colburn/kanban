<template>
  <div class="row border">
    <div class="col">
      <!-- <router-link :to="{ name: 'BoardDetailsPage', params: { id: boardProp.id}}"> -->
      <h1> {{ boardProp.title }}</h1>
      <!-- This may need to be changed, unsure if we are going to get the creator -->
      <h4> {{ boardProp.user }}</h4>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'BoardComponent',
  props: {
    boardProp: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
      // boards: computed(() => AppState.boards)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
