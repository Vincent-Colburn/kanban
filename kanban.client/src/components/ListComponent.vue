<template>
  <div class="component col-3 background-light border">
    <h2 class="mb-5">
      {{ listProps.title }} : <i class="fa fa-trash text-danger" v-if="state.account.id == listProps.creatorId" @click="deleteList" aria-hidden="true"></i>
    </h2>
    <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createTask">
      <p>Create Task</p>
      <input
        type="text"
        name="title"
        id="title"
        v-model="state.newTask.title"
        class="form-control d-flex"
        placeholder="new task here"
        aria-describedby="title"
      />
      <button type="submit" class="btn btn-success">
        +
      </button>
    </form>
    <div class="row">
      <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { taskService } from '../services/TaskService'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
import { useRoute } from 'vue-router'

export default {
  name: 'ListComponent',
  props: {
    listProps: { type: Object, required: true }
  },
  setup(props) {
    const router = useRoute()
    const state = reactive({
      tasks: computed(() => AppState.tasks[props.listProps.id]),
      account: computed(() => AppState.account),
      newTask: {
        title: '',
        list: props.listProps.id
      }
    })
    onMounted(async() => {
      try {
        // console.log('listcomponent mounted', props.listProps.id)
        await taskService.getTasks(props.listProps.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      deleteList() {
        try {
          console.log('is this the ID from List Component', router.params.id)
          listService.deleteList(props.listProps.id, router.params.id)
        } catch (error) {
          logger.log(error)
        }
      },
      createTask() {
        // console.log('Id like a new task plz', props.listProps.id)
        try {
          taskService.createTask(state.newTask)
          state.newTask.title = ''
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
