<template>
  <div class="component col-12">
    <h3>{{ taskProp.title }} </h3>
    <i class="fa fa-trash text-danger" v-if="state.account.id == taskProp.creatorId" @click="deleteTask" aria-hidden="true"></i>
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
import { taskService } from '../services/TaskService'
export default {
  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments[props.taskProp.id])
    })
    onMounted(async() => {
      try {
        await commentService.getComments(props.taskProp.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      deleteTask() {
        try {
          taskService.deleteTask(props.taskProp)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
