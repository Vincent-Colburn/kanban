<template>
  <div class="component col-3 background-light border">
    <h2>{{ listProps.title }}</h2>
    <div class="row">
      <TaskComponent />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { logger } from '../utils/Logger'
import { taskService } from '../services/TaskService'

export default {
  name: 'ListComponent',
  props: {
    listProps: { type: Object, required: true }
  },
  setup(props) {
    onMounted(async() => {
      try {
        // console.log('listcomponent mounted', props.listProps.id)
        await taskService.getTasks(props.listProps.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
