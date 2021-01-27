<template>
  <div class="row border">
    <div class="col">
      <router-link :to="{ name: 'BoardDetailsPage', params: { id: boardProp.id}}">
        <h1> Board : {{ boardProp.title }}</h1>
        <!-- This may need to be changed, unsure if we are going to get the creator -->
        <h4> Created By : {{ boardProp.creator.name }}</h4>
      </router-link>
      <i class="fa fa-trash fa-7x text-danger" v-if="state.account.id == boardProp.creatorId" @click="deleteBoard" aria-hidden="true"></i>
    </div>
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

</style>
