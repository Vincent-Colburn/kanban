<template>
  <div class="col-4 list-component my-3 mx-5 rounded">
    <router-link :to="{ name: 'BoardDetailsPage', params: { id: boardProp.id}}" class="words">
      <h1> Board : {{ boardProp.title }}</h1>
      <!-- This may need to be changed, unsure if we are going to get the creator -->
      <h4> Created By : {{ boardProp.creator.name }}</h4>
    </router-link>
    <i class="fa fa-trash text-danger" v-if="state.account.id == boardProp.creatorId" @click="deleteBoard" aria-hidden="true"></i>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { logger } from '../utils/Logger'

export default {
  name: 'BoardComponent',
  props: {
    boardProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      boards: computed(() => AppState.boards)
    })
    return {
      state,

      deleteBoard(boardProp) {
        try {
          // console.log('this is the delete board', props.boardProp.id)
          boardService.deleteBoard(props.boardProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-component {
  background-color: rgba(227, 250, 212, 0.596)
}
.words {
  color: black;
}
</style>
