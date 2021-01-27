<template>
  <div class="component col-12">
    <h3>{{ taskProp.title }}</h3>
  </div>
  <div class="col-12">
    <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-props="comment" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments[props.taskProp.id])
    })
    onMounted(async() => {
      try {
        await commentService.getComments(props.taskProp.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return { state }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
