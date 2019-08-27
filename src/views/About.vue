<template>
  <div @click='open'>关于d</div>
</template>

<script>
export default {

  name: 'About',

  data () {
    return {

    }
  },
  methods:{
    open() {
      this.$message('这是一条消息提示');
    }
  }
}
</script>

<style lang="css" scoped>
</style>