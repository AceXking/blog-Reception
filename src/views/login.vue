<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click='login'
             type="primary">登录</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '../api/user'
export default {

    name: 'login',

    data() {
        return {
          form: {
            username: '',
            password: ''
          }
        }
    },
    methods: {
      // 登录
      async login() {
        const res = await this.loginCheck()
        if (res) {
          try {
            const loginRes = await this.$http('post', login, this.form)
            console.log(loginRes)
            if (loginRes.data.code === 0) {
              this.$message('登录成功');
              this.$router.push('list')
            } else {
              this.$message(loginRes.data.message)
            }
          } catch(err) {
            console.error(err)
          }
        }
      },
      // 登录验证
      loginCheck() {
        const promise = new Promise((resolve, reject) => {
          if (!this.form.username) {
            this.$message({
              message: '请输入账号',
              type: 'warning'
            })
            resolve(false)
            return
          }
          if (!this.form.password) {
            this.$message({
              message: '请输入密码',
              type: 'warning'
            })
            resolve(false)
            return
          }
          resolve(true)
        })
        return promise
      }
    }
}
</script>
<style lang="css" scoped>
.login {
  width: 30%;
  margin: 0 auto;
  margin-top: 20%;
}
</style>