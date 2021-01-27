<template>
  <div class="container-fluid BoardDetailsPage">
    <div class="row">
      <div class="col">
        <h1>{{ board.title }}</h1>
      </div>
    </div>
    <div class="row">
      <ListComponent v-for="list in state.lists" :key="list.id" :list-props="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { boardService } from '../services/BoardService'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
export default {
  name: 'BoardDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardService.getOne(route.params.id)
      } catch (error) {
        logger.log(error)
      }
      try {
        await listService.getLists(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      board: computed(() => AppState.activeBoard)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
