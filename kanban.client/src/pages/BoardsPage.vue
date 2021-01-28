<template>
  <div class="div container-fluid">
    <div class="row">
      <!-- this is where you should put the title -->
      <div class="col my-5">
        <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createBoard">
          <div class="row justify-content-center">
            <div class="col-4 pr-0">
              <input
                type="text"
                name="title"
                id="title"
                v-model="state.newBoard.title"
                class="form-control d-flex"
                aria-describedby="title"
                placeholder="Create New Board"
              />
            </div>
            <div class="col-1 pl-0">
              <button type="submit" class="btn btn-success">
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <!--This is where you need to put the Boards component that iterates over our data  -->
      <BoardComponent v-for="board in boards" :key="board.id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { logger } from '../utils/Logger'
export default {
  name: 'BoardsPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      newBoard: {}
    })

    onMounted(async() => {
      try {
        await boardService.getBoards()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      boards: computed(() => AppState.boards),
      async createBoard() {
        try {
          console.log('this is your new board', state.newBoard)
          const id = await boardService.createBoard(state.newBoard)
          state.newBoard = {}
          router.push({ name: 'BoardDetailsPage', params: { id } })
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>
