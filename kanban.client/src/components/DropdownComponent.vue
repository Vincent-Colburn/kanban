<template>
  <a class="dropdown-item" href="#" @click.prevent="editTask(listProps.id)">{{ listProps.title }}</a>
</template>

<script>
import { taskService } from '../services/TaskService'
export default {
  name: 'DropdownComponent',
  props: {
    listProps: { type: Object, required: true }
  },
  setup() {
    return {
      editTask(id) {
        try {
          taskService.editTask(id)
        } catch (error) {

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
