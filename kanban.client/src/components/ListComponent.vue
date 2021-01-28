<template>
  <div class="list-component col-3 m-5 p-3 rounded shadow">
    <h3 class="mb-5 text-center">
      {{ listProps.title }} <i class="fa fa-trash text-danger" v-if="state.account.id == listProps.creatorId" @click="deleteList" aria-hidden="true"></i>
    </h3>
    <form action="form-inline border justify-content-center align-items-center" @submit.prevent="createTask">
      <div class="row">
        <div class="col-10 pr-0">
          <input
            type="text"
            name="title"
            id="title"
            v-model="state.newTask.title"
            class="form-control d-flex"
            placeholder="new task here"
            aria-describedby="title"
          />
        </div>
        <div class="col-1 pl-0">
          <button type="submit" class="btn btn-success">
            +
          </button>
        </div>
      </div>
    </form>
    <div class="row justify-content-center">
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
.list-component {
  background-color: rgba(227, 250, 212, 0.596)
}
.form-control {
  background-color: rgb(206, 203, 203);
}

</style>
