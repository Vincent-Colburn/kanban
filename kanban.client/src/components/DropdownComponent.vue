<template>
  <a class="dropdown-item" href="#" @click.prevent="editTask(taskProp, listProps.id)">{{ listProps.title }}</a>
</template>

<script>
import { taskService } from '../services/TaskService'
import { logger } from '../utils/Logger'
export default {
  name: 'DropdownComponent',
  props: {
    listProps: { type: Object, required: true },
    taskProp: { type: Object, required: true }
  },
  setup() {
    return {
      editTask(task, newListId) {
        try {
          taskService.editTask(task, newListId)
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
