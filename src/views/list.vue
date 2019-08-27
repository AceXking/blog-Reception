<template>
  <div class="list">
    <el-input @keydown.enter.native="init" v-model="queryData.keyword" placeholder="请输入内容"></el-input>
    <div class="list-item" 
    v-for='(item, index) in listData'
    :key='index'>
      <div class="list-title">{{ item.title }}</div>
      <div class="list-content">{{ item.content }}</div>
      <div class="list-author" >{{ item.author }}</div>
      <div class="delEdit">
        <el-button size='mini'>修改</el-button>
        <el-button @click="delBlog(item.id)" size='mini'>删除</el-button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { axiosData } from '../api/api.js'
export default {

  name: 'list',

  data () {
    return {
      listData:[],
      queryData:{
        author: "",
        keyword: ""
      }
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init() {
      axiosData('get','getList',this.queryData).then(res => {
        if (res.status === 200) {
          this.listData = res.data.data
        }
      })
    },
    delBlog(id) {
      axiosData('post','delBlog',{'id':id}).then(res => {
        if (res.data.code === 0) {
          this.$message(res.data.message)
          this.init()
        } else {
          this.$message(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.list {
  padding-left: 20px;
  padding-right: 20px;
}
.list-item {
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  list-style: none;
  border-bottom: 1px solid #eee;
}
.list-title {
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 1.2;
  color: #4183c4;
}
.list-content {
  max-width: 550px;
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 14px;
  color: #666;
}
.list-author {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 13px;
  color: #999;
}
.delEdit {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>