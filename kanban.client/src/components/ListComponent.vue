<template>
  <div class="component col-3 background-light border">
    <h2 class="mb-5">
      {{ listProps.title }} :
    </h2>
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

export default {
  name: 'ListComponent',
  props: {
    listProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks[props.listProps.id])
    })
    onMounted(async() => {
      try {
        // console.log('listcomponent mounted', props.listProps.id)
        await taskService.getTasks(props.listProps.id)
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
