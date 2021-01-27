<template>
  <div class="component col-12">
    <h3>{{ taskProp.title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
