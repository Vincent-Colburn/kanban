<template>
  <div class="component">
    <p>{{ commentProps.creator.name }}  :  {{ commentProps.body }}</p>
    <i class="fa fa-trash text-danger" v-if="state.account.id == commentProps.creatorId" @click="deleteComment" aria-hidden="true"></i>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'CommentComponent',
  props: {
    commentProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)

    })
    return {
      state,
      deleteComment() {
        try {
          console.log('this is the delete comment from component', props.commentProps.task)
          commentService.deleteComment(props.commentProps)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
