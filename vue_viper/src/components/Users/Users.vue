<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
        <div>
            <el-row :gutter="20">
              <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
              <el-button type="primary" @click="dialogVisible = true">删除</el-button>
              <el-button type="primary" @click="dialogVisible = true">修改</el-button>
              <el-button type="primary" @click="dialogVisible = true">冻结</el-button>
              <el-input placeholder="请输入用户名" class="input-with-select" v-model.trim="searchValue"  @keyup.enter.native="getUserList(true)"
                      :clearable="true" @clear="getUserList(true)" style="float: right">
                  <el-button type="info" slot="append" icon="el-icon-search" @click="getUserList(true)"></el-button>
              </el-input>
            </el-row>
            <el-row :gutter="20" type="flex" style="margin-top:20px;">
                <el-table :data="tableData" border style="width: 100%" tooltip-effect="light" v-loading="isLoading">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" label-width="80px" inline class="demo-table-expand">
                        <el-form-item label="会员ID:">
                          <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="姓名:">
                          <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="电话:">
                          <span>{{ props.row.telephone }}</span>
                        </el-form-item>
                        <el-form-item label="状态:">
                          <span>{{ props.row.status }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类:">
                          <span>{{ props.row.mg_state }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column type="selection">
                  </el-table-column>
                  <el-table-column label="姓名" width="130px" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.leval === 4" type="danger" size="mini">钻石</el-tag>
                        <el-tag v-if="scope.row.leval === 3" type="info" size="mini">白金</el-tag>
                        <el-tag v-if="scope.row.leval === 2" type="warning" size="mini">黄金</el-tag>
                        <el-tag v-if="scope.row.leval === 1" type="success" size="mini">白银</el-tag>
                        {{scope.row.name}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" width="50px">
                    <template slot-scope="scope">
                      <!-- <el-switch v-model="scope.row.status" @change="statusToggle(scope.row)"></el-switch> -->
                      <span>{{scope.row.sex | filterSex}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="telephone" label="电话号码" width="150px" show-overflow-tooltip></el-table-column>
                  <el-table-column label="状态" width="80px" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <!-- <el-switch v-model="scope.row.status" @change="statusToggle(scope.row)"></el-switch> -->
                      <span>{{scope.row.status | filterStatus}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="邮箱" show-overflow-tooltip width="150px"></el-table-column>
                  <el-table-column prop="wechat" label="微信号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="qq" label="QQ号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="birthday" label="生日" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="creat_time" label="创建时间" show-overflow-tooltip></el-table-column>
                  <el-table-column label="余额" width="100px">
                    <template slot-scope="scope">
                      <span style="color: #F56C6C;">￥{{scope.row.balance}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200px">
                      <template slot-scope="scope">
                          <div class="opreate">
                              <el-button size="mini" type="primary" icon="el-icon-edit"  @click="updateDialogVisible = true"></el-button>
                              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUser(scope.row)"></el-button>
                              <el-tooltip class="item" effect="dark" content="分配角色" placement="top" transition="none">
                                  <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRolesDialogVisible=true"></el-button>
                              </el-tooltip>
                          </div>
                          <el-dialog
                              title="修改用户信息"
                              :visible.sync="updateDialogVisible"
                              width="40%"
                              :before-close="handleClose">
                              <el-form ref="userForm" :model="userForm" :rules="userRules"
                                      label-position="right" label-width="70px">
                                  <el-form-item label="用户名">
                                      <el-input :disabled="true" v-model="scope.row.username"></el-input>
                                  </el-form-item>
                                  <el-form-item required label="邮箱" prop="email">
                                      <el-input type="email" v-model="userForm.email"></el-input>
                                  </el-form-item>
                                  <el-form-item required label="手机" prop="mobile">
                                      <el-input v-model="userForm.mobile"></el-input>
                                  </el-form-item>
                              </el-form>
                              <span slot="footer" class="dialog-footer">
                                  <el-button @click="handleClose">取 消</el-button>
                                  <el-button type="primary"  @click="updateUser(scope.row)">确 定</el-button>
                              </span>
                          </el-dialog>
                          <el-dialog
                              title="分配角色"
                              :visible.sync="setRolesDialogVisible"
                              width="40%">
                              <span>暂未实现</span>
                              <span slot="footer" class="dialog-footer">
                                  <el-button @click="setRolesDialogVisible=false">取 消</el-button>
                                  <el-button type="primary" @click="setRolesDialogVisible=false">确 定</el-button>
                              </span>
                          </el-dialog>
                      </template>
                  </el-table-column>
                </el-table>
            </el-row>
             <el-row :gutter="20" type="flex" style="margin-top:20px;">
                <el-pagination
                    :background="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="pagination.pageSizes"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                </el-pagination>
             </el-row>
        </div>
    </el-card>
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-form ref="userForm" :model="userForm" :rules="userRules"
                label-position="right" label-width="70px" key="add">
            <el-form-item required label="用户名" prop="username">
                <el-input v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item required label="密码" prop="password">
                <el-input type="password" v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item required label="邮箱" prop="email">
                <el-input type="email" v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item required label="手机" prop="mobile">
                <el-input v-model="userForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
let vm = {};
export default {
    data () {
        return {
            tableData: [],
            searchValue: '',
            pagination: {
                pageSize: 5,
                total: 0,
                pageSizes: [5, 10, 20, 50],
                currentPage: 1
            },
            isLoading: true,
            dialogVisible: false,
            updateDialogVisible: false,
            setRolesDialogVisible: false,
            userForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            userRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}
                ]
            },
            statusList: {
              0: '已删除',
              1: '正常',
              2: '已冻结'
            },
            sexList: {
              1: '男',
              2: '女'
            }
        }
    },
    created () {
      vm = this;
      vm.getUserList();
    },
    filters: {
      filterStatus: (val) => {
        if (val !== null && val !== undefined && !isNaN(val)) {
          return vm.statusList[val]
        }
        return '--'
      },
      filterSex: (val) => {
        if (val !== null && val !== undefined && !isNaN(val)) {
          return vm.sexList[val]
        }
        return '--'
      }
    },
    methods: {
        getUserList (isSearch) {
            this.isLoading = true;
            var params = {
                query: this.searchValue || '',
                current: !isSearch ? this.pagination.currentPage : 1,
                size: this.pagination.pageSize
            }
            this.$axios.get('/vipers', {params}).then((res) => {
                if (res.success) {
                    const dataTemp = res.data && res.data.records && res.data.records.length ? res.data.records : [];
                    this.pagination.total = res.data.total;
                    this.pagination.currentPage = res.data.current;
                    this.radio = dataTemp.length ? dataTemp[0].id : null
                    this.tableData = dataTemp;
                    }
                }).finally(() => {
                    this.isLoading = false;
                });
        },
        addUser () {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('users', this.userForm).then((res) => {
                        var data = res.data;
                        if (data.meta && data.meta.status === 201) {
                            this.$message.success(data.meta.msg);
                            this.handleClose();
                        } else {
                            this.$message.error(data.meta.msg);
                        }
                        this.getUserList();
                    },
                    (error) => {
                        console.log(error);
                        this.$message.error(error.message);
                        return false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        updateUser(row) {
            var url = "users/" + row.id;
            var params = {
                email: this.userForm.email,
                mobile: this.userForm.mobile,
            };
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.$axios.put(url, { params }).then((res) =>{
                        var data = res.data;
                        if (data.meta && data.meta.status === 200) {
                            this.$message.success(data.meta.msg);
                            this.handleClose();
                        } else {
                            this.$message.error(data.meta.msg);
                        }
                    },
                    (error) => {
                        console.log(error);
                        this.$message.error(error.message);
                        return false;
                    });
                } else {
                    console.log('edit error!!');
                    return false;
                }
            });
        },
        statusToggle(row) {
            var url = "users/"+ row.id + "/state/" + row.mg_state;
             this.$axios.put(url).then((res) => {
                var data = res.data;
                console.log(data);
                if (data.meta.status === 200) {
                    row.mg_state = !!data.data.mg_state;
                    this.$message.success(data.meta.msg);
                } else {
                    row.mg_state = !!data.data.mg_state;
                    this.$message.error(data.meta.msg);
                }
            },
            (error) => {
                row.mg_state = !row.mg_state;
                this.$message.error(error.meta.msg);
            });
        },
        handleClose() {
            this.dialogVisible = false;
            this.updateDialogVisible = false;
            this.$refs.userForm.resetFields();
        },
        handleSizeChange(size) {
           this.pagination.pageSize = !!size ? size : this.pagination.pageSize[0];
           this.getUserList();
        },
        handleCurrentChange(curpage) {
            this.pagination.currentPage = !!curpage ? curpage : 1;
           this.getUserList();
        },
        removeUser(row) {
            this.$confirm('此操作将永久删除用户数据, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }).then(() => {
               var url = "users/"+ row.id;
                this.$axios.delete(url).then((res) => {
                    var data = res.data;
                    if (data.meta.status === 200) {
                        this.$message.success(data.meta.msg);
                    } else {
                        this.$message.error(data.meta.msg);
                    }
                    this.getUserList();
                },
                (error) => {
                    row.mg_state = !row.mg_state;
                    this.$message.error(error.meta.msg);
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        }
    }
}
</script>

<style scope>
.el-card {
  margin-top:20px;
  height: auto;
}
.input-with-select {
  width: 500px;
}
#adduser {
  margin-left: 20px;
}
.opreate {
  display: flex;
  justify-content: center;
}
.demo-table-expand {
  font-size: 0;
  padding-left: 48px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
</style>
