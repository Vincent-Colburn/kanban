<template>
  <div class="container-fluid BoardDetailsPage">
    <div class="row">
      <div class="col">
        <h1 class="text-white text-center">
          {{ board.title }}
        </h1>
        <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createList">
          <div class="form-row justify-content-center">
            <div class="col-3">
              <input
                type="text"
                name="title"
                id="title"
                v-model="state.newList.title"
                class="form-control d-flex"
                placeholder="Create list..."
                aria-describedby="title"
              />
            </div>
            <div class="col-1">
              <button type="submit" class="btn btn-success">
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
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
      lists: computed(() => AppState.lists),
      newList: {
        title: '',
        board: route.params.id
      }
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
      board: computed(() => AppState.activeBoard),
      async createList() {
        try {
          console.log('this is your new list', state.newList)
          // console.log('route.paradmkjflflka', route.params.id)
          await listService.createList(state.newList, route.params.id)
          state.newList.title = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
