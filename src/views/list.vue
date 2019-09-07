<template>
  <div class="list">
    <div>
      <el-input class="searchInput" @keydown.enter.native="init" v-model="queryData.keyword" placeholder="请输入内容"></el-input>
      <el-button style="float: right;" type='primary' @click="addbtn">新增博客</el-button>
    </div>
    <div class="list-item" 
    v-for='(item, index) in listData'
    :key='index'>
      <div class="list-title">{{ item.title }}</div>
      <div class="list-content">{{ item.content }}</div>
      <div class="list-author" >{{ item.author }}</div>
      <div class="delEdit">
        <el-button @click="editBtn(item)" size='mini'>修改</el-button>
        <el-button @click="delBlog(item.id)" size='mini'>删除</el-button>
      </div>
      
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <el-form :model="addData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="addData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="addData.content"
          :rows="4"
           type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addBlog, editBlog, delBlog } from '../api/blog'
export default {

  name: 'list',

  data () {
    return {
      title: '新增',
      dialogVisible: false,
      listData: [],
      queryData:{
        author: "",
        keyword: ""
      },
      addData: {
        title: "",
        content: ""
      }
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    // 获取列表
    init() {
      // console.log(getList);return;
      this.$http('get', getList,this.queryData).then(res => {
        if (res.status === 200) {
          this.listData = res.data.data
        }
      })
    },
    // 新增按钮
    addbtn() {
      this.addData = {
        title: "",
        content: ""
      }
      this.title = '新增博客'
      this.dialogVisible = true;
    },
    // 编辑按钮
    editBtn(item) {
      this.addData = item
      this.title = '修改博客'
      this.dialogVisible = true;
    },
    // 删除事件
    delBlog(id) {
      this.confirmCheck('确定要删除吗？').then(res => {
        if (res) {
          this.$http('post', delBlog,{'id':id}).then(res => {
            if (res.data.code === 0) {
              this.$message(res.data.message)
              this.init()
            } else {
              this.$message(res.data.message)
            }
          })
        }
      })
    },
    // 删除确认
    confirmCheck(str) {
      const promise = new Promise((resolve, reject) => {
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve(true)
        }).catch(() => {
          resolve(false)
        });
      })
      return promise
    },
    // 确定按钮
    confirmBtn() {
      if (!this.addData.title) {
        this.$message('请输入标题')
        return
      }
      if (!this.addData.content) {
        this.$message('请输入内容')
        return
      }
      if (this.title === '新增博客') {
        this.$http('post', addBlog, this.addData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.init()
            this.dialogVisible = false
          } else {
            this.$message(res.data.message)
          }
        })
      } else {
        this.$http('post', editBlog, this.addData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.init()
            this.dialogVisible = false
          } else {
            this.$message(res.data.message)
          }
        })
      }
    },
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
.searchInput{
  width: 300px;
}
</style>