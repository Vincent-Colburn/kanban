<template>
  <div class="task-component col-11 p-3 my-3 rounded shadow">
    <h5>
      {{ taskProp.title }}
      <i class="fa fa-trash text-danger" v-if="state.account.id == taskProp.creatorId" @click="deleteTask" aria-hidden="true"></i>
    </h5>
    <div class="col-12">
      <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-props="comment" />
    </div>
    <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createComment">
      <div class="row py-3">
        <div class="col-10 pr-0">
          <input
            type="text"
            name="body"
            id="body"
            v-model="state.newComment.body"
            class="form-control d-flex input"
            placeholder="Enter new comment here...."
            aria-describedby="title"
          />
        </div>
        <div class="col-2 pl-0">
          <button type="submit" class="btn btn-success">
            +
          </button>
        </div>
      </div>
    </form>

    <div class="dropdown">
      <button class="btn toggler dropdown-toggle button"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
      >
        Move task to other list:
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <DropdownComponent v-for="list in state.lists" :key="list.id" :list-props="list" :task-prop="taskProp" />
      </div>
    </div>
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
      lists: computed(() => AppState.lists.filter(l => l.id !== props.taskProp.list)),
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
          // console.log('appstate lists', state.lists)
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
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.task-component {
  background-color: rgba(116, 116, 116, 0.603);
}

.toggler {
  background-color: rgb(201, 245, 253);
}

.input {
  background-color: rgb(206, 203, 203);
}
.button {
  background-color: rgba(86, 167, 221, 0.726);
}

</style>
