<template>
  <div class="component col-12">
    <h3>{{ taskProp.title }} </h3>
    <i class="fa fa-trash text-danger" v-if="state.account.id == taskProp.creatorId" @click="deleteTask" aria-hidden="true"></i>
    <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createComment">
      <p>Create Comment</p>
      <input
        type="text"
        name="body"
        id="body"
        v-model="state.newComment.body"
        class="form-control d-flex"
        placeholder="Enter new comment here...."
        aria-describedby="title"
      />
      <button type="submit" class="btn btn-success">
        +
      </button>
    </form>
    <!-- TODO this is for the dropdown list to migrate different tasks to lists  -->
    <!-- <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
      >
        Select list to mirgate to:
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <DropwdownComponent v-for="list in state.lists" :key="list.id" :list-props="list" />
      </div>
    </div> -->
    <!--  -->
    <!-- <label for="tasks"> Choose a new List to put this task on!</label>
    <select name="lists" id=""> -->
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
      comments: computed(() => AppState.comments[props.taskProp.id]),
      lists: computed(() => AppState.lists),
      newComment: {
        body: '',
        task: props.taskProp.id
      }
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
      },
      createComment() {
        try {
          commentService.createComment(state.newComment)
          state.newComment.body = ''
        } catch (error) {
          logger.log(error)
        }
      },
      editTask(id) {
        console.log('this is the edit function from the task component', id)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
