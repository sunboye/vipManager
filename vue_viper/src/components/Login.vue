<template>
  <div class="login-contain">
      <div class="login-logo">
          <img src="../assets/logo.png" alt="" srcset="">
      </div>
      <!-- 登录表单 -->
    <el-form ref="loginFormRef" class="login-form" :model="Loginform" :rules="Loginrules">
        <el-form-item  prop="name">
            <el-input prefix-icon="el-icon-user-solid" v-model="Loginform.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" v-model="Loginform.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import '../assets/fonts/iconfont.css'
export default {
  data () {
    return {
      Loginform: {
        name: 'admin',
        password: '123456'
      },
      Loginrules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  created () {
    window.sessionStorage.clear()
  },
  methods: {
    submitForm () {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$router.push('/home')
          this.$axios.post('/login', this.Loginform).then((res) => {
            // const token = res.headers.token;
            if (res.success) {
              const dataTemp = res.data || {};
              if (dataTemp.token) {
                this.$message.success(res.msg);
                window.sessionStorage.setItem('token', dataTemp.token);
                this.$router.push('/home')
              } else {
                this.$message.error('获取token失败');
              }
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
    .login-contain {
        width: 500px;
        height: 350px;
        background-color: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .login-logo {
        border: 1px solid silver;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 9px 0px;
        position: absolute;
        left: 50%;
        padding:10px;
        transform: translate(-50%, -50%);
        background-color: white;
    }
    .login-logo img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid silver;
        background-color: rgb(248, 248, 248);
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
    .login-form {
        position: absolute;
        bottom: 0px;
        width: 100%;
        padding: 20px;
    }
    .el-input {
        width: 460px; 
    }
</style>
