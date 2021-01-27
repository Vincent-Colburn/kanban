<template>
  <div class="component">
    <p>{{ commentProps.creator.name }}  :  {{ commentProps.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    commentProps: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
