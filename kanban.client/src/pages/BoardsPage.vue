<template>
  <div class="div container-fluid">
    <div class="row">
      <!-- this is where you should put the title -->
      <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createBoard">
        <p>Create Board</p>
        <input
          type="text"
          name="title"
          id="title"
          v-model="state.newBoard.title"
          class="form-control d-flex"
          aria-describedby="title"
        />
        <button type="submit" class="btn btn-success">
          +
        </button>
      </form>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!--This is where you need to put the Boards component that iterates over our data  -->
        <BoardComponent v-for="board in boards" :key="board.id" :board-prop="board" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
// import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { logger } from '../utils/Logger'
export default {
  name: 'BoardsPage',
  setup() {
    // const router = useRoute()
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
          // const title = state.newBoard.title
          // const creator = state.user
          // const addedBoard = { title, creator }
          console.log('this is your new board', state.newBoard)
          await boardService.createBoard(state.newBoard)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>
