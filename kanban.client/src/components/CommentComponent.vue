<template>
  <div class="component" v-if="commentProps.creator">
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
