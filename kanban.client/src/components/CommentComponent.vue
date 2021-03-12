<template>
  <div class="comment-component my-2">
    <span>{{ commentProps.body }} - {{ commentProps.creator.name }}
      <i class="fa fa-trash text-danger" v-if="state.account.id == commentProps.creatorId" @click="deleteComment" aria-hidden="true"></i>
    </span>
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
